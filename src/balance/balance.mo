import L "mo:base/List";
import A "mo:base/AssocList";
import P "mo:base/Principal";
import E "mo:prim";

// The Registry actor.
actor {

    // Type aliases make the rest of the code easier to read.
    public type Name = Principal;
    public type ShieldBalance = Nat;
    var reserve : ShieldBalance = 0;

    var trustOpt : ?Principal = null;

    // The actor maps names to token balances.
    var book: A.AssocList<Name, ShieldBalance> = L.nil<(Name, ShieldBalance)>();

    // An auxiliary function checks whether two names are equal.
    func nameEq(l: Name, r: Name): Bool {
        return l == r;
    };

    public shared {caller} func endow(ShieldBalance : Nat) : async () {
       switch (trustOpt) {
         case (? trust)  {
           if (trust != caller) { throw E.error("already endowed"); }
         };
         case (null) {};
       };
       reserve += ShieldBalance;
       trustOpt := ?caller;
    };

    // A shared invokable function that inserts a new entry
    // into the balance registry or replaces the previous one.
    public shared {caller} func register(name : Principal, shieldBalance: ShieldBalance): async () {
      switch (trustOpt) {
        case (?trust)  {
          if (trust != caller) { throw E.error("bad trust"); };
          if (shieldBalance > reserve) { throw E.error("reserve too low"); };
          reserve -= shieldBalance;
          let (newBook, _) = A.replace<Principal, ShieldBalance>(book, name, nameEq, ?shieldBalance);
          book := newBook;
         };
        case null { throw E.error("no trust"); }
      };
    };

    // A shared read-only query function that returns the (optional)
    // token balance corresponding to the person with the given name.
    public shared query {caller = name}  func checkAccount(): async ?ShieldBalance {
        return A.find<Name, ShieldBalance>(book, name, nameEq);
    };

    // A shared invokable function that inserts a new entry
    // into the balance registry or replaces the previous one.
    public shared {caller} func transfer(name: Principal, dest: Principal, amount: ShieldBalance): async () {
      switch (trustOpt) {
        case (? trust) {
          assert (caller == trust);
          switch(A.find<Name, ShieldBalance>(book, name, nameEq),
                 A.find<Name, ShieldBalance>(book, dest, nameEq)) {
            case (?balance,?dest_balance) {
              if (balance >= amount) {
                let (newBook1, _) =
                A.replace<Principal, ShieldBalance>(book, name, nameEq, ?(balance  - amount));
                let (newBook2, _) =
                A.replace<Principal, ShieldBalance>(book, dest, nameEq, ?(dest_balance  + amount));
                book := newBook2;
              } else {
                throw E.error("insufficient funds");
              };
            };
            case (_, _) { throw E.error("unknown account(s)"); } //TODO: better errors.
          }
        };
        case null  { throw E.error("no trust"); };
      };
    };


};

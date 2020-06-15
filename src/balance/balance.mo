import L "mo:base/List";
import A "mo:base/AssocList";
import P "mo:base/Principal";
import E "mo:prim";

// The Registry actor.
actor {

    // Type aliases make the rest of the code easier to read.
    public type Name = Principal;
    public type ShieldBalance = Nat;

    // The actor maps names to token balances.
    var book: A.AssocList<Name, ShieldBalance> = L.nil<(Name, ShieldBalance)>();

    // An auxiliary function checks whether two names are equal.
    func nameEq(l: Name, r: Name): Bool {
        return l == r;
    };

    // A shared invokable function that inserts a new entry
    // into the balance registry or replaces the previous one.
    public shared {caller = name} func register(shieldBalance: ShieldBalance): async () {
        let (newBook, _) = A.replace<Principal, ShieldBalance>(book, name, nameEq, ?shieldBalance);
        book := newBook;
    };

    // A shared read-only query function that returns the (optional)
    // token balance corresponding to the person with the given name.
    public shared query {caller = name}  func checkAccount(): async ?ShieldBalance {
        return A.find<Name, ShieldBalance>(book, name, nameEq);
    };

   // A shared invokable function that inserts a new entry
    // into the balance registry or replaces the previous one.
    public shared {caller = name} func transfer(dest: Principal, amount: ShieldBalance): async () { 
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
                   case (_, _) { assert false; } //TODO: better errors.
               }   
    };


};

import L "mo:base/List";
import A "mo:base/AssocList";

// The Registry actor.
actor {

    // Type aliases make the rest of the code easier to read.
    public type Name = Text; 
    public type ShieldBalance = Nat;


    // The actor maps names to token balances.
    var book: A.AssocList<Name, ShieldBalance> = L.nil<(Name, ShieldBalance)>();

    // An auxiliary function checks whether two names are equal.
    func nameEq(l: Name, r: Name): Bool {
        return l == r;
    };

    // A shared invokable function that inserts a new entry
    // into the balance registry or replaces the previous one.
    public func register(name: Name, shieldBalance: ShieldBalance): async () {
        let (newBook, _) = A.replace<Name, ShieldBalance>(book, name, nameEq, ?shieldBalance);
        book := newBook;
    };

    // A shared read-only query function that returns the (optional)
    // token balance corresponding to the person with the given name.
    public query func checkAccount(name: Name): async ?ShieldBalance {
        return A.find<Name, ShieldBalance>(book, name, nameEq);
    };
};

import T = "./types";

actor {

    public func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };
    
    public func registerHelper(h : T.Helper) : async () {
    };

    public func registerPerson(h : T.Person) : async () {
    };

};

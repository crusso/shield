import T = "./types";
import M = "mo:base/HashMap";
import Prim = "mo:prim";
import Id = "mo:base/Principal";
import A = "mo:base/Array";

actor {

    var Users =
     M.HashMap<T.UserId,(T.User,[T.Request])>(100,func (p1 : Principal,p2:Principal) = p1 == p2, Id.hash);
   
    var Helpers =
     M.HashMap<T.HelperId,T.Helper>(100,func (p1 : Principal,p2:Principal) = p1 == p2, Id.hash);
   
    // delete me
    public func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };
    
    public shared {caller} func registerHelper(h : T.Helper) : async T.HelperId {
        switch (Helpers.swap(caller, h)) {
            case null caller;
            case (? _) { throw Prim.error("already registered") };
        };
    };

    public shared {caller} func registerUser(u : T.User) : async T.UserId {
        switch (Users.swap(caller, (u,[]))) {
            case null caller;
            case (? _) { throw Prim.error("already registered") };
        };
    };

    public shared {caller} func postRequest(r : T.Request) : async () {
        switch (Users.get(caller)) {
            case null { throw Prim.error("unknown user") };
            case (? (u,rs)) { Users.set(caller,(u,A.append([r],rs)))}
        };
    };


};

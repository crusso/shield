import Array "mo:base/Array";
import Id "mo:base/Principal";
import M "mo:base/HashMap";
import N "mo:base/Nat";
import Option "mo:base/Option";
import Prim "mo:prim";
import T "./types";

actor {

    var requestId = 0;

    var users =
     M.HashMap<T.UserId,(T.User,[T.RequestId])>(100, T.UserId.eq, T.UserId.hash);

    var helpers =
     M.HashMap<T.HelperId,T.Helper>(100, T.HelperId.eq, T.HelperId.hash);

    var requests =
     M.HashMap<T.RequestId, T.RequestState>(100, T.RequestId.eq, T.RequestId.hash);

    // delete me
    public func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };
    
    public shared {caller} func registerHelper(h : T.Helper) : async T.HelperId {
        switch (helpers.swap(caller, h)) {
            case null caller;
            case (? _) { throw Prim.error("already registered") };
        };
    };

    public shared {caller} func registerUser(u : T.User) : async T.UserId {
        switch (users.swap(caller, (u,[]))) {
            case null caller;
            case (? _) { throw Prim.error("already registered") };
        };
    };

    public shared {caller} func postRequest(r : T.Request) : async T.RequestId {

        switch (users.get(caller)) {
            case null { throw Prim.error("unknown user") };
            case (? (u,rs)) {
              // allocate new request Id
              let rId = requestId;
              requestId += 1;
              // add rId to user's requests
              users.set(caller,(u, Array.append([rId],rs)));
              // add rId to requests, initially #active
              requests.set(rId, { info = r; status = #active; user = caller });
              return rId;
            }
        };
        
    };

    public shared query {caller} func userrequests() : async [(T.RequestId, T.RequestState)] {
        let rs = switch (users.get(caller)) {
            case null { throw Prim.error("unknown user") };
            case (? (u,rs)) { rs };
        };
        return Array.map<T.RequestId,(T.RequestId,T.RequestState)>
           (func r { (r,Option.unwrap(requests.get(r))) },rs);
    };

};


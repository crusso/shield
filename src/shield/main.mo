import Array "mo:base/Array";
import Id "mo:base/Principal";
import Iter "mo:base/Iter";
import M "mo:base/HashMap";
import N "mo:base/Nat";
import Option "mo:base/Option";
import Prim "mo:prim";
import T "./types";
import Types "types";
import balance "canister:balance";

actor {

    flexible var requestId = 0;

    flexible var users =
     M.HashMap<T.UserId,(T.User,[T.RequestId])>(100, T.UserId.eq, T.UserId.hash);
    flexible var helpers =
     M.HashMap<T.HelperId,T.Helper>(100, T.HelperId.eq, T.HelperId.hash);

    flexible var requests =
     M.HashMap<T.RequestId, T.RequestState>(100, T.RequestId.eq, T.RequestId.hash);

    flexible let userEndowment = 200;
    flexible let helperEndowment = 0;
    flexible let reserveEndowment = 100_000_000;
    flexible var endowed = false;

    func endowOnce() : async () {
      if (not endowed) {
        await balance.endow(reserveEndowment);
	endowed := true;
      };
    };

    public shared query {caller} func whoAmIAndHowDidIGetHere() : async T.Hominid {
        // No idea how you got here but I know who you are, earthling!
        let u: ?T.User = switch (users.get(caller)) {
            case null { null };
            case (? (user,rs)) { ?user };
        };
        let h: ?T.Helper = switch (helpers.get(caller)) {
            case null { null };
            case (? helper) { ?helper };
        };
        let ans: T.Hominid = { user=u; helper=h; };
        return ans;
    };

    public shared {caller} func registerHelper(h : T.Helper) : async T.HelperId {
        await endowOnce();
        switch (helpers.swap(caller, h)) {
            case null {
  	      await balance.register(caller, helperEndowment);
	      caller;
	    };
            case (? _) { throw Prim.error("already registered") };
        };
    };

    public shared {caller} func registerUser(u : T.User) : async T.UserId {
        await endowOnce();
        switch (users.swap(caller, (u,[]))) {
            case null {
	      await balance.register(caller, userEndowment);
	      caller;
            };
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

    public shared query {caller} func userRequests() : async [(T.RequestId, T.RequestState)] {
        let rs = switch (users.get(caller)) {
            case null { throw Prim.error("unknown user") };
            case (? (u,rs)) { rs };
        };
        return Array.map<T.RequestId,(T.RequestId,T.RequestState)>
           (func r { (r,Option.unwrap(requests.get(r))) },rs);
    };

    public shared {caller} func confirmRequest(rid: T.RequestId) : async Bool {
        let u = switch (users.get(caller)) {
            case null { throw Prim.error("unknown user") };
            case (?h) { h };
        };
        let rs = switch (requests.get(rid)) {
            case null { throw Prim.error("unknown request") };
            case (? rs) { rs };
        };
        if (rs.user != caller) return false; // can't confirm other's requests
        let delivered = switch (rs.status) {
            case (#accepted h) {
   		// Better: held in escrow by shield so caller can't overspend
                await balance.transfer(caller, h, rs.info.reward);
                #confirmed;
            };
            case _ { return false; }
        };
        // update request status;
        requests.set(rid, { info = rs.info; status = delivered; user = rs.user });
        return true;
    };

    // Helper Interface, finds relevant/nearby Active requests
    public shared query {caller} func findRequests() : async [(T.RequestId, T.Request)] {
        let h = switch (helpers.get(caller)) {
            case null { throw Prim.error("unknown helper") };
            case (?h) { h };
        };
        func filter(rid:T.RequestId, rs: T.RequestState) : ? T.Request {
            if ((switch (rs.status) {
                   case (#active) true;
                   case _ false })
                and
                Types.getDistanceFromLatLng(h.location, rs.info.requestLocation) <= h.radiusKm
                ///and ... relevant RequestType...Array
               )
            { ? rs.info;
            }
            else null;
        };
        let rs = M.mapFilter(requests, T.RequestId.eq, T.RequestId.hash, filter);

        return Iter.toArray(rs.iter());
    };

    // Helper Interface
    public shared query {caller} func helperRequests() : async [(T.RequestId, T.Request)] {
        let h = switch (helpers.get(caller)) {
            case null { throw Prim.error("unknown helper") };
            case (?h) { h };
        };
        func filter(rid:T.RequestId, rs: T.RequestState) : ? T.Request {
            if (switch (rs.status) {
                 case (#accepted h) h == caller;
                 case _ false })
            { ? rs.info;
            }
            else null;
        };
        let rs = M.mapFilter(requests, T.RequestId.eq, T.RequestId.hash, filter);

        return Iter.toArray(rs.iter());
    };

    public shared {caller} func acceptRequest(rid: T.RequestId) : async Bool {
        let h = switch (helpers.get(caller)) {
            case null { throw Prim.error("unknown helper") };
            case (?h) { h };
        };
        let rs = switch (requests.get(rid)) {
            case null { throw Prim.error("unknown request") };
            case (? rs) { rs };
        };
        let accepted = switch (rs.status) {
            case (#active) (#accepted caller);
            case _ { return false; }
        };
        // update request status;
        requests.set(rid,{info = rs.info; status = accepted; user = rs.user });
        return true;
    };

    // TODO: Filter by distance.
    // TODO: Maybe redact the helper info.
    public shared {caller} func findHelpers() : async [(T.HelperId, T.Helper)] {
        let u = switch (users.get(caller)) {
            case null { throw Prim.error("unknown user") };
            case (?u) { u };
        };
        func filter(hid:T.HelperId, h: T.Helper) : ? T.Helper {
            if (
                true
                //Types.getDistanceFromLatLng(h.location, u.location) <= h.radiusKm
               )
            { ? h;
            }
            else null;
        };
        // <K, V1, V2>(HashMap<K, V1>, (K, K) -> Bool, K -> Hash, (K, V1) -> ?V2) -> HashMap<K, V2>
        let hs = M.mapFilter(helpers, T.HelperId.eq, T.HelperId.hash, filter);

        return Iter.toArray(hs.iter());
    }
};


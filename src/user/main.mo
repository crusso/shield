import Debug "mo:base/Debug"; // for logging
import Nat "mo:base/Nat";

import shield "canister:shield";

/*
// starting user 0, 1 (etc)
prompt> dfx canister call user-0 start '(0)'
debug.print: 0: started user
debug.print: 0: registered_user
()
*/


// table of mock users
let users =
   [ { 
       name = {first = "f1"; last = "l2"};
       address= ["blah", "blah"];
       location = {lat = 666.0; lng = 666.0};
       disability = null;
       age = 70;
       email = {"blah@boo.com"};
      }, //...
   ];

actor {

    var started = false;

    public func start(user_no : Nat) : async () {
       if started assert(false);
       started := true;
       // logging helper
       let user = Nat.toText(user_no);
       func log(t : Text) { 
         Debug.print(user # ": " # t);
       };

       log("started user");
       let uid = await shield.registerUser(users[user_no % users.len()]);  
       log("registered user")

       // make and accept some requests.      
    }

};

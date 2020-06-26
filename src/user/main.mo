import Debug "mo:base/Debug"; // for logging
import Nat "mo:base/Nat";

import shield "canister:shield";

/*
// starting user 0, 1 (etc)
$ dfx canister call user-0 start '(0)'
debug.print: 0: started user
debug.print: 0: registered_user
()
*/


// table of mock users
let users =
   [ {
       name = {first = "John"; last = "Smith"};
       address= ["Gertrudstrasse 83, 8003, Zurich"];
       location = {lat = 47.371653; lng = 8.512296};
       disability = null;
       age = 70;
       email = {"blah@boo.com"};
      },
      {
       name = {first = "David"; last ="Rock"};
       address= ["Agnestrasse 18, 8004, Zurich"];
       location= {lat=47.377899; lng = 8.514565};
       disability = null;
       age=80;
       email= {"davidrock@boo.com"}
      },
      {
       name = {first = "Ruth"; last ="Mcdonald"};
       address= ["Rousseaustrasse 44, 8037, Zurich"];
       location= {lat=47.389460; lng = 8.533636};
       disability = null;
       age=90;
       email= {"ruthmcdonald@boo.com"}
      },
      {
       name = {first = "Sangoku"; last ="sayen"};
       address= ["Brunnwiesenstrasse 1, 8049, Zurich"];
       location= {lat=47.399649; lng = 8.505982};
       disability = null;
       age=70;
       email= {"sangokusayen@boo.com"}
      },
      {
       name = {first = "Jack"; last ="Theripper"};
       address= ["Talchernstrasse 3, 8049, Zurich"];
       location= {lat=47.402562; lng = 8.489843};
       disability = null;
       age=80;
       email= {"jacktheripper@boo.com"}
      },
      {
       name = {first = "Lolita"; last ="drum"};
       address= ["Rötelstrasse 29, 8006, Zurich"];
       location= {lat=47.390895; lng = 8.536499};
       disability = null;
       age=60;
       email= {"lolitadrum@boo.com"}
      },
      {
       name = {first = "Elena"; last ="Zinger"};
       address= ["Möhrlistrasse 84, 8006, Zurich"];
       location= {lat=47.391355; lng = 8.546390};
       disability = null;
       age=70;
       email= {"elenazinger@boo.com"}
      },
      {
       name = {first = "Weak"; last ="Man"};
       address= ["Saatlenstrasse 1, 8050, Zurich"];
       location= {lat=47.409197; lng = 8.565276};
       disability = null;
       age=70;
       email= {"weakman@boo.com"}
      },
      {
       name = {first = "Tired"; last ="Alot"};
       address= ["Schützenstrasse 20, 8304, Wallisellen"];
       location= {lat=47.417493; lng = 8.587697};
       disability = null;
       age=70;
       email= {"tiredalot@boo.com"}
      },
      {
       name = {first = "Sangoku"; last ="sayen"};
       address= ["Brunnwiesenstrasse 1, 8049, Zurich"];
       location= {lat=47.399649; lng = 8.505982};
       disability = null;
       age=70;
       email= {"sangokusayen@boo.com"}
      }
   ];

let helpers =
   [ {
       name = {first = "Iron"; last = "Man"};
       address= ["Dreispitz 98, 8050, Zurich"];
       location = {lat = 47.409965 ; lng = 8.566219};
       radiusKm =2.0;
       services = [#grocery];
       email = {"ironman@boo.com"};
      },
      {
       name = {first = "captain"; last = "America"};
       address= ["Eschenweg 8, 8057, Zurich"];
       location = {lat = 47.403721; lng = 8.542631};
       radiusKm =2.0;
       services = [#grocery];
       email = {"captainamerica@boo.com"};
      },
      {
       name = {first = "Hulk"; last = "Angry"};
       address= ["Häderlihof 12, 8057, Zurich"];
       location = {lat = 47.398029; lng = 8.540589};
       radiusKm =5.0;
       services = [#grocery];
       email = {"hulkangry@boo.com"};
      },
      {
       name = {first = "Thor"; last = "Asgard"};
       address= ["Abeggweg 4, 8057, Zurich"];
       location = {lat = 47.393971; lng = 8.534722};
       radiusKm =2.0;
       services= [#grocery];
       email = {"thorasgard@boo.com"};
      },
      {
       name = {first = "arrow"; last = "bow"};
       address= ["Griesernweg 22, 8037, Zurich"];
       location = {lat = 47.397174; lng = 8.519152};
       radiusKm =2.0;
       services = [#grocery];
       email = {"arrowbow@boo.com"};
      },
      {
       name = {first = "Loki"; last = "Elf"};
       address= ["Hohlstrasse 82, 8004, Zurich"];
       location = {lat = 47.378471; lng = 8.524024};
       radiusKm =2.0;
       services = [#grocery];
       email = {"lokielf@boo.com"};
      },
      {
       name = {first = "Nick"; last = "Fury"};
       address= ["Rieterstrasse 12, 8002, Zurich"];
       location = {lat = 47.360168; lng = 8.525576};
       radiusKm =2.0;
       services = [#grocery];
       email = {"nickfury@boo.com"};
      },
      {
       name = {first = "Spider"; last = "Man"};
       address= ["Kleinalbis 106, 8045, Zurich"];
       location = {lat = 47.357722; lng = 8.506247};
       radiusKm =2.0;
       services = [#grocery];
       email = {"spiderman@boo.com"};
      },
      {
       name = {first = "Stan"; last = "Lee"};
       address= ["Im wyl 12, 8055, Zurich"];
       location = {lat = 47.367446; lng = 8.514174};
       radiusKm =2.0;
       services = [#grocery];
       email = {"Stanlee@boo.com"};
      },
      {
       name = {first = "Eric"; last = "Selvig"};
       address= ["Hornbachstrasse 63, 8008, Zurich"];
       location = {lat = 47.356403; lng = 8.556218};
       radiusKm =2.0;
       services = [#grocery];
       email = {"ericselvig@boo.com"};
      },
   ];

var items =
[("apples",2), ("oranges",3), ("ham",5), ("cheese",5), ("milk",2), ("bread",2)];


actor {

    flexible var started = false;

    public func start(user_no : Nat) : async () {
       if started assert(false);
       started := true;
       // logging helper
       let user_text = Nat.toText(user_no);
       func log(t : Text) {
         Debug.print("User " # user_text # ": " # t);
       };
       let user = users[user_no % users.len()];

       log("started user");
       let uid = await shield.registerUser(user);
       log("registered user");

       let item = items[user_no % items.len()];
       //make one request
       let rid = await shield.postRequest({
          requestType = #grocery;
          requestLocation = user.location; //hack
          note = "cheers";
          items = [item.0];
          reward = item.1;
       });

       log("posted request " # Nat.toText(rid) # " " # item.0);

       return; // exit early to avoid replica bug

       // loop until first acceptance, confirm it
       label poll {
       loop
       {
          let reqs = await shield.userRequests();
          for ((rid, state) in reqs.vals()) {
             switch (state.status) {
               case (#accepted h)  {
                 if (await shield.confirmRequest(rid)) {
                   log("confirmed request");
                   break poll;
                 }
               };
               case _ { //continue
               }
             }
          }
        };
        // exit
        log("user done");
       }

       // make and accept some requests.
    };

   public func startHelper(helper_no : Nat) : async () {
       if started assert(false);
       started := true;
       // logging helper
       let user = Nat.toText(helper_no);
       func log(t : Text) {
         Debug.print("Helper" # user # ": " # t);
       };

       log("started helper");
       let uid = await shield.registerHelper(helpers[helper_no % helpers.len()]);
       log("registered helper");

       return; // exit early to avoid replica bug

       let reqs = await shield.findRequests();
       label poll {
       loop
         {
           for ((rid, info) in reqs.vals()) {
             if (await shield.acceptRequest(rid)) {
                log("accepted request" # Nat.toText(rid));
                break poll;
             };
           };
         };
       };
       log("helper done");
       // make and accept some requests.
    }

};

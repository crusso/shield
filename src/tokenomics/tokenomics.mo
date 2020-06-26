import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Int "mo:base/Int";

actor {
    var PhiSupply : Nat = 0;
    var ShieldSupply : Nat = 0;
    var ExchangeRate : Float = 0;
    var NumberElder : Nat = 0;
    var NumberHelper : Nat = 0;


    // Read the total PHI in the pool with an inquire function.
    public query func totalPhi() : async Nat {
        PhiSupply
    };
    // indicate how many PHI to donate.
    public func donatePhi(n: Nat) : async () {
        PhiSupply += n;
    };
    // Read the total Het in the pool with an inquire function.
    public query func totalShield() : async Nat {
        ShieldSupply
    };
    // indicate how many Het to mint.
    public func mintShield(n: Nat) : async () {
        ShieldSupply += n;
    };

   // award tokens to elder registers
    public func tokenTransfer(name : Text) : async Text {
        return "100 SHIELD tokens are awarded to " # name # "!";
    };


    // ???
    public func exchangeRate() : async Float {
      if (ShieldSupply : Nat != 0)
        ExchangeRate :=
	  Float.fromInt64(Int.toInt64(PhiSupply)) /
 	   Float.fromInt64(Int.toInt64(ShieldSupply));
      return ExchangeRate
   };

   //???
   public query func test() : async () {
      Debug.print ("The currenct exchange rate is 1 SHIELD = 1.2 PHI \n");
   };
}
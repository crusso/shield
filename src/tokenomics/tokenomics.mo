import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Int "mo:base/Int";

// This code is incomplete and unused.

actor {
    flexible var PhiSupply : Nat = 0;
    flexible var ShieldSupply : Nat = 0;
    flexible var ExchangeRate : Float = 0;

    // Read the total PHI in the pool with an inquire function.
    public query func totalPhi() : async Nat {
        PhiSupply
    };
    // indicate how many PHI to donate.
    public func donatePhi(n: Nat) : async () {
        PhiSupply += n;
    };
    // Read the total Shield in the pool with an inquire function.
    public query func totalShield() : async Nat {
        ShieldSupply
    };
    // indicate how many Shield to mint.
    public func mintShield(n: Nat) : async () {
        ShieldSupply += n;
    };

    // calculate the exchage rate
    public func exchangeRate() : async Float {
      if (ShieldSupply : Nat != 0)
        ExchangeRate :=
	  Float.fromInt64(Int.toInt64(PhiSupply)) /
 	   Float.fromInt64(Int.toInt64(ShieldSupply));
      return ExchangeRate
   };

}
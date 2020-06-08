import Principal = "mo:base/Principal";
import Nat = "mo:base/Nat";

module {

  public type Location = {
    lat: Float;
    lng: Float
  };

  public type Name = {
    first: Text;
    last: Text;
  };

  public type Disability = { #hearing; #sight; #mobility; #other };
  
  public type Age = Nat; /* bucket by decade */
  
  //public type Gender = {#male; #female; #other};

  public type RequestType = {#grocery; #pharmacy};
  
  public type User = {
    name: Name;
    location: Location;
    age: Age;
    disability: ?Disability;
    address: [Text];
    email: Text;
  };

  public type Helper = {
    name: Name;
    location: Location;
    radiusKm: Float;
    services: [RequestType];
    email: Text;
  };

  public type Expiry = { time: Nat};

  public type Status = {
    #active/*: Expiry*/;
    #accepted: Helper;
    #delivered: Helper;
  };

  public type Request = {
    requestType: RequestType;
    requestLocation: Location;
    note: Text;
    items: [Text];
  };
  
  public type RequestState = { 
    info : Request;
    status : Status; 
    user: UserId; 
  };

  public type UserId = Principal;
  public type HelperId = Principal;
  public type RequestId = Nat;

  // support for Hashing
  public module CallerId = {
     public func eq(id1 : Principal, id2 : Principal) : Bool { id1 == id2 };
     public func hash(id : Principal) : Word32 { Principal.hash(id)};
  };
  
  public let HelperId = CallerId;
  public let UserId = CallerId;

  public module RequestId = {
     public func eq(id1 : Nat, id2 : Nat) : Bool { id1 == id2 };
     public func hash(id : Nat) : Word32 { Nat.toWord32(id) };
  };

}

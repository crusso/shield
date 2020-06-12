import DistanceMetric "mo:base/Float";
import Math "mo:base/Float";
import Nat "mo:base/Nat";
import Prim "mo:prim";
import Principal "mo:base/Principal";


module {

  public let pi : Float = 3.14;
  public let pow : Float = 2.718;


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

public func deg2rad(deg: Float): Float {return deg * (pi/180)};

public func square(x: Float): Float {return x**2};

public func getDistanceFromLatLng(l1: Location, l2: Location) : Float { // miles optional
  //if (miles == "undefined"){miles=false};
  var r : Float = 6371; // radius of the earth in km
  var dlat1 : Float = deg2rad(l1.lat);
  var dlat2 : Float = deg2rad(l2.lat);
  var lat_dif = dlat2 - dlat1;
  var lng_dif = deg2rad(l2.lng-l1.lng);
  var a = square(Prim.sin(lat_dif/2)) + Prim.cos(dlat1) * Prim.cos(dlat2) * square(Prim.sin(lng_dif/2));
  var d : Float = 2 * r * Prim.sin(Prim.floatSqrt(a));
  return d
  }
}

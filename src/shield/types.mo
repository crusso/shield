
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
    location: Location;
    // Should the server know any of these?
    name: Name;
    first: Text;
    last: Text;
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

  public type Expiry = { Time: Nat};

  public type Status = {
    #Active: Expiry;
    #Accepted: Helper;
    #Delivered: Helper;
  };

  public type Request = {
    requestType: RequestType;
    requestLocation: Location;
    status: Status;
    note: Text;
    items: [Text];
  };
  
  public type UserId = Principal;
  
  public type HelperId = Principal;

}
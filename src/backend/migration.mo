import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

module {
  type ListingPurpose = {
    #forSale;
    #forRent;
  };

  type ListingFeeType = {
    #yearlyFee1000;
    #twoMonthRentCommission;
  };

  type PropertyStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type PaymentStatus = {
    #pending;
    #paid;
  };

  type SellerInfo = {
    sellerName : Text;
    sellerPhone : ?Text;
    paymentRef : ?Text;
    paymentStatus : PaymentStatus;
  };

  type OldProperty = {
    id : Nat;
    title : Text;
    city : Text;
    location : Text;
    propertyType : Text;
    price : Nat;
    area : Nat;
    bedrooms : Nat;
    description : Text;
    photoUrls : [Text];
    isFeatured : Bool;
    status : PropertyStatus;
    submittedAt : Time.Time;
    sellerInfo : SellerInfo;
  };

  type NewSellerInfo = {
    sellerName : Text;
    sellerPhone : ?Text;
    paymentRef : ?Text;
    paymentStatus : PaymentStatus;
    listingFeeType : ListingFeeType;
  };

  type NewProperty = {
    id : Nat;
    title : Text;
    city : Text;
    location : Text;
    propertyType : Text;
    price : Nat;
    area : Nat;
    bedrooms : Nat;
    description : Text;
    photoUrls : [Text];
    isFeatured : Bool;
    status : PropertyStatus;
    submittedAt : Time.Time;
    listingPurpose : ListingPurpose;
    rentAmount : ?Nat;
    sellerInfo : NewSellerInfo;
  };

  type Actor = {
    properties : Map.Map<Nat, OldProperty>;
  };

  type NewActor = {
    properties : Map.Map<Nat, NewProperty>;
  };

  public func run(old : Actor) : NewActor {
    let newProperties = old.properties.map<Nat, OldProperty, NewProperty>(
      func(_id, oldProperty) {
        {
          oldProperty with
          listingPurpose = #forSale;
          rentAmount = null;
          sellerInfo = {
            oldProperty.sellerInfo with
            listingFeeType = #yearlyFee1000
          };
        };
      }
    );
    { properties = newProperties };
  };
};

import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type PropertyStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type PaymentStatus = {
    #pending;
    #paid;
  };

  public type SellerInfo = {
    sellerName : Text;
    sellerPhone : ?Text;
    paymentRef : ?Text;
    paymentStatus : PaymentStatus;
  };

  public type Property = {
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

  public type BuyerLead = {
    id : Nat;
    propertyId : Nat;
    buyerName : Text;
    buyerPhone : Text;
    buyerEmail : Text;
    message : Text;
    createdAt : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  module Property {
    public func compare(p1 : Property, p2 : Property) : Order.Order {
      Text.compare(p1.title, p2.title);
    };

    public func compareByCity(p1 : Property, p2 : Property) : Order.Order {
      Text.compare(p1.city, p2.city);
    };
  };

  let properties = Map.empty<Nat, Property>();
  let buyerLeads = Map.empty<Nat, BuyerLead>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextPropertyId = 1;
  var nextLeadId = 1;

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public functions - accessible to all including guests
  public query ({ caller }) func listApprovedProperties() : async [Property] {
    properties.values().toArray().filter(
      func(p) {
        switch (p.status) {
          case (#approved) { true };
          case (_) { false };
        };
      }
    ).sort();
  };

  public query ({ caller }) func filterPropertiesByCity(city : Text) : async [Property] {
    properties.values().toArray().filter(
      func(p) {
        p.city == city and p.status == #approved
      }
    );
  };

  public query ({ caller }) func getFeaturedProperties() : async [Property] {
    properties.values().toArray().filter(
      func(p) {
        p.isFeatured and p.status == #approved
      }
    );
  };

  public shared ({ caller }) func submitProperty(
    title : Text,
    city : Text,
    location : Text,
    propertyType : Text,
    price : Nat,
    area : Nat,
    bedrooms : Nat,
    description : Text,
    photoUrls : [Text],
    sellerName : Text,
    sellerPhone : Text
  ) : async () {
    let property : Property = {
      id = nextPropertyId;
      title;
      city;
      location;
      propertyType;
      price;
      area;
      bedrooms;
      description;
      photoUrls;
      isFeatured = false;
      status = #pending;
      submittedAt = Time.now();
      sellerInfo = {
        sellerName;
        sellerPhone = ?sellerPhone;
        paymentRef = null;
        paymentStatus = #pending;
      };
    };
    properties.add(nextPropertyId, property);
    nextPropertyId += 1;
  };

  public shared ({ caller }) func submitBuyerInquiry(
    propertyId : Nat,
    buyerName : Text,
    buyerPhone : Text,
    buyerEmail : Text,
    message : Text
  ) : async () {
    let lead : BuyerLead = {
      id = nextLeadId;
      propertyId;
      buyerName;
      buyerPhone;
      buyerEmail;
      message;
      createdAt = Time.now();
    };
    buyerLeads.add(nextLeadId, lead);
    nextLeadId += 1;
  };

  public shared ({ caller }) func recordPayment(propertyId : Nat, paymentRef : Text) : async () {
    switch (properties.get(propertyId)) {
      case (null) { Runtime.trap("Property not found") };
      case (?property) {
        let updatedProperty : Property = {
          id = property.id;
          title = property.title;
          city = property.city;
          location = property.location;
          propertyType = property.propertyType;
          price = property.price;
          area = property.area;
          bedrooms = property.bedrooms;
          description = property.description;
          photoUrls = property.photoUrls;
          isFeatured = property.isFeatured;
          status = property.status;
          submittedAt = property.submittedAt;
          sellerInfo = {
            sellerName = property.sellerInfo.sellerName;
            sellerPhone = property.sellerInfo.sellerPhone;
            paymentRef = ?paymentRef;
            paymentStatus = property.sellerInfo.paymentStatus;
          };
        };
        properties.add(propertyId, updatedProperty);
      };
    };
  };

  // Admin-only functions

  public query ({ caller }) func getAllProperties() : async [Property] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all properties");
    };
    properties.values().toArray().sort();
  };

  public query ({ caller }) func getSellerPhone(propertyId : Nat) : async ?Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view seller phone numbers");
    };
    switch (properties.get(propertyId)) {
      case (null) { null };
      case (?property) { property.sellerInfo.sellerPhone };
    };
  };

  public shared ({ caller }) func updatePropertyStatus(propertyId : Nat, newStatus : PropertyStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update property status");
    };
    switch (properties.get(propertyId)) {
      case (null) { Runtime.trap("Property not found") };
      case (?property) {
        let updatedProperty : Property = {
          id = property.id;
          title = property.title;
          city = property.city;
          location = property.location;
          propertyType = property.propertyType;
          price = property.price;
          area = property.area;
          bedrooms = property.bedrooms;
          description = property.description;
          photoUrls = property.photoUrls;
          isFeatured = property.isFeatured;
          status = newStatus;
          submittedAt = property.submittedAt;
          sellerInfo = property.sellerInfo;
        };
        properties.add(propertyId, updatedProperty);
      };
    };
  };

  public shared ({ caller }) func confirmPayment(propertyId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can confirm payments");
    };
    switch (properties.get(propertyId)) {
      case (null) { Runtime.trap("Property not found") };
      case (?property) {
        let updatedProperty : Property = {
          id = property.id;
          title = property.title;
          city = property.city;
          location = property.location;
          propertyType = property.propertyType;
          price = property.price;
          area = property.area;
          bedrooms = property.bedrooms;
          description = property.description;
          photoUrls = property.photoUrls;
          isFeatured = property.isFeatured;
          status = #approved;
          submittedAt = property.submittedAt;
          sellerInfo = {
            sellerName = property.sellerInfo.sellerName;
            sellerPhone = property.sellerInfo.sellerPhone;
            paymentRef = property.sellerInfo.paymentRef;
            paymentStatus = #paid;
          };
        };
        properties.add(propertyId, updatedProperty);
      };
    };
  };

  public query ({ caller }) func getAllBuyerLeads() : async [BuyerLead] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view buyer leads");
    };
    buyerLeads.values().toArray();
  };

  public shared ({ caller }) func toggleFeatured(propertyId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can toggle featured status");
    };
    switch (properties.get(propertyId)) {
      case (null) { Runtime.trap("Property not found") };
      case (?property) {
        let updatedProperty : Property = {
          id = property.id;
          title = property.title;
          city = property.city;
          location = property.location;
          propertyType = property.propertyType;
          price = property.price;
          area = property.area;
          bedrooms = property.bedrooms;
          description = property.description;
          photoUrls = property.photoUrls;
          isFeatured = not property.isFeatured;
          status = property.status;
          submittedAt = property.submittedAt;
          sellerInfo = property.sellerInfo;
        };
        properties.add(propertyId, updatedProperty);
      };
    };
  };

  public shared ({ caller }) func deleteProperty(propertyId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete properties");
    };
    if (not properties.containsKey(propertyId)) {
      Runtime.trap("Property not found");
    };
    properties.remove(propertyId);
  };
};

import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type LevelProgress = {
    currentLevel : Nat;
    totalLevels : Nat;
    completedChallenges : Nat;
  };

  type Challenge = {
    question : Text;
    choices : [Text];
    correctAnswer : Text;
    explanation : Text;
  };

  type Level = {
    content : Text;
    challenges : [Challenge];
  };

  type MatchingChallenge = {
    question : Text;
    pairs : [(Text, Text)];
    correctAnswers : [(Text, Text)];
    explanation : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  module Level {
    public func compare(level1 : Level, level2 : Level) : Order.Order {
      Text.compare(level1.content, level2.content);
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Predefined levels and challenges (should be generated from PDFs in frontend)
  var totalLevels = 2;

  // Persistent user progress
  let userProgress = Map.empty<Principal, LevelProgress>();

  // User profiles
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
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

  // Level logic
  public query ({ caller }) func getLevelCount() : async Nat {
    totalLevels;
  };

  public query ({ caller }) func getPersistentLevelProgress() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access progress");
    };
    switch (userProgress.get(caller)) {
      case (null) { 0 };
      case (?progress) { progress.currentLevel };
    };
  };

  public shared ({ caller }) func completeLevel(level : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can complete levels");
    };
    if (level >= 2) { Runtime.trap("Level does not exist") };
    var currentLevel = 0;
    switch (userProgress.get(caller)) {
      case (null) { currentLevel := 0 };
      case (?progress) { currentLevel := progress.currentLevel };
    };
    let completedChallenges = 0; // Get from previous state

    let newProgress : LevelProgress = {
      currentLevel = level + 1;
      totalLevels = totalLevels;
      completedChallenges;
    };
    userProgress.add(caller, newProgress);
  };

  public shared ({ caller }) func completePersistentChallenge(level : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can complete challenges");
    };
    var currentLevel = 0;
    var totalChallenges = 0;
    var completedChallenges = 0;
    switch (userProgress.get(caller)) {
      case (null) {};
      case (?progress) {
        currentLevel := progress.currentLevel;
        totalChallenges := 0;
        completedChallenges := progress.completedChallenges;
      };
    };
    if (level > currentLevel) {
      Runtime.trap("Cannot complete challenge for this level yet. Please complete previous levels first");
    };
    let newProgress : LevelProgress = {
      currentLevel;
      totalLevels = totalChallenges;
      completedChallenges = completedChallenges + 1;
    };
    userProgress.add(caller, newProgress);
  };

  public shared ({ caller }) func resetProgress() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can reset progress");
    };
    userProgress.remove(caller);
  };

  public query ({ caller }) func getAllUsersProgress() : async [(Principal, LevelProgress)] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all users' progress");
    };
    userProgress.entries().toArray();
  };
};

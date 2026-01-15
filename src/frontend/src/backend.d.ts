import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LevelProgress {
    completedChallenges: bigint;
    totalLevels: bigint;
    currentLevel: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    completeLevel(level: bigint): Promise<void>;
    completePersistentChallenge(level: bigint): Promise<void>;
    getAllUsersProgress(): Promise<Array<[Principal, LevelProgress]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLevelCount(): Promise<bigint>;
    getPersistentLevelProgress(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    resetProgress(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}

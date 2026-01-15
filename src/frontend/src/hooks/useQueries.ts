import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile } from '../backend';
import { toast } from 'sonner';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Profile saved successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save profile: ${error.message}`);
    },
  });
}

export function useGetPersistentLevelProgress() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['persistentLevelProgress'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getPersistentLevelProgress();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCompleteLevel() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (level: number) => {
      if (!actor) throw new Error('Actor not available');
      return actor.completeLevel(BigInt(level));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persistentLevelProgress'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to complete level: ${error.message}`);
    },
  });
}

export function useCompletePersistentChallenge() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (level: number) => {
      if (!actor) throw new Error('Actor not available');
      return actor.completePersistentChallenge(BigInt(level));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persistentLevelProgress'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to complete challenge: ${error.message}`);
    },
  });
}

export function useResetProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.resetProgress();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persistentLevelProgress'] });
      toast.success('Progress reset successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to reset progress: ${error.message}`);
    },
  });
}

export function useGetLevelCount() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['levelCount'],
    queryFn: async () => {
      if (!actor) return BigInt(2);
      return actor.getLevelCount();
    },
    enabled: !!actor && !actorFetching,
  });
}

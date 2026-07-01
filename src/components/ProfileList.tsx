import { memo } from "react";

import type {
  Platform,
  UserProfileSummary,
} from "@/types";

import { ProfileCard } from "./ProfileCard";
import { EmptyState } from "./EmptyState";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  onProfileClick: (username: string) => void;
}

export const ProfileList = memo(function ProfileList({
  profiles,
  platform,
  onProfileClick,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <EmptyState
        title="No Profiles Found"
        description="Try changing the search query or platform."
      />
    );
  }

  return (
    <div className="flex flex-col items-center">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
});
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import type { Platform, UserProfileSummary } from "@/types";

import { VerifiedBadge } from "./VerifiedBadge";
import { AddToListButton } from "./AddToListButton";

import { loadProfileByUsername } from "@/services/profileLoader";
import { formatFollowers } from "@/utils/formatters";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const profileData = await loadProfileByUsername(
      profile.username
    );

    if (!profileData) {
      alert(
        "Profile details are unavailable.\n\nThis profile cannot be opened."
      );
      return;
    }

    onProfileClick?.(profile.username);

    navigate(
      `/profile/${profile.username}?platform=${platform}`
    );
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 mb-2 w-full max-w-2xl cursor-pointer rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
    >
      <img
        src={profile.picture}
        alt={profile.username}
        loading="lazy"
        decoding="async"
        className="w-12 h-12 rounded-full"
      />

      <div className="flex-1 text-left">
        <div className="flex items-center gap-1 font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>

        <div className="text-sm text-gray-600">
          {profile.fullname}
        </div>

        <div className="text-sm text-gray-500">
          {formatFollowers(profile.followers)} followers
        </div>
      </div>

      <AddToListButton
        username={profile.username}
      />
    </div>
  );
});
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
      className="group mb-2 flex w-full max-w-2xl cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-gray-50 hover:shadow-lg"
    >
      <img
        src={profile.picture}
        alt={`${profile.fullname} profile`}
        loading="lazy"
        decoding="async"
        className="h-12 w-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <div className="flex-1 text-left">
        <div className="flex items-center gap-1 font-bold transition-colors duration-200 group-hover:text-blue-600">
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

      <div className="transition-transform duration-200 group-hover:scale-105">
        <AddToListButton
          username={profile.username}
        />
      </div>
    </div>
  );
});
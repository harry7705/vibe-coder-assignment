import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { AddToListButton } from "@/components/AddToListButton";

import type {
  FullUserProfile,
  ProfileDetailResponse,
} from "@/types";

import {
  formatFollowers,
  formatEngagementRate,
} from "@/utils/formatters";

import { loadProfileByUsername } from "@/services/profileLoader";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();

  const platform = searchParams.get("platform") || "Unknown";

  const [profileData, setProfileData] =
    useState<ProfileDetailResponse | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!username) {
        setLoading(false);
        return;
      }

      const data = await loadProfileByUsername(username);

      setProfileData(data);
      setLoading(false);
    }

    fetchProfile();
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile.</p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout title={`@${username}`}>
        <Loading />
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="mb-4 text-red-600">
          Could not load profile details for @{username}
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile =
    profileData.data.user_profile;

  return (
    <Layout title={user.fullname}>
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
      >
        <ArrowLeft size={16} />
        Back to Search
      </Link>

      <div className="mx-auto flex max-w-2xl items-start gap-6">
        <img
          src={user.picture}
          alt={user.username}
          loading="lazy"
          decoding="async"
          className="h-24 w-24 rounded-full border object-cover"
        />

        <div className="flex-1">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>

          <p className="text-gray-600">
            {user.fullname}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Platform: {platform}
          </p>

          {user.description && (
            <p className="mt-3 text-sm text-gray-700">
              {user.description}
            </p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <InfoCard
              title="Followers"
              value={formatFollowers(user.followers)}
            />

            <InfoCard
              title="Engagement Rate"
              value={formatEngagementRate(
                user.engagement_rate
              )}
            />

            {user.posts_count !== undefined && (
              <InfoCard
                title="Posts"
                value={user.posts_count}
              />
            )}

            {user.avg_likes !== undefined && (
              <InfoCard
                title="Avg Likes"
                value={formatFollowers(user.avg_likes)}
              />
            )}

            {user.avg_comments !== undefined && (
              <InfoCard
                title="Avg Comments"
                value={user.avg_comments}
              />
            )}

            {user.avg_views !== undefined &&
              user.avg_views > 0 && (
                <InfoCard
                  title="Avg Views"
                  value={formatFollowers(user.avg_views)}
                />
              )}

            {user.engagements !== undefined && (
              <InfoCard
                title="Engagements"
                value={user.engagements.toLocaleString()}
              />
            )}
          </div>

          {user.url && (
            <a
              href={user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            >
              View on Platform
              <ExternalLink size={16} />
            </a>
          )}

          <div className="mt-4">
            <AddToListButton
              username={user.username}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface InfoCardProps {
  title: string;
  value: string | number;
}

function InfoCard({
  title,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-lg border p-3 shadow-sm">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  );
}
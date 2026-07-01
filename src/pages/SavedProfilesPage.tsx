import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { EmptyState } from "@/components/EmptyState";

import {
  getSavedProfiles,
  toggleProfile,
} from "@/storage/listStorage";

import { loadProfileByUsername } from "@/services/profileLoader";

import { formatFollowers } from "@/utils/formatters";

import type { ProfileDetailResponse } from "@/types";

export function SavedProfilesPage() {
  const [profiles, setProfiles] = useState<ProfileDetailResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles() {
      const usernames = getSavedProfiles();

      const data = await Promise.all(
        usernames.map((username) =>
          loadProfileByUsername(username)
        )
      );

      setProfiles(
        data.filter(
          (item): item is ProfileDetailResponse =>
            item !== null
        )
      );

      setLoading(false);
    }

    fetchProfiles();
  }, []);

  const handleRemove = (username: string) => {
    toggleProfile(username);

    setProfiles((prev) =>
      prev.filter(
        (profile) =>
          profile.data.user_profile.username !== username
      )
    );
  };

  if (loading) {
    return (
      <Layout title="Saved Profiles">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout title="Saved Profiles">
      {profiles.length === 0 ? (
        <EmptyState
          title="No Saved Profiles"
          description="Add profiles from the search page."
        />
      ) : (
        <div className="mx-auto max-w-3xl space-y-4">
          {profiles.map((profile) => {
            const user = profile.data.user_profile;

            return (
              <div
                key={user.username}
                className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <Link
                  to={`/profile/${user.username}`}
                  className="flex items-center gap-4"
                >
                  <img
                    src={user.picture}
                    alt={user.username}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-bold text-gray-900">
                      @{user.username}
                    </h3>

                    <p className="text-gray-600">
                      {user.fullname}
                    </p>

                    <p className="text-sm text-gray-500">
                      Followers:{" "}
                      {formatFollowers(user.followers)}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() =>
                    handleRemove(user.username)
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700"
                >
                  <Trash2
                    size={16}
                    strokeWidth={2}
                  />
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
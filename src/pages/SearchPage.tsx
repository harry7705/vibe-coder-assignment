import { useState, useMemo, useCallback } from "react";
import type { Platform } from "@/types";

import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";

import {
  extractProfiles,
  filterProfiles,
} from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] =
    useState<Platform>("instagram");

  const [searchQuery, setSearchQuery] =
    useState("");

  // Memoize profile extraction
  const allProfiles = useMemo(
    () => extractProfiles(platform),
    [platform]
  );

  // Memoize filtering
  const filteredProfiles = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  // Stable callback
  const handleProfileClick = useCallback(
    (username: string) => {
      console.log("Clicked profile:", username);
    },
    []
  );

  return (
    <Layout title="Find Influencers">
      <p className="mb-4 text-sm text-gray-500">
        Browse top creators across social platforms
      </p>

      <PlatformFilter
        selected={platform}
        onChange={(newPlatform) => {
          setPlatform(newPlatform);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="mb-2 text-xs text-gray-400">
        Showing {filteredProfiles.length} of {allProfiles.length} on{" "}
        {platform}
      </p>

      <ProfileList
        profiles={filteredProfiles}
        platform={platform}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}
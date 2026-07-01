import { Search } from "lucide-react";

import type { Platform } from "@/types";
import {
  PLATFORMS,
  getPlatformLabel,
} from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-6">
      {/* Platform Buttons */}
      <div className="mb-4 flex flex-wrap justify-center gap-3">
        {PLATFORMS.map((platform) => (
          <button
            key={platform}
            type="button"
            onClick={() => onChange(platform)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              selected === platform
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {getPlatformLabel(platform)}
          </button>
        ))}
      </div>

      {/* Search Box */}
      <div className="relative mx-auto max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search by username or name..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
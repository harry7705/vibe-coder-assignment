import { useState } from "react";
import {
  isProfileSaved,
  toggleProfile,
} from "@/storage/listStorage";
import { loadProfileByUsername } from "@/services/profileLoader";

export function useSavedProfiles(username: string) {
  const [saved, setSaved] = useState(
    isProfileSaved(username)
  );

  const toggle = async (): Promise<boolean> => {
    const profile = await loadProfileByUsername(username);

    if (!profile) {
      alert(
        "Profile details are unavailable.\n\nThis profile cannot be added to your list."
      );
      return false;
    }

    const isNowSaved = toggleProfile(username);
    setSaved(isNowSaved);

    return isNowSaved;
  };

  return {
    saved,
    toggle,
  };
}
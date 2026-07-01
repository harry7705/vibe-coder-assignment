import { STORAGE_KEY } from "@/constants/storage";

/**
 * Get all saved profile usernames
 */
export function getSavedProfiles(): string[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Check whether a profile is already saved
 */
export function isProfileSaved(username: string): boolean {
  return getSavedProfiles().includes(username);
}

/**
 * Save or remove a profile
 * Returns true if saved, false if removed
 */
export function toggleProfile(username: string): boolean {
  const savedProfiles = getSavedProfiles();

  if (savedProfiles.includes(username)) {
    const updatedProfiles = savedProfiles.filter(
      (item) => item !== username
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedProfiles)
    );

    // Notify the app that saved profiles changed
    window.dispatchEvent(new Event("savedProfilesUpdated"));

    return false;
  }

  savedProfiles.push(username);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(savedProfiles)
  );

  // Notify the app that saved profiles changed
  window.dispatchEvent(new Event("savedProfilesUpdated"));

  return true;
}
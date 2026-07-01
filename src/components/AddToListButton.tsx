import { BookmarkPlus, Check } from "lucide-react";
import { useSavedProfiles } from "@/hooks/useSavedProfiles";

interface AddToListButtonProps {
  username: string;
}

export function AddToListButton({
  username,
}: AddToListButtonProps) {
  const { saved, toggle } = useSavedProfiles(username);

  const handleSave = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    toggle();
  };

  return (
    <button
      onClick={handleSave}
      aria-label={
        saved
          ? "Remove profile from saved list"
          : "Add profile to saved list"
      }
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        saved
          ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
          : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
      }`}
    >
      {saved ? (
        <>
          <Check size={16} strokeWidth={2.5} />
          Added
        </>
      ) : (
        <>
          <BookmarkPlus size={16} strokeWidth={2.5} />
          Add to List
        </>
      )}
    </button>
  );
}
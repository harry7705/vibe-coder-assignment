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
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
        saved
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-blue-600 text-white hover:bg-blue-700"
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
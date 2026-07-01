import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { getSavedProfiles } from "@/storage/listStorage";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [savedCount, setSavedCount] = useState(
    getSavedProfiles().length
  );

  useEffect(() => {
    const updateCount = () => {
      setSavedCount(getSavedProfiles().length);
    };

    // Initial update
    updateCount();

    // Listen for add/remove events
    window.addEventListener("savedProfilesUpdated", updateCount);

    return () => {
      window.removeEventListener(
        "savedProfilesUpdated",
        updateCount
      );
    };
  }, []);

  return (
    <div className="p-4 min-h-screen">
      <header className="mb-6 border-b pb-4 flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="text-xl font-semibold text-gray-900"
          >
            Influencer Search
          </Link>

          {title && (
            <h1 className="text-2xl mt-2">{title}</h1>
          )}
        </div>

        <Link
          to="/saved"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Saved ({savedCount})
        </Link>
      </header>

      <main>{children}</main>
    </div>
  );
}
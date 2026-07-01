import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Loading } from "@/components/Loading";

const SearchPage = lazy(() =>
  import("@/pages/SearchPage").then((module) => ({
    default: module.SearchPage,
  }))
);

const ProfileDetailPage = lazy(() =>
  import("@/pages/ProfileDetailPage").then((module) => ({
    default: module.ProfileDetailPage,
  }))
);

const SavedProfilesPage = lazy(() =>
  import("@/pages/SavedProfilesPage").then((module) => ({
    default: module.SavedProfilesPage,
  }))
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<SearchPage />} />

          <Route
            path="/profile/:username"
            element={<ProfileDetailPage />}
          />

          <Route
            path="/saved"
            element={<SavedProfilesPage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
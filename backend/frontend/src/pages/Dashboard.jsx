import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

const DashSidebar = lazy(() => import("../components/DashSidebar"));
const DashProfile = lazy(() => import("../components/DashProfile"));
const DashPosts = lazy(() => import("../components/DashPosts"));
const DashUsers = lazy(() => import("../components/DashUsers"));
const DashComments = lazy(() => import("../components/DashComments"));
const DashboardComp = lazy(() => import("../components/DashboardComp"));

import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
  const location = useLocation();

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab"); // http://localhost:5173/dashboard?tab=profile
    //you get the value of tab from the url
    setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Side bar */}
      <div className="md:w-56">
        <Suspense fallback={<LoadingSpinner />}>
          <DashSidebar />
        </Suspense>
      </div>
      {/* profile */}
      {tab === "profile" && (
        <Suspense fallback={<LoadingSpinner />}>
          <DashProfile />
        </Suspense>
      )}
      {/* posts */}
      {tab === "posts" && (
        <Suspense fallback={<LoadingSpinner />}>
          <DashPosts />
        </Suspense>
      )}
      {/* users */}
      {tab === "users" && (
        <Suspense fallback={<LoadingSpinner />}>
          <DashUsers />
        </Suspense>
      )}
      {/* comments */}
      {tab === "comments" && (
        <Suspense fallback={<LoadingSpinner />}>
          <DashComments />
        </Suspense>
      )}
      {/* DashBoard */}
      {tab === "dash" && (
        <Suspense fallback={<LoadingSpinner />}>
          <DashboardComp />
        </Suspense>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

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
      <div className="md:w-56">
        {/* Side bar */}
        <DashSidebar />
      </div>
      <div className="md:w-full">
        {/* profile */}
        {tab === 'profile' && <DashProfile />}
      </div>
    </div>
  );
}

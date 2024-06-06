import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiDocumentText,
  HiUser,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tab, setTab] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab"); // http://localhost:5173/dashboard?tab=profile
    //you get the value of tab from the url
    setTab(tabFromUrl);
  }, [location.search]);

  const navigateToProfile = () => {
    navigate("/dashboard?tab=profile");
  };

  const navigateToPosts = () => {
    navigate("/dashboard?tab=posts");
  };

  const navigateToUsers = () => {
    navigate("/dashboard?tab=users");
  };

  const navigateToComments = () => {
    navigate("/dashboard?tab=comments");
  };

  const navigateToDash = () => {
    navigate("/dashboard?tab=dash");
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser.isAdmin && (
            <Sidebar.Item
              onClick={navigateToDash}
              active={tab === "dash"}
              icon={HiChartPie}
            >
              Dashboard
            </Sidebar.Item>
          )}

          <Sidebar.Item
            onClick={navigateToProfile}
            active={tab === "profile"}
            icon={HiUser}
            label={currentUser.isAdmin ? "Admin" : "User"}
            labelColor="dark"
          >
            Profile
          </Sidebar.Item>

          {currentUser.isAdmin && (
            <Sidebar.Item
              onClick={navigateToPosts}
              active={tab === "posts"}
              icon={HiDocumentText}
            >
              Posts
            </Sidebar.Item>
          )}
          {currentUser.isAdmin && (
            <Sidebar.Item
              onClick={navigateToUsers}
              active={tab === "users"}
              icon={HiOutlineUserGroup}
            >
              Users
            </Sidebar.Item>
          )}
          {currentUser.isAdmin && (
            <Sidebar.Item
              onClick={navigateToComments}
              active={tab === "comments"}
              icon={HiAnnotation}
            >
              Comments
            </Sidebar.Item>
          )}

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

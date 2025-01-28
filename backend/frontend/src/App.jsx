import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

const Home =  lazy(() => import("./pages/Home"));
const About =  lazy(() => import("./pages/About"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Project = lazy(() => import("./pages/Project"));
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const Privateroute = lazy(() => import("./components/Privateroute"));
const AdminRoute = lazy(() => import("./components/AdminRoute"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const UpdatePost = lazy(() => import("./pages/UpdatePage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const Search = lazy(() => import("./pages/Search"));

export default function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<LoadingSpinner />}>
    <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />

        <Route element={<Privateroute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/projects" element={<Project />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

import React from "react";
import { Route, Routes } from "react-router-dom";  // Import Routes and Route
import PostList from "./PostList";
import PostDetail from "./PostDetail";

const ApplicationViews = () => {
  return (
    <Routes>  {/* Replace Switch with Routes */}
      {/* Route for displaying the list of posts */}
      <Route path="/" element={<PostList />} />

      {/* Route for displaying the detail view of a post */}
      <Route path="/post/:id" element={<PostDetail />} />

      {/* You can add other routes here as well */}
    </Routes>
  );
};

export default ApplicationViews;

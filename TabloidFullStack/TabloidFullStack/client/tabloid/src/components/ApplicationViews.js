import React from "react";
import { Route, Routes } from "react-router-dom";
import PostList from "./PostList";
import { TagList } from "./Tags/TagList.js";
import PostDetail from "./PostDetail.js";

const ApplicationViews = () => {
  // return (
  //   <Routes>  {/* Replace Switch with Routes */}
  //     {/* Route for displaying the list of posts */}
  //     <Route path="/" element={<PostList />} />

 return(
      <Routes>

        <Route path="/" element={<PostList />} />

        <Route path="/post/:id" element={<PostDetail />} />

       <Route path="/tags/create" element= {<CreateTagForm/>} /> 

        {/* <Route path="/tags/:delete" element= {<TagForm/>} />  */}

        <Route path="/tags/:update" element= {<CreateTagForm/>} /> 

        <Route path="/tags" element= {<TagList/>} /> 


     <Route path="/tags/:id" element= {<TagDetails/>} /> 



      </Routes>
   );
 
}
      {/* Route for displaying the detail view of a post */}
import PostDetail from "./PostDetail";
import { CreateTagForm } from "./Tags/CreateTagForm";
import { TagList } from "./Tags/TagList";
import { UpdateTagForm } from "./Tags/UpdateTagForm";
import { TagDetails } from "./Tags/TagDetails";

const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/tags/create" element={<CreateTagForm />} />
      <Route path="/tags/:update" element={<UpdateTagForm />} />
      <Route path="/tags" element={<TagList />} />
      <Route path="/tags/:id" element={<TagDetails />} />
    </Routes>
  );
};

export default ApplicationViews;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { CreateTagForm } from "./Tags/CreateTagForm.js";
import { UpdateTagForm } from "./Tags/UpdateTagForm.js";
import { TagList } from "./Tags/TagList.js";
import { TagDetails } from "./Tags/TagDetails.js";
import { Route, Routes } from "react-router-dom";  // Import Routes and Route
import PostList from "./PostList";
import PostDetail from "./PostDetail";

const ApplicationViews = () => {
  return (
    <Routes>  {/* Replace Switch with Routes */}
      {/* Route for displaying the list of posts */}
      <Route path="/" element={<PostList />} />

 return(
      <Routes>
        <Route path="/" element={<Hello />} />

       <Route path="/tags/create" element= {<CreateTagForm/>} /> 

        {/* <Route path="/tags/:delete" element= {<TagForm/>} />  */}

        <Route path="/tags/:update" element= {<UpdateTagForm/>} /> 

        <Route path="/tags" element= {<TagList/>}/> 


     <Route path="/tags/:id" element= {<TagDetails/>}/> 



      </Routes>
   );
 
}
      {/* Route for displaying the detail view of a post */}
      <Route path="/post/:id" element={<PostDetail />} />

      {/* You can add other routes here as well */}
    </Routes>
  );
};

export default ApplicationViews;

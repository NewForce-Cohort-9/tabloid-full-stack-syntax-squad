import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { CreateTagForm } from "./Tags/CreateTagForm.js";
import { UpdateTagForm } from "./Tags/UpdateTagForm.js";
import { TagList } from "./Tags/TagList.js";
import { TagDetails } from "./Tags/TagDetails.js";

export default function ApplicationViews() {

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
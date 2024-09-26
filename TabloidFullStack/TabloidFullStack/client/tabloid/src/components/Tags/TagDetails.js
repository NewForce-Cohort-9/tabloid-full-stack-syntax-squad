import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getTag } from "../../Managers/TagManager.js";
import { Tag } from "./Tags.js";

export const TagDetails = () => {
   const [tag, setTag] = useState(); 
   const {id} = useParams(); 

   useEffect(() => {
        getTag(id).then(setTag);
   }, []);

   if (!tag) {
        return null; 
   }

   return (
        <div className="container">
          <div className="row justify-content-center">
               <div className="col-sm-12 col-lg-6">
                    <Tag tag={tag}/>
               </div>
          </div>
      </div>
   );
}
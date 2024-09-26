import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { addTag, updateTag } from "../../Managers/TagManager.js";
import TagPageHeader from "./TagPageHeader.js";
import { getByDisplayValue } from "@testing-library/react";
import { Input } from "reactstrap";

export const UpdateTagForm = () => {
    const [tagName, setTagName] = useState();

    const navigate = useNavigate();
    const {id: tagId} = useParams();

    const handleTagSubmit = async (e) => {
        e.preventDefault();
        if(tagId) {
            await updateTag ({ id: tagId, name: tagName});
            navigate("/tags");

        } else {
            const newTag = await addTag({name: tagName});
            if(newTag) navigate("/tags"); 
        }
    };

    const callGetTag = async () => {
        const tag = await getByDisplayValue(tagId);
        setTagName(tag.name);
    }; 

    useEffect(() => {
        if(tagId) callGetTag(tagId);
    }, [tagId]); 

    return (
        <>
          <TagPageHeader title={tagId ? "Edit tag" : "Edit Tag"} />
          <div className="container pt-5">
            <div className="container d-flex align-items-center justify-content-center flex-column">
              <form onSubmit={handleTagSubmit}>
                {tagId ? (
                  <h1 className="p-4">
                    Editing Tag #{tagId}. Enter a new tag name.
                  </h1>
                ) : (
                  <h1 className="p-4">Enter a new tag name</h1>
                )}
                <Input
                  placeholder={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                />
    
                <button
                  type="submit"
                  className="btn mt-4 btn-primary mx-1 text-white w-100"
                >
                  Save
                </button>
                <button
                  onClick={() => navigate("/tags")}
                  type="button"
                  className="btn mt-4 btn-outline-primary mx-1 text-primary w-100"
                >
                  Cancel
                </button>

              </form>
            </div>
          </div>
        </>
      );
    }
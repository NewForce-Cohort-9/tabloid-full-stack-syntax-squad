import { useEffect, useState } from "react"
import { getAllTags } from "../../Managers/TagManager.js";
import { Tag } from "./Tags.js";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const TagList = () => {
    const [tags, setTags] = useState([]);
    
    const navigate = useNavigate()
    const getTags = () => {
        getAllTags().then(allTags => setTags(allTags));
    };

    useEffect(() => {
        getTags();
    }, []);
 const TagForm = (e) => {
    e.preventDefault()
    navigate("/tags/create")
 }
    return (
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {tags.map((tag) => {
                       return <Tag key={tag.id} tag={tag}/>
})}
                </div>
        <Button onClick={TagForm}>
                     Create Tag
        </Button>

            </div>
        </div>
        
        
        
        
        </>
    )
}
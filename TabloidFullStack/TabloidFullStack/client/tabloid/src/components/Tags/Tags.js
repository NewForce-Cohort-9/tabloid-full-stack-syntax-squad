import { Link } from "react-router-dom"
import { Button, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap"

export const Tag = ({tag}) => {
    return (
     <Card>
         <CardBody>
                <p>
                    <Link to={`/tags/${tag.id}`}>
                    
                    <strong>{tag.name}</strong>
                    </Link>

                     <Link to={`/tags/:update${tag.id}`}>
                    <div>Edit Tag</div>
                    </Link>

                    {/* <Link to={`/tags/:delete${tag.id}`}>
                    <div>Delete</div>
                    </Link> */}

                </p>
                
                 </CardBody>

         

        </Card> 

      

    

        


 )
 
 
} 



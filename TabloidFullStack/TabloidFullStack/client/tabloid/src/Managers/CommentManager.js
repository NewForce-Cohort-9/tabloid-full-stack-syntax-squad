// The base URL for the API that deals with comments
const apiUrl = "https://localhost:5001/api/Comment";

// Function to get all comments for a specific post by its postId
// 'postId' is a parameter that represents the ID of the post we're getting comments for
export const GetAllComments = (postId) => {
    // We use fetch to make a GET request to the API, passing the postId in the query string (?postId=)
    // When the data comes back, it's in JSON format, so we use .then() to parse it into a JavaScript object
    return fetch(`${apiUrl}?postId=${postId}`).then((res) => res.json());
};

// Function to add a new comment
// 'singleComment' is the new comment object that we're sending to the server
export const addComment = async (singleComment) => {
    // We use fetch to make a POST request to the API to add a new comment
    return fetch(apiUrl, {
        method: 'POST', // 'POST' means we are sending data to create a new resource
        headers: {
            'Content-Type': 'application/json', // Tells the API we are sending JSON data
        },
        body: JSON.stringify(singleComment), // Convert the 'singleComment' object into a JSON string before sending
    });
};

// Function to get a comment by its ID
// 'commentId' is the ID of the specific comment we want to retrieve
export const getCommentById = (commentId) => {
    // We use fetch to make a GET request to the API, asking for a specific comment using its ID in the URL
    // The response is in JSON format, so we use .then() to convert it into a JavaScript object
    return fetch(`${apiUrl}/${commentId}`).then(res => res.json());
};

// Function to delete a comment by its ID
// 'commentId' is the ID of the comment we want to delete
export const deleteComment = (commentId) => {
    // We use fetch to make a DELETE request to the API, specifying which comment to delete by its ID
    return fetch(`${apiUrl}/${commentId}`, {
        method: 'DELETE', // 'DELETE' means we're telling the server to remove this resource
    });
};

// Function to edit/update an existing comment by its ID
// 'commentId' is the ID of the comment we want to update, and 'updatedComment' is the new data we want to save
export const editComment = async (commentId, updatedComment) => {
    // We use fetch to make a PUT request to the API, which updates an existing resource
    const response = await fetch(`${apiUrl}/${commentId}`, {
        method: 'PUT', // 'PUT' means we're updating an existing comment
        headers: {
            'Content-Type': 'application/json', // Tells the API that we're sending JSON data
        },
        body: JSON.stringify(updatedComment), // Convert the updatedComment object into a JSON string before sending
    });
};

const baseUrl =  'https://localhost:5001/api/Tags';



export const getAllTags = () => {
    return fetch(baseUrl)
        .then((res) => res.json())

};

export const createTag = (singleTag) => {
    return fetch(baseUrl, {
        method: "Post", 
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(singleTag), 
             });
};

export const deleteTag = (tagId) => {
    return fetch(baseUrl, {
        method: "DELETE", 
    })

}

export const updateTag = (tag) => {
    return fetch(baseUrl, {
        method: "PUT", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(tag), 
    });

};

export const getTag = (id) => {
    return fetch(`${baseUrl}/GetTagById/${id}`).then((res) => res.json());
};


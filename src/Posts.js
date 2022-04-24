import axios from "axios";
import React from "react";

const getDataUrl = "https://my-json-server.typicode.com/siddharth8899/postsDashboard/db";

export default function App() {
  const [posts, setPosts] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [post, setPost] = React.useState(null);
  const baseURL = "https://my-json-server.typicode.com/siddharth8899/postsDashboard/db";

  React.useEffect(() => {
    axios.get(getDataUrl).then((response) => {
      setPosts(response.data);
    }).catch(error => {
      setError(error);
    });
  }, []);

  function createPost() {
    axios
      .post(baseURL, {
        title: "Hello World!",
        body: "This is a new post."
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  function updatePost() {
    axios
      .put(`${baseURL}/1`, {
        title: "Hello World!",
        body: "This is an updated post."
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  function deletePost() {
    axios
      .delete(`${baseURL}/1`)
      .then(() => {
        alert("Post deleted!");
        setPost(null)
      });
  }
console.log(post);
  
console.log(posts);
  if (!posts) return null;
  if (error) return `Error: ${error.message}`;
            
  return (
    <div>
      {
          posts.map(el => {
              return <li>{el.title} <button onClick={()=>createPost()} >button </button>
              <button onClick={()=>updatePost()}>Update Post</button>
              <button onClick={()=>deletePost}>Delete Post</button>
                {post && <p>{post.title}</p>}</li>
          })
      }
    </div>
  );
}
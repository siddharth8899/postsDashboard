import { Button, FormControl, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import './App.css';
import Accordion from './Accordion';
import axios from "axios";

function App() {
  const getDataUrl = "https://my-json-server.typicode.com/siddharth8899/postsDashboard/db";

  const [post, setPost] = useState({
    userName: '',
    title: '',
    body: ''
  });
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState('');

  useEffect(() => {
    axios.get(getDataUrl).then((response) => {
      setPosts(response.data.posts);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const createPost = (event) => {
    const { name = '', value = '' } = event.target;
    setPost({ ...post, [name]: value });
  }

  const editPostSubmit = () => {
    const newPosts = [...posts];
    newPosts.splice(index, 1, post);
    setPost({
      userName: '',
      title: '',
      body: ''
    });
    setPosts(newPosts);
    setEdit(false);
  }

  const editPost = (index, post) => {
    setPost(post);
    document.getElementById('name').focus();
    setEdit(true);
    setIndex(index);
  };

  const deletePost = index => {
    if(edit){
      setEdit(false);
      return setPost({
        userName: '',
        title: '',
        body: ''
      });
    }
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };
  const submit = () => {
    if(edit){
      return editPostSubmit();
    }
    if(post.userName.length!==0 && post.title.length!==0 && post.body.length!==0) {
      setPosts([...posts, post]);
    setPost({
      userName: '',
      title: '',
      body: ''
    });
  }
}

  return (
    <div className="App">
      <FormControl>
        <TextField
          id="name"
          label="Name"
          name="userName"
          value={post.userName}
          onChange={createPost}
          required
        />

        <TextField
          label="Title"
          name="title" value={post.title}
          onChange={createPost}
          style={{ margin: '20px 0px' }}
          required
        />

        <TextField
          label="Comment"
          name="body"
          value={post.body}
          onChange={createPost}
          required
        />
        <Button variant="contained" onClick={submit} style={{margin: '20px'}}>{edit ? "edit" : "submit"}</Button>
      </FormControl>
      {posts.length!==0 && posts.map((post, index)=>
        (<Accordion post={post} key={index} index={index} deletePost={deletePost} editPost={editPost} />
      ))}
    </div>
  );
}

export default App;

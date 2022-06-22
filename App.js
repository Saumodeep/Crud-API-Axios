import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => setPosts(res.data));
  }, []);

  const addPost = async () => {
    const post = { title: "New Post", body: "new" };
    await axios.post(`https://jsonplaceholder.typicode.com/posts`, post);
    setPosts([post, ...posts]);
  };

  const handleUpdate = async (post) => {
    post.title = "updated title";
    await axios.put(
      `https://jsonplaceholder.typicode.com/posts` + "/" + post.id
    );
    const postsClone = [...posts];
    const index = postsClone.indexOf(post);
    postsClone[index] = { ...post };
    setPosts(postsClone);
  };

  const handleDelete = async (post) => {
    await axios.delete(
      `https://jsonplaceholder.typicode.com/posts` + "/" + post.id + post
    );
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  console.log("Title", posts);
  console.log("post.length", posts?.length);

  return (
    <div class="container">
      <h2>There are {posts.length} post in the database </h2>
      <button onClick={addPost} className="btn btn-primary">
        {" "}
        Add Post
      </button>
      <div>
        <h1> Table </h1>
        <table class="table">
          <thead>
            <tr className="bg-dark text-white">
              <th scope="col">Sl. no</th>
              <th scope="col">Title</th>
              <th>Action</th>
              {/* <th scope="col">Content</th> */}
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{post.title}</td>
                  {/* <td>{post.body}</td> */}
                  <div>
                    <button
                      onClick={() => handleUpdate(post)}
                      className="btn btn-primary mx-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(post)}
                      className="btn btn-danger "
                    >
                      Delete
                    </button>
                  </div>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

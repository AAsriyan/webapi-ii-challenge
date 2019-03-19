import React, { Component } from "react";
import PostList from "./components/PostList.js";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
    title: "",
    contents: ""
  };

  componentDidMount = () => {
    this.getPosts();
  };

  getPosts = () => {
    axios
      .get("http://localhost:4000/api/posts")
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  };

  handleFormChanges = e => {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  };

  addPost = e => {
    e.preventDefault();
    const newPost = {
      title: this.state.title,
      contents: this.state.contents
    };

    axios
      .post("http://localhost:4000/api/posts", newPost)
      .then(res => {
        console.log(res);
        this.getPosts();
      })
      .catch(err => console.log(err));

    this.setState({
      title: "",
      contents: ""
    });
  };

  deletePost = (e, id) => {
    e.preventDefault();

    axios.delete(`http://localhost:4000/api/posts/${id}`).then(res => {
      console.log(res);
      this.getPosts();
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Lambda Posts</h1>
        <PostList
          posts={this.state.posts}
          getPosts={this.getPosts}
          deletePost={this.deletePost}
        />
        <form onSubmit={this.addPost}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            autoComplete="off"
            value={this.state.title}
            onChange={this.handleFormChanges}
          />
          <input
            type="text"
            name="contents"
            placeholder="Contents"
            required
            autoComplete="off"
            value={this.state.contents}
            onChange={this.handleFormChanges}
          />
          <button>Submit Post</button>
        </form>
      </div>
    );
  }
}

export default App;

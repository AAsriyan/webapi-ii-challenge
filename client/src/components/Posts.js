import React, { Component } from "react";
import axios from "axios";

export class Posts extends Component {
  state = {
    isEditing: false,
    title: "",
    contents: ""
  };

  handleEdit = e => {
    e.preventDefault();

    this.state.isEditing
      ? this.setState({ isEditing: false })
      : this.setState({ isEditing: true });
  };

  handlePostChanges = e => {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  };

  updatePost = (e, id) => {
    e.preventDefault();

    const updatedPost = {
      title: this.state.title,
      contents: this.state.contents
    };

    axios
      .put(`http://localhost:4000/api/posts/${id}`, updatedPost)
      .then(res => {
        console.log(res);
        this.props.getPosts();
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      isEditing: false,
      title: "",
      contents: ""
    });
  };

  render() {
    if (this.state.isEditing) {
      return (
        <form onSubmit={e => this.updatePost(e, this.props.post.id)}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            autoComplete="off"
            value={this.state.title}
            onChange={this.handlePostChanges}
          />
          <input
            type="text"
            name="contents"
            placeholder="Contents"
            required
            autoComplete="off"
            value={this.state.contents}
            onChange={this.handlePostChanges}
          />
          <button onClick={this.handleEdit}>Cancel</button>
          <button>Submit</button>
        </form>
      );
    } else {
      return (
        <div>
          <h2>
            <span>Title: </span>
            {this.props.post.title}
          </h2>
          <p>
            <span>Content: </span>
            {this.props.post.contents}
          </p>
          <p>
            <span>id: </span>
            {this.props.post.id}
          </p>
          <button onClick={e => this.props.deletePost(e, this.props.post.id)}>
            Delete
          </button>
          <button onClick={this.handleEdit}>Update</button>
        </div>
      );
    }
  }
}

export default Posts;

import React, { Component } from "react";
import Posts from "./Posts";

export class PostList extends Component {
  render() {
    return (
      <div>
        <h2>Post List</h2>
        {this.props.posts.map(post => (
          <Posts
            post={post}
            key={post.id}
            deletePost={this.props.deletePost}
            getPosts={this.props.getPosts}
          />
        ))}
      </div>
    );
  }
}

export default PostList;

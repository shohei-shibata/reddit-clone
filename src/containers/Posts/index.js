import React, { Component } from 'react';

class Posts extends Component {
  handleUpvote = (post, key) => {
    console.log('upvote', post, key);
    this.props.firebase.ref('posts/' + key).set({
      title: post.title,
      upvote: post.upvote ? post.upvote + 1 : 1,
      downvote: post.downvote || 0
    });
  }
  handleDownvote = (post, key) => {
    this.props.firebase.ref('posts/' + key).set({
      title: post.title,
      upvote: post.upvote || 0,
      downvote: post.downvote ? post.downvote + 1 : 1
    });
  }
  render() {
    let posts = this.props.posts;
    let _this = this;

    console.log('posts', posts);

    if (!posts) {
      return false;
    }

    if (this.props.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div className="Posts">
        { Object.keys(posts).map(key => {
          let title = posts[key].title;
          let upvotes = posts[key].upvote || 0;
          let downvotes = posts[key].downvote || 0;
          return (
            <div key={key}>
              <div>Title: { title }</div>
              <div>Upvotes: { upvotes }</div>
              <div>Downvotes: { downvotes }</div>
              <div>
                <button
                  onClick={ _this.handleUpvote.bind(this,
                    posts[key], key) }
                  type="button"
                >
                  Upvote
                </button>
                <button
                  onClick={ _this.handleDownvote.bind(this,
                    posts[key], key) }
                  type="button"
                >
                  Downvote
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Posts;

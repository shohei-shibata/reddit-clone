import React, { Component } from 'react';

import * as firebase from 'firebase';

import config from './firebase-config';

class App extends Component {
  constructor() {
    super();
    
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }
  state = {
    posts: [],
    loading: false
  }
  componentWillMount() {

    let postsRef = firebase.database().ref('posts');

    let _this = this;

    postsRef.on('value', function(snapshot) {
      console.log('snapshot', snapshot.val());

      _this.setState({
        posts: snapshot.val(),
        loading: false
      });
    });

  }
  render() {
    console.log(this.props.children);
    return (
      <div className="App">
        {this.props.children && React.cloneElement(
          this.props.children, {
            firebaseRef: firebase.database().ref('posts'),
            posts: this.state.posts,
            loading: this.state.loading
          }
        )}
      </div>
    );
  }
}

export default App;

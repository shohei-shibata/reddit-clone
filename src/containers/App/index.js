import React, { Component } from 'react';

import * as firebase from 'firebase';

import config from './firebase-config';

class App extends Component {
  constructor() {
    super();
    
    // Initialize Firebase
    //if (!firebase.app.length) {
      console.log('initialize');
      firebase.initializeApp(config);

      let postsRef = firebase.database().ref('posts');

      let _this = this;
      
      console.log(postsRef);

      postsRef.on('value', function(snapshot) {
        console.log('snapshot', snapshot.val());
      });

    //}
  }
  render() {
    return (
      <div className="App">
        Hello World
      </div>
    );
  }
}

export default App;

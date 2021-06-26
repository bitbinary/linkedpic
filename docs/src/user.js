import { fetch_post_by_id, fetch_user_details_by_id } from "./feedService.js";

export default class User {
  constructor() {
    /**
     *@param {String} this.username - stores the inputed username
     *@param {String} this.password - stores the inputed password
     *@param {String} this.user_token - stores the user token value
     */
    this.user = {};
    this.username = "";
    this.password = "";
    this.user_token = "";
    this.feed_length = 0;
    this.numberOfFeeds = 5;
    this.feeds = {
      posts: [],
    };
  }
  setUsername(name) {
    // console.log(name);
    this.username = name;
  }
  setPassword(password) {
    this.password = password;
  }
  setUserToken(token) {
    return new Promise((resolve, reject) => {
      this.user_token = token;
      resolve();
    });
  }
  setUserDetails(data) {
    this.user = data;
  }
  getUserToken() {
    return this.user_token;
  }
  getUserName() {
    return this.username;
  }
  getPassword() {
    return this.password;
  }
  getUserId() {
    return this.user.id;
  }
  setFeeds = (posts = []) => {
    posts.sort((a, b) => b.meta.published - a.meta.published);

    if (this.feeds.posts.length == 0) this.feeds.posts = posts;
    else {
      this.feeds.posts.push(...posts);
      this.feeds.posts.sort((a, b) => b.meta.published - a.meta.published);
    }
    this.feed_length = this.feeds.posts.length;
  };
  getFeedLength() {
    return this.feed_length;
  }

  updateUserDetails() {
    return fetch_user_details_by_id(this.user.id).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          this.user = data;
        });
      }
    });
  }
}

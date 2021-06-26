// import API from './api.js';
// // A helper you may want to use when uploading new images to the server.
// import { fileToDataUrl } from './helpers.js';

// // This url may need to change depending on what port your backend is running
// // on.
// const api = new API('http://localhost:5000');

// // Example usage of makeAPIRequest method.
// api.makeAPIRequest('dummy/user')
//     .then(r => console.log(r));

import Login from "./login.js";
import {
  fetch_user_details_by_username,
  fetch_feeds,
  fetch_user_details_by_id,
} from "./feedService.js";
// import { loginPage } from "./domFragments.js";
import { addElement, replaceElement } from "./domUpdater.js";
// Routes
export const routes = [
  { path: "/", component: "loginPage" },
  { path: "/#login", component: "loginPage" },
  { path: "/page1", component: "dashboard" },
  { path: "/page2", component: "profile" },
];

export default class App {
  constructor() {}
  auth = new Login();

  initialiseApp(app) {
    app.auth = this.auth;
    app.main = this;
    window.history.pushState(
      { page: 1, name: "loginPage" },
      "loginPage",
      "#loginPage"
    );
    let root = document.getElementById("root-contianer");
    addElement(root, window.history.state.name);
  }

  confirmPassword = () => {
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("password-confirm").value;
    return password == confirm_password;
  };

  processLogin = () => {
    if (!this.confirmPassword()) return alert("password don't match");
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    this.auth.signinWithUsernameAndPassword({
      username: username,
      password: password,
    });
  };
  processRegistration = () => {
    if (!this.confirmPassword()) return alert("password don't match");
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let name = document.getElementById("password").value;
    this.auth.signupWithUsernameAndPassword({
      username: username,
      password: password,
      email: email,
      name: name,
    });
  };
  changeScreenTo = (path, data = {}) => {
    let p = "";
    let route = path.split("=")[0];
    console.log(route);
    if (route == "loginPage") {
      console.log("loginPage");
      let root = document.getElementById("root-contianer");
      replaceElement(root, "loginPage", data);
      return;
    } else if (route == "registration") {
      let root = document.getElementById("root-contianer");
      replaceElement(root, "registration", data);
      window.history.pushState(
        { name: `registration`, data: p },
        `registration`,
        `#registration`
      );
      return;
    }
    console.log(route);
    if (!this.auth.user.getUserToken()) {
      alert("please sign in");
      let root = document.getElementById("root-contianer");
      replaceElement(root, "loginPage", data);
      return;
    }

    if (route == "dashboard") {
      let root = document.getElementById("root-contianer");
      replaceElement(root, "dashboard", data);
      this.fetchFeeds();
    } else if (route == "addPostPage") {
      let root = document.getElementById("root-contianer");
      replaceElement(root, "addPostPage", data);
    } else if (route == "Profile") {
      console.log(data);
      if (data?.name && path.split("=")[1] != "me") {
        p = `=${data?.name}`;
      } else {
        if (path.split("=")[1] == "me" || path.split("=").length == 1) {
          p = `=${main.auth.user.getUserName()}`;
        } else {
          p = `=${path.split("=")[1]}`;
        }
        fetch_user_details_by_username(p.split("=")[1]).then((res) => {
          res.json().then((data) => {
            let root = document.getElementById("root-contianer");
            replaceElement(root, "Profile", data);
          });
        });
        return;
      }

      let root = document.getElementById("root-contianer");
      replaceElement(root, "Profile", data);
    }
    window.history.pushState(
      { name: `${route}${p}`, data: p },
      `${route}`,
      `#${route}${p}`
    );
    // let root = document.getElementById("root-contianer");
    // let pageData = data || window.history.state.data;

    // console.log(data, pageData);
    // replaceElement(root, path, data);
  };
  fetchFeeds = () => {
    fetch_feeds()
      .then((res) =>
        res.json().then((data) => {
          main.auth.user.setFeeds(data.posts);
          let parent = document.getElementById("dashboard-container");
          let blank_dashboard = document.createElement("div");
          blank_dashboard.setAttribute("class", "blank_dashboard");
          parent.appendChild(blank_dashboard);

          if (data.posts.length == 0 && !main.auth.user.getFeedLength()) {
            let no_feed_p_heading = document.createElement("p");
            no_feed_p_heading.setAttribute("class", "no_feed_p_heading");
            no_feed_p_heading.append("No feeds to display");
            blank_dashboard.appendChild(no_feed_p_heading);
            let no_feed_p = document.createElement("p");
            no_feed_p.setAttribute("class", "no_feed_p");
            no_feed_p.append(
              "Please follow some users to get feeds. You can use the search bar on top to find users"
            );
            blank_dashboard.appendChild(no_feed_p);
          } else {
            let no_feed_p_heading = document.createElement("p");
            no_feed_p_heading.setAttribute("class", "no_feed_p_heading");
            no_feed_p_heading.append("Your Feeds");
            blank_dashboard.appendChild(no_feed_p_heading);
          }
          for (const feed of main.auth.user.feeds.posts) {
            addElement(parent, "feed", feed);
          }
        })
      )
      .catch((err) => console.warn(`API_ERROR: ${err.message}`));
  };
  view_my_profile = () => {
    let has_token = main.auth.user.getUserToken();
    if (has_token) {
      fetch_user_details_by_username(main.auth.user.getUserName()).then((res) =>
        res.json().then((data) => {
          main.auth.user.updateUserDetails();
          main.changeScreenTo("Profile", data);
        })
      );
    } else {
      alert(
        "Oops, I think you forgot to signin. It's alright, Please try again after signing in "
      );
    }
  };

  find_user() {
    let search_box = document.getElementById("nav-user-search-box");
    console.log(search_box.value);
    if (!this.auth.user.getUserToken()) {
      alert("please login to continue");
    } else {
      fetch_user_details_by_username(search_box.value).then((res) => {
        if (res.status == 400) {
          alert("malformed Request");
        } else if (res.status == 403) {
          alert("Invalid auth token");
        } else if (res.status == 404) {
          alert("User not found");
        } else if (res.status == 200) {
          res.json().then((data) => {
            main.changeScreenTo("Profile", data);
          });
        }
      });
    }
  }

  app_name_navigation() {
    if (!main.auth.user.getUserToken()) {
      main.changeScreenTo("loginPage");
    } else {
      main.changeScreenTo("dashboard");
    }
  }

  load_more() {
    fetch_feeds()
      .then((res) =>
        res.json().then((data) => {
          main.auth.user.setFeeds(data.posts);
          let oldContainer = document.getElementById("dashboard-container");
          // let newContainer = document.createElement("div");
          // newContainer.setAttribute("id", "dashboard-container");
          // div.replaceChild(newContainer, oldContainer);
          let blank_dashboard = document.createElement("div");
          blank_dashboard.setAttribute("class", "blank_dashboard");
          oldContainer.appendChild(blank_dashboard);

          if (main.auth.user.feeds.posts.length == 0 && data) {
            let no_feed_p_heading = document.createElement("p");
            no_feed_p_heading.setAttribute("class", "no_feed_p_heading");
            no_feed_p_heading.append("No feeds to display");
            blank_dashboard.appendChild(no_feed_p_heading);
            let no_feed_p = document.createElement("p");
            no_feed_p.setAttribute("class", "no_feed_p");
            no_feed_p.append(
              "Please follow some users to get feeds. You can use the search bar on top to find users"
            );
            blank_dashboard.appendChild(no_feed_p);
          }
          if (data.posts.length != 0) {
            for (const feed of data.posts) {
              addElement(oldContainer, "feed", feed);
            }
          } else {
          }
        })
      )
      .catch((err) => console.warn(`API_ERROR: ${err.message}`));
  }
}

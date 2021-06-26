import {
  formatDateToDisplay,
  remove_all_children,
  fileToDataUrl,
} from "./helpers.js";
import {
  processFeedData,
  fetch_user_details_by_id,
  fetch_user_details_by_username,
  like_post_by_id,
  unlike_post_by_id,
  fetch_feeds,
  fetch_post_by_id,
  getAllPosts,
} from "./feedService.js";
import {
  processUserData,
  follow_user_by_name,
  unfollow_user_by_name,
  update_profile_details,
} from "./profileServices.js";
import {
  add_new_post,
  delete_post_by_id,
  edit_user_post_by_id,
  add_user_comment,
} from "./postServices.js";
import {
  addElement,
  feed_replacer,
  profile_replace,
  remove_feed,
  replaceElement,
} from "./domUpdater.js";

export const loginPage = (data = {}) => {
  let loginPage = document.createDocumentFragment();
  let div = document.createElement("div");
  div.setAttribute("id", "login-page");
  div.setAttribute("class", "login-wrapper");
  loginPage.appendChild(div);
  let p = document.createElement("p");
  p.setAttribute("class", "heading");
  div.appendChild(p);
  p.append("Welcome");
  let usernamebox = document.createElement("div");
  usernamebox.setAttribute("id", "username-box");
  usernamebox.setAttribute("class", "login-item");
  div.appendChild(usernamebox);
  let label = document.createElement("label");
  label.setAttribute("for", "username");
  usernamebox.appendChild(label);
  label.append("Username/ Email");
  let username = document.createElement("input");
  username.setAttribute("type", "text");
  username.setAttribute("name", "username");
  username.setAttribute("id", "username");
  usernamebox.appendChild(username);
  let passwordbox = document.createElement("div");
  passwordbox.setAttribute("id", "password-box");
  passwordbox.setAttribute("class", "login-item");
  div.appendChild(passwordbox);
  let label_0 = document.createElement("label");
  label_0.setAttribute("for", "password");
  passwordbox.appendChild(label_0);
  label_0.append("Password");
  let password = document.createElement("input");
  password.setAttribute("type", "password");
  password.setAttribute("name", "password");
  password.setAttribute("id", "password");
  passwordbox.appendChild(password);
  let passwordconfirmbox = document.createElement("div");
  passwordconfirmbox.setAttribute("id", "password-confirm-box");
  passwordconfirmbox.setAttribute("class", "login-item");
  div.appendChild(passwordconfirmbox);
  let label_1 = document.createElement("label");
  label_1.setAttribute("for", "password-confirm");
  passwordconfirmbox.appendChild(label_1);
  label_1.append("Confirm password");
  let passwordconfirm = document.createElement("input");
  passwordconfirm.setAttribute("type", "password");
  passwordconfirm.setAttribute("name", "password-confirm");
  passwordconfirm.setAttribute("id", "password-confirm");
  passwordconfirmbox.appendChild(passwordconfirm);
  let submitbotton = document.createElement("div");
  submitbotton.setAttribute("id", "action-button");
  submitbotton.setAttribute("class", "login-item");
  div.appendChild(submitbotton);
  let submit = document.createElement("button");
  submit.setAttribute("type", "button");
  submit.setAttribute("id", "login-button");
  submit.append("Login");
  submit.addEventListener("click", function () {
    main.processLogin();
  });
  submitbotton.appendChild(submit);
  let registrationbutton = document.createElement("button");
  registrationbutton.addEventListener("click", function () {
    main.changeScreenTo("registration");
  });
  registrationbutton.setAttribute("id", "registration-button");
  submitbotton.appendChild(registrationbutton);
  registrationbutton.append("Register");
  return loginPage;
};

export const dashboard = (data = {}) => {
  let dashboard = document.createDocumentFragment();
  let div = document.createElement("div");
  dashboard.append(div);
  div.setAttribute("id", "dashboard-wrapper");

  let container = document.createElement("div");
  div.append(container);
  container.setAttribute("id", "dashboard-container");

  let addPostWrapper = document.createElement("div");
  addPostWrapper.setAttribute("class", "addPostWrapper");
  container.appendChild(addPostWrapper);

  let addPostButton = document.createElement("button");
  addPostButton.setAttribute("class", "addPostButton");
  addPostButton.append(`+ Add Post`);
  addPostWrapper.appendChild(addPostButton);

  addPostButton.addEventListener("click", function () {
    main.changeScreenTo("addPostPage");
  });

  // let load_more_wrapper = document.createElement("div");
  // load_more_wrapper.setAttribute("class", "load_more-wrapper");
  // div.appendChild(load_more_wrapper);

  // let load_more = document.createElement("button");
  // load_more.setAttribute("class", "load_more");
  // load_more_wrapper.appendChild(load_more);
  // load_more.append("load more feeds");

  // load_more.addEventListener("click", function () {
  //   main.load_more();
  // });

  return dashboard;
};

export const registration = (data = {}) => {
  var registration = document.createDocumentFragment(); // contains all gathered nodes
  let div = document.createElement("div");
  div.setAttribute("id", "registration-wrapper");
  registration.appendChild(div);
  let p = document.createElement("p");
  p.setAttribute("class", "heading");
  div.appendChild(p);
  p.append("Registration");
  let usernamebox = document.createElement("div");
  usernamebox.setAttribute("id", "username-box");
  usernamebox.setAttribute("class", "login-item");
  div.appendChild(usernamebox);
  let label = document.createElement("label");
  label.setAttribute("for", "username");
  usernamebox.appendChild(label);
  label.append("Username/ Email");
  let username = document.createElement("input");
  username.setAttribute("type", "text");
  username.setAttribute("name", "username");
  username.setAttribute("id", "username");
  usernamebox.appendChild(username);
  let passwordbox = document.createElement("div");
  passwordbox.setAttribute("id", "password-box");
  passwordbox.setAttribute("class", "login-item");
  div.appendChild(passwordbox);
  let label_0 = document.createElement("label");
  label_0.setAttribute("for", "password");
  passwordbox.appendChild(label_0);
  label_0.append("Password");
  let password = document.createElement("input");
  password.setAttribute("type", "password");
  password.setAttribute("name", "password");
  password.setAttribute("id", "password");
  password.setAttribute("value", "");
  passwordbox.appendChild(password);
  let passwordconfirmbox = document.createElement("div");
  passwordconfirmbox.setAttribute("id", "password-confirm-box");
  passwordconfirmbox.setAttribute("class", "login-item");
  div.appendChild(passwordconfirmbox);
  let label_1 = document.createElement("label");
  label_1.setAttribute("for", "password-confirm");
  passwordconfirmbox.appendChild(label_1);
  label_1.append("Confirm password");
  let passwordconfirm = document.createElement("input");
  passwordconfirm.setAttribute("type", "password");
  passwordconfirm.setAttribute("name", "password-confirm");
  passwordconfirm.setAttribute("id", "password-confirm");
  passwordconfirm.setAttribute("value", "");
  passwordconfirmbox.appendChild(passwordconfirm);
  let emailbox = document.createElement("div");
  emailbox.setAttribute("id", "email-box");
  emailbox.setAttribute("class", "login-item");
  div.appendChild(emailbox);
  let label_2 = document.createElement("label");
  label_2.setAttribute("for", "email");
  emailbox.appendChild(label_2);
  label_2.append("email");
  let email = document.createElement("input");
  email.setAttribute("type", "email");
  email.setAttribute("name", "email");
  email.setAttribute("id", "email");
  email.setAttribute("value", "");
  emailbox.appendChild(email);
  let namebox = document.createElement("div");
  namebox.setAttribute("id", "name-box");
  namebox.setAttribute("class", "login-item");
  div.appendChild(namebox);
  let label_3 = document.createElement("label");
  label_3.setAttribute("for", "name");
  namebox.appendChild(label_3);
  label_3.append("name");
  let name = document.createElement("input");
  name.setAttribute("type", "text");
  name.setAttribute("name", "name");
  name.setAttribute("id", "name");
  name.setAttribute("value", "");
  namebox.appendChild(name);
  let submitbotton = document.createElement("div");
  submitbotton.setAttribute("id", "submit-botton");
  submitbotton.setAttribute("class", "login-item");
  div.appendChild(submitbotton);
  let input = document.createElement("button");
  input.setAttribute("type", "button");
  input.append("Submit");
  input.addEventListener("click", function () {
    main.processRegistration();
  });
  submitbotton.appendChild(input);
  return registration;
};

export const feed = (data) => {
  let processed_data = processFeedData(data);
  var feed = document.createDocumentFragment(); // contains all gathered nodes
  let div = document.createElement("div");
  div.setAttribute("class", "feed-wrapper");
  div.setAttribute("id", `feed-${processed_data.id}`);
  feed.appendChild(div);
  let div_0 = document.createElement("div");
  div_0.setAttribute("class", "feed-container");
  div.appendChild(div_0);
  let feedDetails = document.createElement("div");
  feedDetails.setAttribute("class", "feed-details-container");
  div_0.appendChild(feedDetails);
  let thumbnail = document.createElement("img");
  thumbnail.setAttribute("class", "thumbnail");
  thumbnail.setAttribute(
    "src",
    `data:image/png;base64, ${processed_data.thumbnail}`
  );
  thumbnail.setAttribute("alt", "");
  feedDetails.appendChild(thumbnail);

  let user_details_container = document.createElement("div");
  user_details_container.setAttribute("class", "user-deatils-container");
  feedDetails.appendChild(user_details_container);

  let username = document.createElement("p");
  username.setAttribute("class", "author");
  user_details_container.appendChild(username);
  username.append(processed_data.author);
  let p_0 = document.createElement("p");
  p_0.setAttribute("class", "description_text");
  user_details_container.appendChild(p_0);

  let edit_description = document.createElement("input");
  edit_description.setAttribute("type", "text");
  edit_description.setAttribute("name", "edit_description");
  edit_description.setAttribute("class", "edit_description");
  edit_description.setAttribute("placeholder", "Enter new description here");
  edit_description.setAttribute("hidden", "true");
  user_details_container.appendChild(edit_description);

  if (processed_data.author == main.auth.user.getUserName()) {
    let feedOwnerAction = FeedOwnerAction(edit_description, processed_data.id);
    div_0.appendChild(feedOwnerAction);
  }
  p_0.append(processed_data.description_text);
  let p_1 = document.createElement("p");
  p_1.setAttribute("class", "date-box");
  user_details_container.appendChild(p_1);
  p_1.append("published :");
  let span = document.createElement("span");
  span.setAttribute("class", "date");
  p_1.appendChild(span);
  span.append(formatDateToDisplay(processed_data.published));

  let likeCount = document.createElement("span");
  likeCount.setAttribute("class", "like");
  let likeBox = document.createElement("div");
  likeBox.setAttribute("class", "like-box");
  div_0.appendChild(likeBox);
  likeBox.appendChild(likeCount);
  likeCount.append("likes : " + processed_data.likesCount);
  let likers = document.createElement("div");
  likeBox.append(likers);
  likers.setAttribute("class", "likers");
  likers.setAttribute("hidden", "true");
  let commentBox = document.createElement("div");
  commentBox.setAttribute("class", "comment-box");
  div_0.appendChild(commentBox);
  let p_2 = document.createElement("p");
  p_2.setAttribute("class", "comment");
  commentBox.appendChild(p_2);
  p_2.append("comments : " + processed_data.commentsCount || "None");
  let commenters = document.createElement("div");
  commentBox.append(commenters);
  commenters.setAttribute("class", "commenters");
  commenters.setAttribute("hidden", "true");

  //Add Add-comment
  let add_comment = document.createElement("input");
  add_comment.setAttribute("type", "text");
  add_comment.setAttribute("name", "add_comment");
  add_comment.setAttribute("class", "add_comment");
  add_comment.setAttribute("placeholder", "Enter new description here");
  add_comment.setAttribute("hidden", "true");
  commentBox.appendChild(add_comment);
  let actions_container = document.createElement("div");
  actions_container.setAttribute("class", "actions_container");
  div_0.appendChild(actions_container);
  let commentActionbuttons = commentAction(add_comment, processed_data.id);
  actions_container.appendChild(commentActionbuttons);
  let likeButton_wrapper = document.createElement("div");
  likeButton_wrapper.setAttribute("class", "likeButton-wrapper");
  actions_container.appendChild(likeButton_wrapper);

  let likeButton = document.createElement("button");
  likeButton.setAttribute("class", "likeButton");
  likeButton_wrapper.appendChild(likeButton);
  if (!processed_data.likes.includes(main.auth.user.user.id)) {
    likeButton.append("Like");
  } else {
    likeButton.append("Unlike");
  }

  username.addEventListener("click", function () {
    fetch_user_details_by_username(processed_data.author).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          main.changeScreenTo("Profile", data);
        });
      }
    });
  });
  likeBox.addEventListener("click", function () {
    likers.getAttribute("hidden")
      ? likers.removeAttribute("hidden", "true")
      : likers.setAttribute("hidden", "true");

    for (const liker of processed_data.likes) {
      addLiker(likers, liker);
    }
  });
  p_2.addEventListener("click", function () {
    commenters.getAttribute("hidden")
      ? commenters.removeAttribute("hidden")
      : commenters.setAttribute("hidden", "true");
    addcommenters(commenters, processed_data.comments);
  });

  likeButton.addEventListener("click", function () {
    if (!processed_data.likes.includes(main.auth.user.user.id)) {
      like_post_by_id(data.id).then((res) => {
        if (res.status == 200)
          res.json().then((resp) => {
            feed_replacer(data.id);
          });
        else {
          alert("failed to like");
        }
      });
    } else {
      unlike_post_by_id(data.id).then((res) => {
        if (res.status == 200)
          res.json().then((resp) => {
            feed_replacer(data.id);
          });
        else {
          alert("unable to like the post");
        }
      });
    }
  });
  return feed;
};

export const likerElement = (data) => {
  let likerElement = document.createDocumentFragment(); // contains all gathered nodes

  let div = document.createElement("div");
  div.setAttribute("class", "liker");
  likerElement.appendChild(div);
  div.setAttribute("liker-data", data);
  // let div_0 = document.createElement("div");
  // div_0.setAttribute("class", "liker-tbnail");
  // div.appendChild(div_0);

  // let img = document.createElement("img");
  // img.setAttribute("src", "as");
  // img.setAttribute("alt", "");
  // div_0.appendChild(img);
  let liker_name = document.createElement("p");
  liker_name.setAttribute("class", "liker-name");
  div.appendChild(liker_name);
  liker_name.append(data.name);
  liker_name.addEventListener("click", function () {
    fetch_user_details_by_username(data.name).then((res) =>
      res.json().then((data) => {
        main.changeScreenTo("Profile", data);
      })
    );
  });
  return likerElement;
};

export const followerElement = (data) => {
  let followerElement = document.createDocumentFragment(); // contains all gathered nodes

  let div = document.createElement("div");
  div.setAttribute("class", "follower-name");
  followerElement.appendChild(div);
  div.setAttribute("follower-name-data", data);
  let div_0 = document.createElement("div");
  div_0.setAttribute("class", "follower-name-tbnail");
  div.appendChild(div_0);

  let follower_name = document.createElement("p");
  follower_name.setAttribute("class", "follower-name-name");
  div.appendChild(follower_name);
  follower_name.append(data.name);
  follower_name.addEventListener("click", function () {
    fetch_user_details_by_username(data.name).then((res) =>
      res.json().then((data) => {
        main.changeScreenTo("Profile", data);
      })
    );
  });
  return followerElement;
};

export const commenterElement = (data) => {
  let commenterElement = document.createDocumentFragment(); // contains all gathered nodes

  let div = document.createElement("div");
  div.setAttribute("class", "commenter");
  commenterElement.appendChild(div);

  // let div_0 = document.createElement("div");
  // div_0.setAttribute("class", "commenter-tbnail");
  // div.appendChild(div_0);

  // let img = document.createElement("img");
  // img.setAttribute("src", "as");
  // img.setAttribute("alt", "");
  // div_0.appendChild(img);

  let div_1 = document.createElement("div");
  div_1.setAttribute("class", "comment-details");
  div.appendChild(div_1);

  let p = document.createElement("p");
  p.setAttribute("class", "commenter-name");
  div_1.appendChild(p);
  p.append(data.author);

  let p_0 = document.createElement("p");
  p_0.setAttribute("class", "comment-made");
  div_1.appendChild(p_0);
  p_0.append(data.comment);

  let p_1 = document.createElement("p");
  p_1.setAttribute("class", "comment-date");
  div_1.appendChild(p_1);
  p_1.append(formatDateToDisplay(data.published));

  p.addEventListener("click", function () {
    main.changeScreenTo(`Profile=${data.author}`);
  });
  return commenterElement;
};

export const Profile = (data) => {
  // Data format
  //   {
  //     "id" = Number;
  //     "username" = String;
  //     "email" = String;
  //     "name" = String;
  //     "posts" = Array;
  //     "following" = Array;
  //     "followed_num" = Number;
  //   }
  let user_data = processUserData(data);

  var Profile = document.createDocumentFragment(); // contains all gathered nodes

  let div = document.createElement("div");
  div.setAttribute("class", "profile-wrapper");
  div.setAttribute("data-id", `profile-${user_data.id}`);
  Profile.appendChild(div);

  let div_0 = document.createElement("div");
  div_0.setAttribute("class", "profile-container");
  div.appendChild(div_0);

  let user_details_wrapper = document.createElement("div");
  user_details_wrapper.setAttribute("class", "user-details-wrapper");
  div_0.appendChild(user_details_wrapper);

  let div_1 = document.createElement("div");
  div_1.setAttribute("class", "user-details");
  user_details_wrapper.appendChild(div_1);

  let p_1 = document.createElement("p");
  p_1.setAttribute("class", "profile-name");
  div_1.appendChild(p_1);
  p_1.append(`Name:`);
  p_1.append(getSpan("profile-deatils profile-deatils-name", user_data.name));

  let p = document.createElement("p");
  p.setAttribute("class", "profile-username");
  div_1.appendChild(p);
  p.append(`Username: `);
  p.append(
    getSpan("profile-deatils profile-deatils-username", user_data.username)
  );
  let p_0 = document.createElement("p");
  p_0.setAttribute("class", "profile-email");
  div_1.appendChild(p_0);
  p_0.append(`Email: `);
  p_0.append(getSpan("profile-deatils profile-deatils-email", user_data.email));
  if (user_data.username == main.auth.user.getUserName()) {
    let editProfileFeilds = document.createElement("div");
    editProfileFeilds.setAttribute("class", "edit-profile-wrapper");
    editProfileFeilds.setAttribute("hidden", "true");
    div_1.appendChild(editProfileFeilds);

    let editProfileFeilds_0 = document.createElement("div");
    editProfileFeilds_0.setAttribute("class", "edit-profile-container");
    editProfileFeilds.appendChild(editProfileFeilds_0);

    let label = document.createElement("label");
    label.setAttribute("for", "edit_username");
    editProfileFeilds_0.appendChild(label);
    label.append("new Username");

    let input = document.createElement("input");
    input.setAttribute("placeholder", `${user_data.name}`);
    input.setAttribute("type", "text");
    input.setAttribute("name", "edit_username");
    input.setAttribute("class", "edit-username");
    editProfileFeilds_0.appendChild(input);

    let label_0 = document.createElement("label");
    label_0.setAttribute("for", "edit_name");
    editProfileFeilds_0.appendChild(label_0);
    label_0.append("new Name");

    let input_0 = document.createElement("input");
    input_0.setAttribute("name", "edit_email");
    input_0.setAttribute("placeholder", `${user_data.email}`);
    input_0.setAttribute("type", "text");
    input_0.setAttribute("class", "edit-email");
    editProfileFeilds_0.appendChild(input_0);

    let label_1 = document.createElement("label");
    label_1.setAttribute("for", "edit_password");
    editProfileFeilds_0.appendChild(label_1);
    label_1.append("new Password");

    let input_1 = document.createElement("input");
    input_1.setAttribute("placeholder", `${main.auth.user.getPassword()}`);
    input_1.setAttribute("name", "edit_password");
    input_1.setAttribute("type", "text");
    input_1.setAttribute("class", "edit-password");
    editProfileFeilds_0.appendChild(input_1);
    div_1.append(editProfileFeilds);

    let edit_profile_button_wrapper = document.createElement("div");
    edit_profile_button_wrapper.setAttribute(
      "class",
      "editprofile-button-wrapper"
    );
    div_1.appendChild(edit_profile_button_wrapper);

    let edit_profile_button = document.createElement("button");
    edit_profile_button.setAttribute("class", "editprofile-button");
    edit_profile_button_wrapper.appendChild(edit_profile_button);

    let edit_button_text = document.createElement("span");
    edit_profile_button.append(edit_button_text);
    edit_button_text.append("Edit profile Details");

    edit_profile_button.addEventListener("click", function () {
      if (editProfileFeilds.getAttribute("hidden")) {
        editProfileFeilds.removeAttribute("hidden");
        edit_button_text.remove();
        edit_button_text = document.createElement("span");
        edit_profile_button.append(edit_button_text);
        edit_button_text.append("Save new Details");
      } else {
        let newUsername = input.value || user_data.name;
        let newEmail = input_0.value || user_data.email;
        let newPassword = input_1.value || main.auth.user.getPassword();
        console.log(newUsername, newEmail, newPassword);
        update_profile_details(newUsername, newEmail, newPassword).then(
          (res) => {
            if (res.status == 200) {
              main.auth.user.updateUserDetails();
              profile_replace(user_data.username);
              alert("Updated profile details");
            }
          }
        );

        editProfileFeilds.setAttribute("hidden", "true");
        edit_button_text.remove();
        edit_button_text = document.createElement("span");
        edit_profile_button.append(edit_button_text);
        edit_button_text.append("Edit profile Details");
      }
    });
  }
  if (main?.auth?.user?.user?.following.includes(user_data.id)) {
    let unfollow_wrapper = document.createElement("div");
    unfollow_wrapper.setAttribute("class", "unfollow-wrapper");
    div_0.appendChild(unfollow_wrapper);

    let unfollowButton = document.createElement("button");
    unfollowButton.setAttribute("class", "unfollowButton");
    unfollow_wrapper.appendChild(unfollowButton);
    unfollowButton.append(`Unfollow ${user_data.username}`);

    unfollowButton.addEventListener("click", function () {
      unfollow_user_by_name(user_data.username).then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            main.auth.user.updateUserDetails();
            profile_replace(user_data.username);
          });
        }
      });
    });
  } else if (user_data.username != main.auth.user.getUserName()) {
    let follow_wrapper = document.createElement("div");
    follow_wrapper.setAttribute("class", "follow-wrapper");
    div_0.appendChild(follow_wrapper);

    let followButton = document.createElement("button");
    followButton.setAttribute("class", "followButton");
    follow_wrapper.appendChild(followButton);
    followButton.append(`Follow ${user_data.username}`);

    followButton.addEventListener("click", function () {
      follow_user_by_name(user_data.username).then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            main.auth.user.updateUserDetails().then(() => {
              profile_replace(user_data.username);
            });
          });
        }
      });
    });
  }

  let div_2 = document.createElement("div");
  div_2.setAttribute("class", "user-following");
  user_details_wrapper.appendChild(div_2);

  let p_2 = document.createElement("p");
  p_2.setAttribute("class", "profile-followed");
  div_2.appendChild(p_2);
  p_2.append(`Followed by: ${user_data.followed_num}`);

  let followers_box = document.createElement("div");
  followers_box.setAttribute("class", "profile-following");
  div_2.append(followers_box);
  let p_3 = document.createElement("p");
  p_3.setAttribute("class", "profile-following_number");
  followers_box.appendChild(p_3);
  let followers_names = document.createElement("div");
  followers_names.setAttribute("class", "profile-following_names");
  followers_names.setAttribute("hidden", "true");
  followers_box.appendChild(followers_names);
  for (const follower of user_data.following) {
    fetch_user_details_by_id(follower).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          addElement(followers_names, "followerElement", data);
        });
      }
    });
  }
  p_3.append(`Following: ${user_data.following.length}`);
  p_3.addEventListener("click", function () {
    console.log("evenet");
    if (!followers_names.getAttribute("hidden")) {
      followers_names.setAttribute("hidden", "true");
    } else {
      console.log("unhhiding");
      followers_names.removeAttribute("hidden");
    }
  });
  let post_heading = document.createElement("p");
  post_heading.setAttribute("class", "post-heading");
  post_heading.innerText = "Your posts";
  div_0.appendChild(post_heading);
  let div_3 = document.createElement("div");
  div_3.setAttribute("class", "user-posts-wrapper");
  div_0.appendChild(div_3);
  let div_4 = document.createElement("div");
  div_4.setAttribute("class", "user-post-container");
  div_3.appendChild(div_4);
  let user_posts = [];
  user_posts = getAllPosts(user_data.posts).then((data) => {
    console.log(data);
    data.sort((a, b) => (b.meta.published = a.meta.published));
    for (const post of data) {
      addElement(div_4, "feed", post);
    }
  });

  return Profile;
};

export const addPostPage = () => {
  var addPostPage = document.createDocumentFragment(); // contains all gathered nodes

  let div = document.createElement("div");
  div.setAttribute("class", "addPostPage-wrapper");
  addPostPage.appendChild(div);

  let div_0 = document.createElement("div");
  div_0.setAttribute("class", "addPostPage-constainer");
  div.appendChild(div_0);

  let div_1 = document.createElement("div");
  div_1.setAttribute("class", "description-wrapper");
  div_0.appendChild(div_1);

  let description = document.createElement("input");
  description.setAttribute("type", "text");
  description.setAttribute("name", "description");
  description.setAttribute("placeholder", "Enter the post description");
  description.setAttribute("id", "add-post-description");
  div_1.appendChild(description);

  let div_2 = document.createElement("div");
  div_2.setAttribute("class", "image");
  div_0.appendChild(div_2);

  let image = document.createElement("input");
  image.setAttribute("type", "file");
  image.setAttribute("id", "add-post-image");
  image.setAttribute("name", "image");
  image.setAttribute("accept", "image/png");
  image.setAttribute("alt", "");
  div_2.appendChild(image);

  let submit_post = document.createElement("div");
  submit_post.setAttribute("class", "submit_post");
  submit_post.setAttribute("name", "submit_post");
  div_2.appendChild(submit_post);

  let submit_post_button = document.createElement("button");
  submit_post_button.setAttribute("class", "submit_post_button");
  submit_post_button.setAttribute("name", "submit_post_button");
  submit_post_button.append("Submit post");
  submit_post.appendChild(submit_post_button);

  submit_post_button.addEventListener("click", function () {
    let post_description = document.getElementById("add-post-description")
      .value;
    add_new_post(post_description, imageValue).then((res) => {
      if (res.status != 200) {
        alert("invalid inputs");
      } else {
        res.json().then((data) => {
          main.auth.user.updateUserDetails();
          main.changeScreenTo("dashboard");
        });
        alert("Post created");
      }
    });
  });
  let imageValue = "";
  image.addEventListener("change", function (event) {
    fileToDataUrl(event.target.files[0]).then((data) => {
      let reg = /,.*/;
      imageValue = data.match(reg)[0].slice(1);
    });
  });

  return addPostPage;
};

export function FeedOwnerAction(edit_description, post_id) {
  var FeedOwnerAction = document.createDocumentFragment(); // contains all gathered nodes

  let div = document.createElement("div");
  div.setAttribute("class", "feed-owner-actions");
  FeedOwnerAction.appendChild(div);

  let div_0 = document.createElement("div");
  div_0.setAttribute("class", "action-delete-feed");
  div.appendChild(div_0);

  let button = document.createElement("button");
  button.setAttribute("name", "feed-delete-button");
  button.setAttribute("class", "feed-delete-button");
  div_0.appendChild(button);
  button.append("Delete");
  button.addEventListener("click", function () {
    delete_post_by_id(post_id).then((res) => {
      console.log(post_id);
      if (res.status != 200) {
        alert("Failed to delete post");
      } else {
        res.json().then((data) => {
          remove_feed(post_id);
          alert("sucessfully deleted the post");
        });
      }
    });
  });
  let div_1 = document.createElement("div");
  div_1.setAttribute("class", "action-edit-feed");
  div.appendChild(div_1);

  let button_0 = document.createElement("button");
  button_0.setAttribute("name", "feed-edit-button");
  button_0.setAttribute("class", "feed-edit-button");
  div_1.appendChild(button_0);
  let button_text = document.createElement("span");
  button_0.append(button_text);
  button_text.append("Edit");
  button_0.addEventListener("click", function () {
    if (edit_description.getAttribute("hidden")) {
      edit_description.removeAttribute("hidden");
      button_text.remove();
      button_text = document.createElement("span");
      button_0.append(button_text);
      button_text.append("Save edit");
    } else {
      let description_text = String(edit_description.value);
      edit_user_post_by_id(description_text, post_id).then((res) => {
        if (res.status != 200) {
          alert("Failed to edit post");
        } else {
          res.json().then((data) => {
            console.log(data);
            alert("sucessfully edited the post");
          });
        }
      });
      edit_description.setAttribute("hidden", true);
      button_text.remove();
      button_text = document.createElement("span");
      button_0.append(button_text);
      button_text.append("Edit");
    }
  });

  return FeedOwnerAction;
}

export function commentAction(add_comment, post_id) {
  let commentActionButton = document.createDocumentFragment(); // contains all gathered nodes

  let div = document.createElement("div");
  div.setAttribute("class", "comment-button-wrapper");
  commentActionButton.appendChild(div);

  let button = document.createElement("button");
  button.setAttribute("name", "add-comment-button");
  button.setAttribute("class", "add-comment-button");
  div.appendChild(button);

  let span = document.createElement("span");
  span.setAttribute("class", "add-comment-btn-txt");
  button.appendChild(span);
  span.append("Add Comment");

  button.addEventListener("click", function () {
    if (add_comment.getAttribute("hidden")) {
      add_comment.removeAttribute("hidden");
      span.remove();
      span = document.createElement("span");
      button.append(span);
      span.append("Post Comment");
    } else {
      let comment_text = String(add_comment.value);
      add_user_comment(comment_text, post_id).then((res) => {
        if (res.status != 200) {
          alert("Failed to add comment");
        } else {
          res.json().then((data) => {
            console.log(data);
            feed_replacer(post_id);
            alert("sucessfully added the comment");
          });
        }
      });
      add_comment.setAttribute("hidden", true);
      span.remove();
      span = document.createElement("span");
      button.append(span);
      span.append("Add Comment");
    }
  });
  return commentActionButton;
}

function addLiker(parent, liker) {
  remove_all_children(parent);
  fetch_user_details_by_id(liker).then((res) => {
    res.json().then((data) => {
      addElement(parent, "likerElement", data);
    });
  });
}
function addcommenters(parent, comments) {
  remove_all_children(parent);
  for (const comment of comments) {
    addElement(parent, "commenterElement", comment);
  }
}
export const getSpan = (className, text) => {
  let span = document.createElement("span");
  span.setAttribute("class", className);
  span.innerText = text;
  return span;
};

export const alert_box = (message) => {
  var alertFragment = document.createDocumentFragment(); // contains all gathered nodes

  let alertbox = document.createElement("div");
  alertbox.setAttribute("class", "alert-box");
  alertbox.setAttribute("id", "alert-box");
  if (message) {
    alertbox.style.display = "none";
  } else {
    alertbox.style.display = "block";
  }
  alertFragment.appendChild(alertbox);

  let div = document.createElement("div");
  div.setAttribute("class", "alert-content-wrapper");
  alertbox.appendChild(div);

  let p = document.createElement("p");
  div.appendChild(p);
  p.append(message);

  let div_0 = document.createElement("div");
  div_0.setAttribute("class", "alert-actions");
  div.appendChild(div_0);

  let alertclose = document.createElement("button");
  alertclose.setAttribute("id", "alert-close");
  div_0.appendChild(alertclose);
  alertclose.append("Close");

  alertclose.addEventListener("click", function () {
    alertbox.style.display = "none";
    p.innerText = "";
  });
  return alertFragment;
};

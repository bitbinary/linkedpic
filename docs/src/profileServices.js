import API from "./api.js";

const api = new API("http://localhost:5000");

export const processUserData = (data) => {
  let userData = {
    id: data.id,
    username: data.username,
    email: data.email,
    name: data.name,
    posts: data.posts || [],
    following: data.following || [],
    followed_num: data.followed_num,
  };
  return userData;
};

export const follow_user_by_name = (username) => {
  return api.makeAPIRequest("user/follow", "PUT", { username: username }, true);
};
export const unfollow_user_by_name = (username) => {
  return api.makeAPIRequest(
    "user/unfollow",
    "PUT",
    { username: username },
    true
  );
};

export const update_profile_details = (newUsername, newEmail, newPassword) => {
  return api.makeAPIRequest(
    "user/",
    "PUT-WITHBODY",
    {
      paramsData: {},
      bodyData: { email: newEmail, name: newUsername, password: newPassword },
    },
    true
  );
};

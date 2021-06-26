import API from "./api.js";
import { formatDateToDisplay } from "./helpers.js";

const api = new API("http://localhost:5000");

export const fetch_feeds = () => {
  let p = main.auth.user.getFeedLength();
  let n = main.auth.user.numberOfFeeds;
  return api.makeAPIRequest("user/feed", "  ", { p: p, n: n }, true);
};

export const processFeedData = (data = {}) => {
  let id = data.id || "no id data";
  let author = data?.meta?.author || "no author data";
  let description_text =
    data?.meta?.description_text || "no description available";
  let published = data?.meta?.published || "no date found";
  let date = formatDateToDisplay(published);
  let likes = data?.meta?.likes || [];
  let likesCount = likes.length ? likes.length : "None";
  let thumbnail = data.thumbnail;
  let src = data.src;
  let comments = data.comments || [];
  let commentsCount = comments.length;

  return {
    id,
    author,
    description_text,
    published,
    date,
    likes,
    likesCount,
    thumbnail,
    src,
    comments,
    commentsCount,
  };
};

export function fetch_user_details_by_id(id) {
  return api.makeAPIRequest("user/", "GET", { id: id }, true);
}

export function fetch_user_details_by_username(username) {
  return api.makeAPIRequest("user/", "GET", { username: username }, true);
}
export function like_post_by_id(id) {
  return api.makeAPIRequest("post/like", "PUT", { id: id }, true);
}
export function unlike_post_by_id(id) {
  return api.makeAPIRequest("post/unlike", "PUT", { id: id }, true);
}
export function fetch_post_by_id(id) {
  return api.makeAPIRequest("post/", "GET", { id: id }, true);
}

export const getAllPosts = (ids) => {
  return new Promise((resolve, reject) => {
    let user_posts = [];
    for (const post of ids) {
      fetch_post_by_id(post)
        .then((res) => {
          if (res.status == 200) {
            res.json().then((data) => {
              user_posts = [...user_posts, data];
              if (user_posts.length == ids.length) {
                resolve(user_posts);
              }
            });
          }
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
};

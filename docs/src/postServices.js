import API from "./api.js";

const api = new API("http://localhost:5000");

export function add_new_post(post_description, imageValue) {
  return api.makeAPIRequest(
    "post/",
    "POST",
    {
      description_text: post_description,
      src: imageValue,
    },
    true
  );
}

export function delete_post_by_id(id) {
  return api.makeAPIRequest(
    "post/",
    "DELETE",
    {
      id: id,
    },
    true
  );
}

export function edit_user_post_by_id(description_text, post_id) {
  return api.makeAPIRequest(
    "post/",
    "PUT-WITHBODY",
    {
      paramsData: { id: post_id },
      bodyData: { description_text: description_text },
    },
    true
  );
}

export function add_user_comment(comment_text, post_id) {
  return api.makeAPIRequest(
    "post/comment",
    "PUT-WITHBODY",
    {
      paramsData: { id: post_id },
      bodyData: { comment: comment_text },
    },
    true
  );
}

import * as fragments from "./domFragments.js";
import {
  fetch_post_by_id,
  fetch_user_details_by_username,
} from "./feedService.js";

export const addElement = (screen, element, data = {}) => {
  if (screen == null) {
    screen = document.getElementById("root-contianer");
  }
  screen.append(fragments[element](data));
  console.log(element);
};

export const replaceElement = (screen, element, data = {}) => {
  if (screen == null) {
    screen = document.getElementById("root-contianer");
  }
  screen.children[0].remove();
  screen.append(fragments[element](data));
};

export const removeElement = (elementID) => {
  document.getElementById(elementID).remove();
};

// export const addElement = (screen, element) => {
//   screen.append(fragments[element]());
// };

export const feed_replacer = (feed_id) => {
  let feeds_container = document.getElementById(`feed-${feed_id}`)
    .parentElement;
  let oldFeed = document.getElementById(`feed-${feed_id}`);
  fetch_post_by_id(feed_id).then((res) => {
    res.json().then((data) => {
      let newFeed = fragments.feed(data);
      feeds_container.replaceChild(newFeed, oldFeed);
    });
  });
};

export const remove_feed = (feed_id) => {
  let oldFeed = document.getElementById(`feed-${feed_id}`);
  oldFeed.remove();
};

export const profile_replace = (username) => {
  console.log(main.auth.user.user);
  let profile_container = document.getElementById("root-contianer");
  let oldProfile = document.getElementsByClassName("profile-wrapper")[0];
  fetch_user_details_by_username(username).then((res) => {
    res.json().then((data) => {
      let newProfile = fragments.Profile(data);
      profile_container.replaceChild(newProfile, oldProfile);
    });
  });
};

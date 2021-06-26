let OPTIONS = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
const setOptions = (type = "GET", data = null, token = false) => {
  let options = { ...OPTIONS };
  switch (type) {
    case "POST":
      options = { ...options, method: "POST", body: JSON.stringify(data) };
      if (!token) return options;
      options.headers["Authorization"] = `Token ${main.auth.getToken()}`;
      return options;
    case "GET":
      if (token)
        options.headers["Authorization"] = `Token ${main.auth.getToken()}`;
      return options;
    case "PUT":
      options.method = "PUT";
      if (token)
        options.headers["Authorization"] = `Token ${main.auth.getToken()}`;
      return options;
    case "PUT-WITHBODY":
      options = { ...options, method: "PUT", body: JSON.stringify(data) };
      if (token)
        options.headers["Authorization"] = `Token ${main.auth.getToken()}`;
      return options;
    case "DELETE":
      options.method = "DELETE";
      if (token)
        options.headers["Authorization"] = `Token ${main.auth.getToken()}`;
      return options;
    default:
      if (token)
        options.headers["Authorization"] = `Token ${main.auth.getToken()}`;
      return options;
  }
};
/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */
const getJSON = (path, options) => {
  return fetch(path, options);
};
const postJSON = (path, options) => {
  return fetch(path, options);
};

const putJSON = (path, options) => {
  return fetch(path, options);
};

const deleteJSON = (path, options) => {
  return fetch(path, options);
};

/**
 * This is a sample class API which you may base your code on.
 * You may use this as a launch pad but do not have to.
 */
export default class API {
  /** @param {String} url */
  constructor(url) {
    this.url = url;
  }

  /** @param {String} path */
  makeAPIRequest(path, type = "GET", data = {}, token = false) {
    let options = {};
    switch (type) {
      case "POST":
        options = setOptions(type, data, token);
        return postJSON(`${this.url}/${path}`, options);
      case "PUT":
        options = setOptions(type, data, token);
        path = new URL(`${this.url}/${path}`);
        if (data) {
          Object.keys(data).forEach((key) => {
            console.log(data[key]);
            path.searchParams.append(key, data[key]);
          });
        }
        return putJSON(path, options);

      case "PUT-WITHBODY":
        let d = data.bodyData;
        options = setOptions("PUT-WITHBODY", d, token);

        path = new URL(`${this.url}/${path}`);
        if (data) {
          Object.keys(data.paramsData).forEach((key) => {
            console.log(data.paramsData[key]);
            path.searchParams.append(key, data.paramsData[key]);
          });
        }
        return postJSON(path, options);
      case "DELETE":
        options = setOptions(type, data, token);
        path = new URL(`${this.url}/${path}`);
        if (data) {
          Object.keys(data).forEach((key) =>
            path.searchParams.append(key, data[key])
          );
        }
        return deleteJSON(path, options);

      default:
        options = setOptions(type, data, token);
        path = new URL(`${this.url}/${path}`);
        if (data) {
          Object.keys(data).forEach((key) =>
            path.searchParams.append(key, data[key])
          );
        }
        return getJSON(path, options);
    }
  }
}

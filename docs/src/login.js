import API from "./api.js";
import User from "./user.js";
import { replaceElement } from "./domUpdater.js";
import { fetch_user_details_by_username } from "./feedService.js";
export default class Login {
  api = new API("http://localhost:5000");
  user = new User();
  signinWithUsernameAndPassword(credentials) {
    this.api
      .makeAPIRequest("auth/login", "POST", credentials, false)
      .then((res) => {
        if (res.status == 403) {
          alert("invalid username/password");
        } else if (res.status == 400) {
          alert("Missing login credentials");
        } else if (res.status == 200) {
          res.json().then((data) => {
            this.user.setUsername(credentials.username);
            this.user.setPassword(credentials.password);
            this.user.setUserToken(data.token).then((res) => {
              fetch_user_details_by_username(credentials.username).then(
                (res) => {
                  res.json().then((data) => {
                    this.user.setUserDetails(data);
                    this.getToken()
                      ? main.changeScreenTo("dashboard")
                      : alert("failet to get token");
                  });
                }
              );
            });

            return data;
          });
        } else {
          alert("Failed to login user");
        }
      })
      .catch((err) => console.warn(`API_ERROR: ${err.message}`));
  }
  signupWithUsernameAndPassword = (details) => {
    this.api
      .makeAPIRequest("auth/signup", "POST", details, false)
      .then((res) => {
        if (res.status == 409) {
          alert("Username Taken, plesae try again with another username");
        } else if (res.status == 400) {
          alert("Missing login credentials");
        } else if (res.status == 200) {
          res.json().then((data) => {
            this.user.setUsername(details.username);
            this.user.setPassword(details.password);
            this.user.setUserToken(data.token).then((res) => {
              fetch_user_details_by_username(details.username).then((res) => {
                res.json().then((data) => {
                  this.user.setUserDetails(data);

                  this.getToken()
                    ? main.changeScreenTo("dashboard")
                    : alert("failet to get token");
                });
              });
            });

            return data;
          });
        } else {
          alert("Failed to register user");
        }
      })
      .catch((err) => console.warn(`API_ERROR: ${err.message}`));
  };
  getToken() {
    return this.user.getUserToken();
  }
}

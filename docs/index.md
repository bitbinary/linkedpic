import App from "./src/main.js";

let _this = window;
window.onpopstate = function (event) {
  let routes = main.routes;
  // console.log(location.hash.split("#"));
  let hashValue = location.hash.split("#");
  if (hashValue.length >= 2) {
    hashValue = hashValue[1];
  } else {
    hashValue = "loginPage";
  }
  // console.log(hashValue);
  // if (!window.history.state.name) {
  //   window = event.currentTarget;
  // }
  main.changeScreenTo(hashValue);
};
let main = new App();
window.locationchange = (event) => {
  console.log(event);
};
window.onscroll = function (event) {
  if (
    window.innerHeight + window.pageYOffset >=
    document.body.offsetHeight - 2
  ) {
    main.load_more();
  }
};
main.initialiseApp(_this);

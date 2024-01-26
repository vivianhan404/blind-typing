/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Page = require("./models/page");
const Text = require("./models/text");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// TODO: check if users have access to a page
const TEST_PROMPT = "~~ How was your day ~~";
const TEST_TOC = [
  // TODO make these valid idx objects
  { prompt: "1/18 halp" },
  { prompt: "1/20 MVP" },
  { prompt: "~~ test thumbnails ~~" },
  { prompt: "this looks pretty jank" },
  { prompt: "this doesn't format correctly sadge" },
];
const LONG_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget lectus eu lacus pretium varius convallis sit amet dolor. Suspendisse id mollis lectus. Mauris vehicula ut nibh quis efficitur. Vestibulum quis ex eget augue feugiat placerat quis vel lectus. Nunc congue, mi congue fermentum eleifend, risus enim pulvinar ipsum, ut fermentum purus tellus id nisl. Maecenas condimentum purus ac varius aliquet. Cras accumsan velit odio, id tristique mauris consectetur sit amet. Sed euismod metus erat, vitae ultrices tellus interdum a. Phasellus ultrices, nulla ac mattis auctor, eros ligula aliquet mi, vitae scelerisque nisi erat a enim. Duis ac semper risus. Vestibulum elementum ornare lectus a tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris purus ex, ullamcorper non turpis eget, pulvinar cursus eros. Suspendisse pulvinar, sapien sed porta volutpat, lacus erat posuere ante, sit amet vulputate tortor massa quis arcu. Mauris rutrum odio vel purus vulputate congue a non ipsum. Praesent posuere, risus in lacinia bibendum, lectus dolor fermentum velit, a faucibus eros arcu vulputate mauris. Nam vitae ligula elementum, tempus ante sed, congue purus. Suspendisse sed eleifend magna. Cras egestas convallis felis ut condimentum. Cras libero massa, accumsan vel nibh in, pharetra sagittis urna. Donec feugiat quam rutrum, mattis ante nec, mollis velit. Vestibulum eros enim, euismod at mauris id, placerat malesuada orci. In hac habitasse platea dictumst. Phasellus vel cursus nisi, at imperdiet est. Cras mi sem, ornare nec turpis non, ornare venenatis nisi. Nullam mollis tortor sodales, iaculis ante vel, efficitur leo. Aenean vulputate tincidunt ligula, non porttitor magna varius eget. Praesent lobortis tincidunt elementum. Sed semper enim mauris, accumsan mollis quam aliquam et. Suspendisse quis lorem eget leo efficitur eleifend eget eget lorem.";
const TEST_PAGE = {
  _id: "deadbeef",
  prompt: TEST_PROMPT,
  content: LONG_TEXT,
};
const TEST_IDX = {
  _id: "deadbeef",
  prompt: TEST_PROMPT,
};

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/page", (req, res) => {
  Page.findById(req.query._id).then((pageObj) => res.send(pageObj));
});

router.post("/page", auth.ensureLoggedIn, (req, res) => {
  const newPage = new Page({
    creator_id: req.user._id,
    prompt: TEST_PROMPT, // TODO: make prompt responsive
    content: "",
  });
  newPage.save().then((page) => res.send(page));
});

router.post("/page-content", auth.ensureLoggedIn, (req, res) => {
  Page.findById(req.body._id).then((page) => {
    page.content = req.body.content;
    page.save().then((page) => res.send(page));
  });
});

// table of contents = list of page index objects
router.get("/toc", (req, res) => {
  Page.find({ creator_id: req.user._id }).then((pages) => res.send(pages));
});

router.get("/test", (req, res) => {
  console.log(req.user);
  res.send({ _id: req.user._id });
});

// router.get("/idx", (req, res) => {
//
// });

// router.post("/idx", (req, res) => {
//   console.log(req.body);
//   res.send({});
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;

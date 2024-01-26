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

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/page", (req, res) => {
  Page.findById(req.query.pageID).then((pageObj) => res.send(pageObj));
});

router.post("/page", auth.ensureLoggedIn, (req, res) => {
  const newPage = new Page({
    creator_id: req.user._id,
    prompt: req.body.prompt,
  });
  newPage.save().then((page) => res.send(page));
});

router.get("/text", (req, res) => {
  Text.findOne({ pageID: req.query.pageID }).then((text) => {
    res.send(text);
  });
});

router.post("/new-text", (req, res) => {
  const newText = new Text({
    pageID: req.body.pageID,
    content: "",
  });
  newText.save().then((text) => res.send(text.toObject()));
});

router.post("/text", (req, res) => {
  Text.updateOne({ pageID: req.body.pageID }, { content: req.body.content }).then((idk) =>
    res.send(idk)
  );
});

// table of contents = list of page objects
router.get("/toc", (req, res) => {
  Page.find({ creator_id: req.user._id }).then((pages) => res.send(pages));
});

router.get("/test", (req, res) => {
  console.log(req.user);
  res.send({ _id: req.user._id });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;

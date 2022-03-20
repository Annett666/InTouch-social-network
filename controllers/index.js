const Router = require("koa-router");

const auth = require("./auth");
const posts = require("./posts");
const postsLikes = require("./posts-likes");
const postsComments = require("./posts-comments");
const subscriptions = require("./subscriptions");
const users = require("./users");

const router = new Router().prefix("/api");

router.use(auth, posts, postsLikes, postsComments, subscriptions, users);

module.exports = router;

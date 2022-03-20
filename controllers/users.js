const Router = require("koa-router");

const User = require("../models/User");

const router = new Router().prefix("/users");

router.get("/:_id", async (ctx) => {
  const user = await User.findById(ctx.params._id);
  if (user) {
    ctx.body = user;
  } else {
    ctx.throw(404);
  }
});

router.post("/:_id/name", async (ctx) => {
  const user = await User.findById(ctx.params._id);
  if (!user) {
    ctx.throw(404, "User has not been found");
  }
  // const { body } = ctx.request.body;
  console.log(ctx.request, user.name);
  // post.comments.unshift({ body, user: ctx.state.user._id });
  // ctx.body = await post.save();
});

module.exports = router.routes();

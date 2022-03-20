const Router = require("koa-router");
const passport = require("koa-passport");

const Message = require("../models/Message");

const router = new Router().prefix("/messages");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const { body } = ctx.request.body;
    const user = ctx.state.user._id;
    ctx.body = await new Message({ body, user }).save();
    ctx.status = 201;
  }
);

router.get("/", async (ctx) => {
  ctx.body = await Message.find(ctx.query);
});

// router.get("/:id", async (ctx) => {
//   const post = await Message.findById(ctx.params.id);
//   if (post) {
//     ctx.body = post;
//   } else {
//     ctx.throw(404, "Post has not been found");
//   }
// });

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    const { _id, body } = ctx.request.body;
    const user = ctx.state.user._id;
    ctx.body = await Message.findOneAndUpdate(
      { _id, user },
      { $set: { body } },
      { new: true }
    );
  }
);

router.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    await Message.findOneAndRemove({
      _id: ctx.params._id,
      user: ctx.state.user._id,
    });
    ctx.body = { message: "Message has been deleted" };
  }
);

module.exports = router.routes();

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true },
);

messageSchema.virtual("when").get(function () {
  const whenStamp = moment(this.updatedAt || this.createdAt);
  return whenStamp.fromNow();
});

const blog = mongoose.model("blog", blogSchema);

export default blog;

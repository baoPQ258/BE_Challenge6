import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  name: { type: String, required: false },
  text: { type: String, required: false },
});
const groupSchema = mongoose.Schema(
  {
    name: { type: String, required: false },
    title: { type: String, required: false },
    members: [{ type: String, required: false }],
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);
const Group = mongoose.model("group", groupSchema);

export default Group;

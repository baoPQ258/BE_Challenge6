import mongoose from "mongoose";
const messageSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    messages: [
      { type: mongoose.Types.ObjectId, required: true, ref: "Message" },
    ],
    image: { type: String, required: true },
    text: { type: String, required: true },
    group: { type: mongoose.Types.ObjectId, required: true, ref: "Group" },
    date: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const message = mongoose.model("Message", messageSchema);

export default message;

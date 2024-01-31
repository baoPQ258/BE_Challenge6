import Group from "../models/groupModel.js";

const createGroup = async (req, res, next) => {
  const { name, title, userName } = req.body;
  // Create Group
  const titleExists = await Group.findOne({ name });

  if (titleExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  await Group.create({
    name,
    title,
    members: [userName],
    messages: [],
  });
  res.json({ message: "Group Created!" });
};
const getGroup = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
const updateGroup = async (req, res, next) => {
  const { groupId, name, message } = req.body;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      throw new Error("Group not found");
    }

    // Kiểm tra xem người dùng đã tồn tại trong danh sách thành viên hay chưa
    if (!group.members.includes(name)) {
      // Nếu không, thêm người dùng mới vào danh sách thành viên
      group.members.push(name);
    }

    // Thêm tin nhắn mới vào mảng messages

    if (message) {
      group.messages.push({ name: name, text: message });
    }

    // Lưu lại sự thay đổi
    await group.save();

    console.log("Group updated successfully");
  } catch (error) {
    console.error("Error updating group:", error.message);
    throw error;
  }
};

export { createGroup, getGroup, updateGroup };

const Task = require("../models/task");

// create task
const createTask = async (req, res) => {
  try {
    // validation

    const _id = req.user.id;
    const { title, description, dueDate, priority, status } = req.body;

    const createTask = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
    });
    return res.status(200).json({
      message: "New task created succesfully",
      userID: _id,
      taskDetail: createTask,
    });
  } catch (error) {
    console.log("ERROR: ", error.message);
    return res.status(500).json({ message: "Something is wrong" });
  }
};

module.exports = {
  createTask,
};

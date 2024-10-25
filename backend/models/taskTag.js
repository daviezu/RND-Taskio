const mongoose = require("mongoose");

const taskTagSchema = new mongoose.Schema({
  tagID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
  },
  taskID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
});

module.exports = mongoose.model("TaskTag", taskTagSchema);

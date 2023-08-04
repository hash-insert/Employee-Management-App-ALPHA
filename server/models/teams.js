const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  members: [{ type: String, required: true }],
  // members: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Employee",
  //   },
  // ],
});

module.exports = mongoose.model("Team", teamSchema);

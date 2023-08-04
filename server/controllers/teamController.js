const Employee = require("../models/employee");
const Team = require("../models/teams");

const createTeam = async (req, res) => {
  try {
    const { teamName, members } = req.body;
    const team = Team({ teamName, members });
    const isTeamExists = await Team.findOne({ teamName });
    if (!isTeamExists) {
      const newTeam = await team.save();
      for (let i of newTeam.members) {
        let mem = await Employee.findById({ _id: i });
        mem.teams.push(newTeam.teamName);
        await mem.save();
      }
      res.json({ success: true, msg: "Team created successfully.", newTeam });
    } else {
      res.json({ success: false, msg: "Team already exists" });
    }
  } catch (error) {
    console.log("Error creating team:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred. Please try again later.",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const teams = await Team.find();
    if (teams) {
      res.json({ success: true, msg: `Team details fetched`, teams });
    } else {
      return res.status(400).send({ success: false, msg: "data not found" });
    }
  } catch (error) {
    console.log("Error getting all teams details:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred. Please try again later.",
    });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { teamName, id } = req.body;
    const employee = await Employee.findById({ _id: id });
    const team = await Team.findOne({ teamName });
    if (!employee.teams.includes(teamName)) {
      employee.teams.push(teamName);
      team.members.push(id);
      await employee.save();
      await team.save();
      res.json({
        success: true,
        msg: `${employee.employee_name} added to ${teamName}`,
      });
    } else {
      res.json({ success: false, msg: "Employee already exists in that Team" });
    }
  } catch (error) {
    console.log("Error updating team:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred. Please try again later.",
    });
  }
};

module.exports = { createTeam, getAll, updateTeam };

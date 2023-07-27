// import Timesheet from '../models/timeSheet';
const Timesheet = require("../models/timeSheet");

const saveTimeSheet = async (req, res) => {
  const newTimesheet = Timesheet({
    project_name: req.body.project_name,
    activity: req.body.activity,
    date: req.body.date,
    duration: req.body.duration,
    status: req.body.status,
  });
  try {
    const savedTimesheet = await newTimesheet.save();
    return res.status(200).send({ success: true, Timesheet: savedTimesheet });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
};

const getOneTimesheet = async (req, res) => {
  const filter = { _id: req.params.id };
  const data = await Timesheet.findOne(filter);
  if (data) {
    // return res.json(data);
    return res.status(200).send({ success: true, Timesheet: data });
  } else {
    // return res.json("not available");
    return res.status(400).send({ success: false, msg: "data not found" });
  }
};

const getAll = async (req, res) => {
  const data = await Timesheet.find();
  if (data) {
    // return res.json(data);
    return res.status(200).send({ success: true, Timesheet: data });
  } else {
    // return res.json("not available");
    return res.status(400).send({ success: false, msg: "data not found" });
  }
};

const deleteTimesheet = async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await Timesheet.deleteOne(filter);
  if (result) {
    // return res.json(data);
    return res
      .status(200)
      .send({ success: true, msg: "data deleted successfully", data: result });
  } else {
    // return res.json("not available");
    return res.status(400).send({ success: false, msg: "data not found" });
  }
};

//http://localhost:4000/timesheet/update/id
const updateTimesheet = async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await Timesheet.findOneAndUpdate(
      filter,
      {
        project_name: req.body.project_name,
        activity: req.body.activity,
        date: req.body.date,
        duration: req.body.duration,
        status: req.body.status,
      },
      options
    );
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
};

module.exports = {
  saveTimeSheet,
  getOneTimesheet,
  getAll,
  deleteTimesheet,
  updateTimesheet,
};

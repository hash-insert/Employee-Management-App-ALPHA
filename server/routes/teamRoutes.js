const router = require("express").Router();

const {
  createTeam,
  getAll,
  updateTeam,
} = require("../controllers/teamController");
router.post("/createTeam", createTeam);
router.get("/getAll", getAll);
router.put("/updateTeam", updateTeam);

// const { updateTeam } = require("../controllers/teamController");
// router.put("/updateTeam", updateTeam);

module.exports = router;

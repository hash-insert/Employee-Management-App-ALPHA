const router = require("express").Router();

const {saveTimeSheet} = require('../controllers/timesheetController')
router.post('/save',saveTimeSheet);

const {getOneTimesheet} = require('../controllers/timesheetController')
router.get("/getOne/:id",getOneTimesheet);

const {getAll} = require('../controllers/timesheetController')
router.get('/getAll',getAll)

const {deleteTimesheet} = require('../controllers/timesheetController')
router.delete('/delete/:id',deleteTimesheet)

const {updateTimesheet} = require('../controllers/timesheetController')
router.put('/update/:id',updateTimesheet)

module.exports = router;
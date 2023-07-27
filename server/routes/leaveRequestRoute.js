const router = require("express").Router();

const {saveleaveRequest} = require('../controllers/leaveRequestController')
router.post('/save',saveleaveRequest);

const {getOneLeaveRequest} = require('../controllers/leaveRequestController')
router.get('/getOneLeaveRequest/:id',getOneLeaveRequest)

const {getAll} = require('../controllers/leaveRequestController')
router.get('/getAll',getAll)

const {getAllByEmail} = require('../controllers/leaveRequestController')
router.get('/getAll/:email',getAllByEmail)

const {deleteLeaveRequest} = require('../controllers/leaveRequestController')
router.delete('/delete/:id',deleteLeaveRequest)

const {updateLeaveRequest} = require('../controllers/leaveRequestController')
router.put('/update/:id',updateLeaveRequest)

module.exports = router;
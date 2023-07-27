const router = require("express").Router();

const {saveDepartment} = require('../controllers/departmentController')
router.post('/save',saveDepartment);

const {getOneDepartment} = require('../controllers/departmentController')
router.get("/getOne/:id",getOneDepartment);

const {getAll} = require('../controllers/departmentController')
router.get("/getAll",getAll)

const {deleteDepartment} = require('../controllers/departmentController')
router.delete("/delete/:id",deleteDepartment)

const {updateDepartment} = require('../controllers/departmentController')
router.put("/update/:id",updateDepartment)


module.exports = router;
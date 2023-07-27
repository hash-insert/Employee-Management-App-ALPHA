const router = require("express").Router();

const {saveEmployee} = require('../controllers/employeeController')
router.post('/save',saveEmployee);

const {getOneEmployee} = require('../controllers/employeeController')
router.get("/getOne/:email",getOneEmployee);

const {getAll} = require('../controllers/employeeController')
router.get("/getAll",getAll)

const {deleteEmployee} = require('../controllers/employeeController')
router.delete("/delete/:id",deleteEmployee)

const {updateEmployee} = require('../controllers/employeeController')
router.put("/update/:id",updateEmployee)


module.exports = router;
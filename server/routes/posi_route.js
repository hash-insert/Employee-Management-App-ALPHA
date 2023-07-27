const router = require("express").Router();



// router.post("/save", async (req, res) => {
//   const newPosition = Position({
//     position_id: req.body.position_id,
//     position_title: req.body.position_title,
//     department_id: req.body.department_id
//   });
//   try {
//         const savedPosition=await newPosition.save();
//         return res.status(200).send({success:true,artist:savedPosition});
//     } catch (error) {
//         return res.status(400).send({success:false,msg:error});
//     }
// });

const {savePosition} = require('../controllers/positionController')
router.post('/save',savePosition);

const {getOnePosition} = require('../controllers/positionController')
router.get("/getOne/:id",getOnePosition);

const {getAll} = require('../controllers/positionController')
router.get("/getAll",getAll)

const {deletePosition} = require('../controllers/positionController')
router.delete("/delete/:id",deletePosition)

const {updatePosition} = require('../controllers/positionController')
router.put("/update/:id",updatePosition)

module.exports = router;

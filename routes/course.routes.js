const router = require('express').Router();
const {getAllCourse, getDetailCourse, getPremiumCourse} = require('../controllers/course.controllers');

router.get('/list', getAllCourse);
router.get('/details/:id', getDetailCourse);
router.get('/premium/:categoryId&&?level=level', getPremiumCourse);

module.exports = router;
const express = require('express');
const router = express.Router();
const  UserController  = require('../controllers/user-controller');


router.get('/users' , UserController.get);
router.get('/users/:id/skills' , UserController.getBySkill);
router.get('/users/:id/:column' , UserController.getByFilter);

router.patch('/users/:id/' , UserController.update);

module.exports = router;
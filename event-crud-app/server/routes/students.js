const express = require('express');
const router=express.Router();
const studentcon=require('../controllers/students_control')

router.get('/',studentcon.home)

module.exports=router;
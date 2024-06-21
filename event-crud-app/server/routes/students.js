const express = require('express');
const router=express.Router();
const studentcon=require('../controllers/students_control')

router.get('/adduser',studentcon.index)

router.get('/',studentcon.home)

router.post('/addusers',studentcon.detailspost)

router.get('/Editusers/:registration_number',studentcon.detailsupdateget)

router.post('/updateusers',studentcon.detailsupdate)

router.get('/deleteusers/:registration_number',studentcon.detailsdeleteget)

router.post('/Deleteusers',studentcon.detailsdelete)

module.exports=router;
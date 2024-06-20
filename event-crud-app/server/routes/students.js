const express = require('express');
const router=express.Router();
const studentcon=require('../controllers/students_control')

router.get('/adduser',studentcon.index)

router.get('/',studentcon.home)

router.post('/addusers',studentcon.detailspost)

router.get('/updateusers/:name',studentcon.detailsupdateget)

router.put('/updateusers',studentcon.detailsupdate)

router.get('/deleteusers/:name',studentcon.detailsdeleteget)

router.delete('/deleteusers',studentcon.detailsdelete)

module.exports=router;
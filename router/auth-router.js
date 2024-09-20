


const express=require('express')
const authmidelw=require('../mideleware/Auth-midelware')
const router=express.Router()
const authrouter=require('../constrolar/auth-controlar')
//const newrouter=require("../athuntication/regestation")

router.route('/plot').get(authrouter.plot)
router.route('/find').get(authrouter.sharch)
router.route('/change').get(authrouter.pagechange)


module.exports=router




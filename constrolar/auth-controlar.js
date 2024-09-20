
//>>>....>>//
//Rest API//

const bceypt=require('bcryptjs')

const User=require('../Skima/Peraon')
const Prskima=require("../skima3/producr")
const { random, result } = require('lodash')
const { cache, name } = require('ejs')
const { default: errorMap } = require('zod/locales/en.js')
const { Await } = require('react-router-dom')
const { date } = require('zod')
const productJson=require("../product.json")

const plot=async(req,res)=>{

  try {

    const productdata=await Prskima.create(productJson)
   const node=res.status(201).json({msg:productdata})
       
    console.log('sucsess')
    
  } catch (error) {
     console.log(error)
  }

}


//----------------//
//product shearch AND Add SORT functionality in Rest API
//---------------//

const sharch=async(req,res)=>{

  try {

    const {company,name,feature,sort,select}=req.query

   const queryobject={}
  if(company){
    queryobject.company={$regex:company, $options:"i"}
  }
 if(feature){
queryobject.feature=feature
}
   if(name){
    queryobject.name={$regex:name, $options:"i"}
   }
let apiData=Prskima.find(queryobject)

//sort

 if(sort){
let shortfix=sort.replace(",","")



 apiData=apiData.sort(shortfix)
 }

 //select

if(select){

  let selectfix=select.split(",").join("")
 apiData=apiData.select(selectfix)

}
 const data=await apiData
 res.status(200).json({data,nBhits:data.length})
   
  } catch (error) {
    console.log(error)
  }
}




//-----------///
//pagenation part
//---------///




const pagechange= async(req,res)=>{

  try {
  let apiData=Prskima.find()

let page=Number(req.query.page)||1;
let limit=Number(req.query.limit)||2;

let skip=(page-1)*limit;


page=2;
page=3;

apiData=apiData.skip(skip).limit(limit)


 const data=await apiData
 res.status(200).json({data,nBhits:data.length})
  } catch (error) {
    console.log(error)
  }
}



module.exports={plot,sharch,pagechange}


























const express = require('express');
var router = express.Router();
const testModel = require('../models/test');
// const jwt = require('jsonwebtoken');
// const jwtMiddle = require('express-jwt-middleware');
// const jwtCheck = jwtMiddle('secret');
// const bcyrpt = require('bcryptjs');

router.route('/')
    .get( async (req,res)=>{
        try{
            const data = await testModel.find({})
            res.json({data:data,message:true})
        }
        catch(err){
            res.json({message:false, error:err})
        }
    })
    .post( async (req,res)=>{
        // const hash = await bcyrpt.hash(req.body.desc, 10);
        // console.log(req.body.photo)
        const post = new testModel({
            username: req.body.username,
            password:req.body.password
        })
        try{
            const data = await post.save()
            res.json({data:data,result:true})
        }
        catch(err){
            res.json({message:err})
        }
    })
    .delete( async(req,res)=>{
        try{
            const data = await testModel.deleteMany()
            res.json(data)
        }
        catch(err){
            res.json({message:err})
        }
    })
router.route('/:id')
    .get( async (req,res)=>{
        try{
            const data = await testModel.findById({_id:req.params.id})
            res.json(data)
        }
        catch(err){
            res.json({message:err})
        }
    })
    .put( async (req, res)=>{
        
        try{
            const data = await testModel.updateOne({_id:req.params.id},
                {
                    $set: {
                        username: req.body.username,
                        password:req.body.password
                    }
                })
            res.json({data:data, result:true})
        }
        catch(err){
            res.json({message:err, result:false})
        }
    })
    .delete( async (req, res)=>{
        try{
            const data = await testModel.deleteOne({_id:req.params.id})
            res.json(data)
        }
        catch(err){
            res.json({message:err})
        }
    })
router.route('/login')
    .post( async(req,res)=>{
        const username = req.body.username;
        const password = req.body.password;
        
        try{

            const data = await testModel.findOne({username:username})
            console.log(data)
            if(data!=null){
            if (data.password === password){
            // const auth = bcyrpt.compareSync(password, data.desc);
                // const token = jwt.sign({ name: name }, 'secret');
                res.json({
                    success: true,
                    message: 'Welcome, ' + username
                    // accessToken: token
                })
            }
            else{
                res.json({success:false,message:'Password incorrect'})
            }
        }
        else{
            res.json({success:false,message:'User Not Found'})
        }       
        }
        catch(err){
            res.json({message:err})
        }

    })
    module.exports = router;


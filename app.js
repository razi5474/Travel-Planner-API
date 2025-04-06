const express = require("express")
const { default: mongoose } = require("mongoose")
const travelPlan = require('./model/travelPlan')

const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req,res)=>{
    res.send("Hello Lets Travel")
})

async function main(){
    await mongoose.connect('mongodb+srv://rasrasil69:UpGR2eGtT4UXsvuM@cluster0.j55fl.mongodb.net/module_end-5')
}

main()
.then(()=>console.log("DB connected"))
.catch(err=>{console.log(err)})

// Create Plan

app.post('/plans',async(req,res)=>{
    try {
        if(!req.body){
            return res.status(400).json({error:"Plans deatails can't be empty"})
         } 
        const plan = new travelPlan(req.body)
        await plan.save()
        res.status(201).json(plan)
    } catch (error) {
       console.log
       res.status(500).json(error) 
    }
})

// Get all plans

app.get('/plans',async(req,res)=>{
    try {
        const plans = await travelPlan.find()
        res.status(200).json(plans)
    } catch (error) {
        console.log
        res.status(500).json(error) 
    }
})

// Get plans by id

app.get('/plans/:id',async(req,res)=>{
    try {
        const planId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(planId)){
            return res.status(400).json({error:"invalid plans id format"})
         }
        const plan = await travelPlan.findById(planId)

        if(!plan){
            return res.status(404).json({message:'Travel plan is not found'})
        }
        else{
            res.status(200).json(plan)
        }

    } catch (error) {
        console.log
        res.status(500).json(error) 
    }
})


// update plan

app.patch('/plans/:id',async(req,res)=>{
    try {
        const planId = req.params.id
        if(!planId){
             return res.status(400).json({error:"Plans Is required"})
        }
         if(!req.body || Object.keys(req.body).length === 0){
            return res.status(400).json({error:"Plans deatails can't be empty"})
         } 
         if(!mongoose.Types.ObjectId.isValid(planId)){
            return res.status(400).json({error:"invalid plans id format"})
         }
         const plan = await travelPlan.findByIdAndUpdate(planId,req.body,{new:true})
         res.status(200).json(plan)

    } catch (error) {
        console.log
        res.status(500).json(error) 
    }


})

// Delete product
app.delete('/plans/:id',async(req,res)=>{
    try {
        const planId = req.params.id
        if(!planId){
             return res.status(400).json({error:"Plans Is required"})
        }
         
         if(!mongoose.Types.ObjectId.isValid(planId)){
            return res.status(400).json({error:"invalid plans id format"})
         }
         const plan = await travelPlan.findByIdAndDelete(planId)
         if(!plan){
            return res.status(404).json({message:"Product not found"})
         }
         else{
            res.status(200).json({message:"plan deleted succesfully"})
         }

    } catch (error) {
        console.log
        res.status(500).json(error) 
    }


})



app.listen(port,()=>{
    console.log("Server Started")
})
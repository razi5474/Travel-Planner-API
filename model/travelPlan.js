const mongoose = require('mongoose')
const travelPlanSchema = new mongoose.Schema({
    destination:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    activities:[String]
})

const travelPlan = mongoose.model('plans',travelPlanSchema)
module.exports = travelPlan
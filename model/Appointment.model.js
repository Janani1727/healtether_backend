const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

    phonenumber:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    location:{
        type:String,
        required: true
    },


    DateofAppointment:{
        type: Date,
        
    },
    TimeofAppointment:{
        type:Object,
       
    },
    
     status: {
            type: String,
            enum: [ 'Upcoming', 'Completed', 'Cancelled'],
            required: true
          },
    
})

const AppointmentModel = mongoose.model("appointments", appointmentSchema)

module.exports = {AppointmentModel}


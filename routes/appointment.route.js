const express = require("express");
const { AppointmentModel } = require("../model/Appointment.model");
const appointmentRouter = express.Router();

 
// get request

appointmentRouter.get("/", async (req, res) => {

      const {
        name,
        status,
        page,
        limit
        
      } = req.query;
      
      const query = {};
   
      if (name) {
        query.name = { $in: name };
      }
    
      if (status) {
        query.status = { $in: status };
      }
    
      const pageNumber = page || 1;
      const pageLimit = limit || 50;
      const pagination = pageNumber * pageLimit - pageLimit || 0;
     
    try {
      const posts = await AppointmentModel.find(query)
          
          .skip(pagination)
          .limit(pageLimit);

        if (posts) {    
      res.send(posts);
    
        }
    } catch (error) {
      res.send({ msg: "Something went wrong", error: error });
    }
  });
  

  // for time slots between 4 pm to 8 pm


let availableTimeSlots = [];

 
function populateTimeSlots() {
  for (let hour = 4; hour <= 8; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      availableTimeSlots.push({
        startTime: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        endTime: `${hour.toString().padStart(2, '0')}:${(minute + 15).toString().padStart(2, '0')}`
      });
    }
  }
}
populateTimeSlots()
// console.log(availableTimeSlots)



// post request

appointmentRouter.post("/postdata", async (req, res) => {

  const payload = req.body;
  try {
    const post = new AppointmentModel({...payload,TimeofAppointment:availableTimeSlots[0]});
     availableTimeSlots.shift()
    await post.save();
    res.send("successful");
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error });
  }
});

// patch request to update


appointmentRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    await AppointmentModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ msg: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});




module.exports = {
  appointmentRouter,
}

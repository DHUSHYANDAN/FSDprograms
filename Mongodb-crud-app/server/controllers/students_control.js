const mongoose = require('mongoose');
const moment = require('moment');
const AutoIncrement = require('mongoose-sequence')(mongoose);


mongoose.connect('mongodb://localhost:27017/eventDB', {
  
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1); // Exit process with failure
});

const eventSchema = new mongoose.Schema({
    id:{type : Number},
    name: { type: String, required: true },
    registration_number: { type: String, required: true ,unique: true},
    dept: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    description: { type: String }
});
eventSchema.plugin(AutoIncrement, { inc_field: 'id' });
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;


//User can see this page first
module.exports.home = (req, res) => {
   
    res.render('home' );
}


//Get the details  Get method
module.exports.index = async (req, res) => {
    try {
        const events = await Event.find({});
       
        const formattedEvents = events.map(event => ({
            ...event.toObject(),
            dob: moment(event.dob).format('DD-MM-YYYY')
        }));
        
        res.render('index', { events: formattedEvents });
    } catch (err) {
        console.error('Error in listing data', err);
        res.status(500).send('Error in listing data');
    }
};

// Create Event post method
module.exports.detailspost = async (req, res) => {
    const { name, registration_number, dept, dob, email, description } = req.body;

    try {
        const student = await Event.findOne({ registration_number });

        if (student) {
            // Student with the same registration number already exists
            return res.status(400).send("<script>alert('Error: Duplicate registration number. Please use a different registration number.')</script>");
        }

        const newEvent = new Event({
            name,
            registration_number,
            dept,
            dob: new Date(dob),
            email,
            description
        });

        await newEvent.save();
        res.redirect('/adduser');
    } catch (err) {
       
            console.error('Error saving event', err);
            res.status(500).send('Error saving event');
    }
};


// to view the edit page
module.exports.detailsupdateget = async (req, res) => {
    let registration_number = req.params.registration_number;
    try {
        // Fetch the event using Mongoose
        const student = await Event.findOne({ registration_number: registration_number });

        if (!student) {
            return res.status(404).send('Event not found');
        }
        const formattedEvent = {
            ...student.toObject(),
            dob: moment(student.dob).format('YYYY-MM-DD')
        };

        res.render('edit', { student: formattedEvent });
    } catch (err) {
        console.error('Error in listing data', err);
        res.status(500).send('Error in listing data');
    }
};


//edit the users update method
module.exports.detailsupdate = async (req, res) => {
    const { name, registration_number, dept, dob, email, description } = req.body;
    try {
        const updatedEvent = await Event.findOneAndUpdate(
            { registration_number: registration_number }, 
            {
                name,
                registration_number,
                dept,
                dob: new Date(dob), 
                email,
                description
            },
            { new: true, runValidators: true } 
        );
        if (!updatedEvent) {
            return res.status(404).send("<script>alert('Error: No record found with the provided registration number.')</script>");
        } else {
            res.redirect('/adduser'); 
        }
    } catch (err) {
        console.log('Error in updating data', err);
        res.status(500).send("<script>alert('Error: Unable to update the record. Please try again later.')</script>");
    }
};




// to view the delete page
module.exports.detailsdeleteget = async (req, res) => {
    let registration_number = req.params.registration_number;
    try {
        // Fetch the event using Mongoose
        const student = await Event.findOne({ registration_number: registration_number });

        if (!student) {
            return res.status(404).send('Event not found');
        }

        // Format the event data
        const formattedEvent = {
            ...student.toObject(),
            dob: moment(student.dob).format('YYYY-MM-DD')
        };

        res.render('delete', { student: formattedEvent });
    } catch (err) {
        console.error('Error in listing data', err);
        res.status(500).send('Error in listing data');
    }
};

//delete the users Delete method
module.exports.detailsdelete = async (req, res) => {
    const { registration_number } = req.body;
    try {
        const result = await Event.findOneAndDelete({ registration_number: registration_number });

        if (!result) {
            return res.status(404).send("<script>alert('Error: No record found with the provided registration number.')</script>");
        } else {
            res.redirect('/adduser');
        }
    } catch (err) {
        console.log('Error in deleting data', err);
        res.status(500).send('Error in deleting data');
    }
};
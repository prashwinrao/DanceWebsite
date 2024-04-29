const express=require("express");
const path=require("path");
const app=express();
const port=3000;
const bodyparser=require("body-parser");

const mongoose = require('mongoose');

app.use(bodyparser.urlencoded({ extended: true }));
mongoose.set('strictQuery', true);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://ashwin:sakshi@cluster0.wjcktrs.mongodb.net/');
}


const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    Email: String,
    Address: Object,
  });

const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')) // For serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine','pug')  //Set the template engine as pug
app.set('views',path.join(__dirname,'views')) //Set the views directory


//ENDPOINTS
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})



//START THE SERVER
app.listen(port,()=>{
    console.log(`The application is listening to the port ${port}`);
});


// we have saved the records of the contacts in the database by using mongoose in the name contactDance.


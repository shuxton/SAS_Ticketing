const Admin = require('../models/admin');
const Ticket = require('../models/ticket');
const User = require('../models/user');





module.exports.newTicket = async (req, res) => {
  admin = await Admin.find({})
  res.render('tickets/newTicketForm',{admin:admin[0]});
}


module.exports.saveNewTicket = async (req, res) => { 
    ticketObj={
    userid: res.locals.currentUser._id,
    clientName: res.locals.currentUser.displayName,
    project:req.body.project,
    subject:(req.body.subject).trim(),
    message:(req.body.message).trim(),
    createdAt:new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear()+" "+new Date().getHours()+":"+new Date().getMinutes(),
    status:'Created',
    severity:null,
    category:null,
    estTime:null,
    internalStatus:null,
    forwardedTo:null,
    display:null,
    issues:null,
    expectedResolution:null,
    priority:null,
    adminMessage:null
    }
    try {
      await Ticket.insertMany(ticketObj)
    } catch (error) {
      console.log(error)
      req.flash('error', 'Something went wrong');
      res.redirect('/');
    }
    res.redirect('/tickets/dashboard');
}




module.exports.editTicket = async (req, res) => {
  var ticket=null,admin=[null],employees=[]
  try{
  ticket= await Ticket.findById(req.params.id)
  admin = await Admin.find()
  employees= await User.find({type:"Employee"})
  }catch(error){
    console.log(error)
    req.flash('error', 'Something went wrong');
    res.redirect('/');
  }
  res.render('tickets/editTicketForm',{ticket,admin:admin[0],employees});
}




module.exports.saveEditTicket = async (req, res) => {
  updateObj={
    severity:req.body.severity,
    category:req.body.category,
    estTime:req.body.estTime,
    internalStatus:req.body.internalStatus,
    forwardedTo:req.body.forwardedTo,
    status:'Assigned',
    display:req.body.display,
    expectedResolution:req.body.expectedResolution,
    priority:req.body.priority,
    adminMessage:(req.body.adminMessage).trim()
  }
  await Ticket.updateOne({_id:req.params.id},{$set:updateObj},(error,res)=>{
    if(error)
    console.log(error);
  })
  res.redirect('/tickets/dashboard');
}



module.exports.deleteTicket = async (req, res) => {
  await Ticket.updateOne({_id:req.params.id},{$set:{
    status:'Solved'
   }},(error,res)=>{
     if(error)
     console.log(error);
   })
     res.redirect('/tickets/dashboard')
}



module.exports.dashboard = async (req,res) => {
    currentUser=res.locals.currentUser
    var tickets=null,created=0,solved=0,assigned=0;
    try{
    if(currentUser.type==="Admin"){
    tickets = await Ticket.find({}).sort({  "$natural": -1 });;
    created= await Ticket.countDocuments({status:'Created'})
    solved= await Ticket.countDocuments({status:'Solved'})
    assigned= await Ticket.countDocuments({status:'Assigned'})
    }
    else if(currentUser.type==="Employee"){
    tickets = await Ticket.find({forwardedTo:currentUser.username}).sort({  "$natural": -1 });;
    created= await Ticket.countDocuments({status:'Created',forwardedTo:currentUser.username})
    solved= await Ticket.countDocuments({status:'Solved',forwardedTo:currentUser.username})
    assigned= await Ticket.countDocuments({status:'Assigned',forwardedTo:currentUser.username})
    }
    else{
    tickets = await Ticket.find({userid:currentUser._id}).sort({  "$natural": -1 });;
    created= await Ticket.countDocuments({status:'Created',userid:currentUser._id})
    solved= await Ticket.countDocuments({status:'Solved',userid:currentUser._id})
    assigned= await Ticket.countDocuments({status:'Assigned',userid:currentUser._id})
    }
    }catch(error){
      console.log(error)
      req.flash('error', 'Something went wrong');
      res.redirect('/');
    }
    res.render('tickets/dashboard',{tickets,created,solved,assigned})
  }


module.exports.viewTicket = async (req,res) => {
  var ticket={}
    try {
      ticket = await Ticket.findById(req.params.id)
    } catch (error) {
      console.log(error)
      req.flash('error', 'Something went wrong');
      res.redirect('/');
    }
    res.render('tickets/ticket',{ticket})
}




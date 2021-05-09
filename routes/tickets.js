const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const tickets = require('../controllers/tickets');


router.route('/tickets/new')
.get(isLoggedIn  ,tickets.newTicket)
.post(isLoggedIn , tickets.saveNewTicket)

router.route('/tickets/edit/:id')
.get(isLoggedIn,tickets.editTicket)
.post(isLoggedIn,tickets.saveEditTicket)


router.route('/tickets/delete/:id')
.post(isLoggedIn , tickets.deleteTicket)

router.route('/tickets/dashboard')
.get(isLoggedIn , tickets.dashboard)

router.route('/tickets/views/:id')
.get(isLoggedIn, tickets.viewTicket)



// router.route('/tickets/search')
// .get(tickets.search)


module.exports = router;

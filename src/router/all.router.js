const express = require('express')
const router = express.Router();
const userController = require('../controller/user.controller')
const  {authenticateToken,getRoles}  =  require('../middleware/index.middleware')
const newsController = require('../controller/news.controller')
const hotelController = require('../controller/hotel.controller')
const roomController = require('../controller/room.contoller')
const addressController = require('../controller/address.controller')
const placeController = require('../controller/place.controller')
const bookingController = require('../controller/booking.controler')
const statusController = require('../controller/status.controller')
const paymentController = require('../controller/payment.controller')
const invoiceController = require('../controller/invoice.controller')
const reviewerController = require('../controller/reviewer.controller')
const accountcardController = require('../controller/accoun_card.controller')
const contentController = require('../controller/content.controller')

// router user 
router.post('/SignUp',userController.SignUp)
router.post('/SignIn',userController.SignIn)
router.get('/user/:id', userController.getSingleUser)
router.get('/user',[authenticateToken,getRoles], userController.getAllUser)
router.delete('/user/:id', [authenticateToken,getRoles], userController.deleteUser)
router.put('/user/:id',[authenticateToken,getRoles],userController.updateUser)
// News router
router.post('/news',[authenticateToken, getRoles], newsController.postNews)
router.get('/news',newsController.getAllNews)
router.get('/news/:id',newsController.getSingleNewData);
router.put('/news/:id',[authenticateToken, getRoles], newsController.updateNews)
router.delete('/news/:id',[authenticateToken,getRoles], newsController.deleteNews)
// hotel router and testing
router.post('/hotel',hotelController.createHotel)
router.get('/hotel',hotelController.getDataHotel)
router.get('/hotel/:id',hotelController.getSingleData)
// room router and testing
router.post('/room',[authenticateToken,getRoles], roomController.createRoom)
router.get('/room',roomController.getAllRoom);
router.get('/room/:id',roomController.getSingleRoom);
router.put('/room/:id',[authenticateToken,getRoles],roomController.updateRoom)
router.delete('/room/:id',[authenticateToken,getRoles], roomController.deleteRoom)
// address router and testing
router.post('/address',[authenticateToken,getRoles], addressController.createAddress)
router.get('/address/:id',[authenticateToken,getRoles],addressController.getSingleAddress)
router.put('/address/:id',[authenticateToken,getRoles],addressController.updateAddress)
router.delete('/address/:id', [authenticateToken,getRoles], addressController.deleteAddress)
// place router 
router.post('/place',[authenticateToken, getRoles],placeController.createPlace)
router.get('/place', placeController.getAllPlace)
router.get('/place/:id',[authenticateToken, getRoles], placeController.getSinglePlace)
router.put('/place/:id',[authenticateToken, getRoles], placeController.updatePlace)
router.delete('/place/:id',[authenticateToken, getRoles], placeController.deletePlace)
// booking router and testing
router.post('/booking',bookingController.bookingHotel)
router.put('/booking:/id', [authenticateToken,getRoles], bookingController.updateBooking)
router.put('/booking:/id', [authenticateToken,getRoles], bookingController.deleteBooking)
router.get('/booking/:id',[authenticateToken,getRoles],bookingController.getSingleDataBooking)
router.get('/booking',[authenticateToken, getRoles], bookingController.getAllDataBooking)
// status router and testing
router.post('/status', statusController.createStatus)
router.get('/status',[authenticateToken, getRoles], statusController.getSingleStatus)
// payment router and testing
router.post('/payment', paymentController.createPayment)
// invoice router and testing
router.post('/invoice',invoiceController.createInvoice)
router.get('/invoice',[authenticateToken, getRoles], invoiceController.getInvoice)
router.get('/invoice/:id',[authenticateToken,getRoles], invoiceController.getSingleInvoice)
// reviewer router and testing 
router.post('/reviewer',reviewerController.createReviewer)
router.get('/reviewer',reviewerController.getReviewer)
router.get('/reviewer/:id', reviewerController.getSingleReviewer)
router.put('/reviewer/:id',[authenticateToken,getRoles],reviewerController.updateReviewer)
router.delete('/reviewer/:id',[authenticateToken,getRoles],reviewerController.deleteReviewer)

// account_card and testing 
router.post('/account',[authenticateToken, getRoles],accountcardController.createAccount)
router.get('/account',[authenticateToken,getRoles], accountcardController.getAllAccount)
router.get('/account:/id', [authenticateToken,getRoles], accountcardController.getSingleAccount)
router.put('/account/:id',[authenticateToken,getRoles], accountcardController.updateAccount)
router.delete('/account/:id',[authenticateToken,getRoles],accountcardController.deleteAccount )


// content router and testing
router.post('/content',[authenticateToken,getRoles],contentController.createContent)
router.get('/content', contentController.getContent)
router.get('/content/:id',[authenticateToken,getRoles],contentController.getSingleContent)
router.put('/content/:id',[authenticateToken,getRoles],contentController.updateContent)
router.delete('/content/:id',[authenticateToken,getRoles],contentController.deleteContent)

module.exports = router

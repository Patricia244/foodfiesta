import express from 'express'
import {listOrder, placeOrder,updateStatus,userOrders,verifyOrder} from '../controllers/orderController.js'
import authMiddleware from '../middleware/auth.js'

const orderRoute = express.Router()

orderRoute.post('/placeOrder',authMiddleware,placeOrder)
orderRoute.post('/verify',verifyOrder)
orderRoute.post('/userOrders',authMiddleware,userOrders)
orderRoute.get('/listOrders',listOrder)
orderRoute.post('/status',updateStatus)

export default orderRoute
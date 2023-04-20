const Order = require("../models/orderModel");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Product = require('../models/productModel');
const User = require('../models/userModels');

// Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next)=> {
    const {shippinfInfo, orderItems, paymentInfo, itemsPrice, taxPrice,shippingPrice, totalPrice} = req.body;

    const order = await Order.create({
        shippinfInfo, 
        orderItems, 
        paymentInfo,
        itemsPrice, 
        taxPrice,
        shippingPrice, 
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    });

    res.status(201).json({
        success: true,
        order,
    })
});

// Get Single Order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next)=> {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user Orders
exports.myOrders = catchAsyncErrors(async (req, res, next)=> {
    const order = await Order.find({user:req.user._id})


    res.status(200).json({
        success: true,
        order
    })
})



// Get all orders --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next)=> {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order)=> {
        totalAmount += order.totalPrice;
    })




    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// Update Order Status --Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next)=> {
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

   if(order.orderStatus==="Delivered"){
    return next(new ErrorHandler("You have already delivered thsi order", 404));
   }

   order.orderItems.forEach(async(o)=>{
    await updateStock(o.product, o.quantity);
   });

   order.orderStatus = req.body.status;

   if(req.body.status === "Delivered"){
   order.deliveredAt = Date.now();}



    await order.save({validateBeforeSave: false});
    res.status(200).json({
        success: true,
    })
})

async function updateStock(id, quantity){
    const product = await Product.findById(id)

    product.Stock = product.Stock - quantity;

    await product.save({ValidateBeforeSave: false});
}


// Delete Order Status --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next)=> {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    await Order.findByIdAndRemove(req.params.id);

   
    res.status(200).json({success: true})
    })




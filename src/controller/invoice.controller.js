const invoiceModel = require('../model/invoice.model')

exports.createInvoice = async (req, res) => {
    try {
     if(!req.body.total_invoice || !req.body.payment_id) {
        return res.status(400).json({text:"The body could not emty"})
     } else {
        const newData = {
            ...req.body
        }
        const invoice = await invoiceModel.create(newData)
        const response = {
            total_invoice:invoice.total_invoice,
            payment_id:invoice.payment_id
        }
        return res.status(201).json(response)
     }

    } catch (error) {
     return res.status(500).json({message:"Server Error"})   
    }
}
// get invoice
exports.getInvoice = async (req, res) => {
    try {
     const invoice = await invoiceModel.find({}).select('-__v')   
     if(!invoice) {
        return res.status(400).json('not found data')
     } else {
        return res.status(200).json(invoice)
     }
    } catch (error) {
     return res.status(500).json({message:`Server Error ${error}`})    
    }
}
// get single invoice
exports.getSingleInvoice = async (req, res) => {
    try {
       const {id} = req.params;
       const {roles} = req.roles;
       if(roles == null) {
        return res.status(400).json(`not found roles`)
       } else if(roles == 'user') {
        const invoice = await invoiceModel.findById(id).select('-__v')
        if(!invoice) {
            return res.status(400).json(`not found data`)
        } else {
            return res.status(200).json(invoice)
        }
       } else {
        return res.status(400).json(`can not access`)
       } 
    } catch (error) {
     return res.status(500).json({message:`Server Error ${error}`})   
    }
}
// update invoice
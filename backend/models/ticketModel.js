const mongoose = require('mongoose')

const ticketShema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "User"
    }, 
    product: {
        type: String,
        required: [true, "Please select a product"],
        enum: ['iPad', 'iMac', 'iPhone', 'Mackbook Pro']
    },
    description: {
        type: String,
        required: [true, "Please enter a description of the issue"]
    },
    status: {
        type: String,
        required: true,
        enum: ['New', "open", "closed"], 
        default: "New"
    }
}, 
    {timestamps: true}
)

module.exports = mongoose.model('Ticket', ticketShema)

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    weight: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);

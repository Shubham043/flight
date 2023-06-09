import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  indigo: {
    type: Number,
    required: true,
  },
  airasia: {
    type: Number,
    required: true,
  },
  vistara: {
    type: Number,
    required: true,
  },
});

const Price = mongoose.model('Price', priceSchema);

export default Price;

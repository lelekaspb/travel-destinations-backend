const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DestinationSchema = new Schema({
  title: { type: String, required: "Title cannot be empty", maxLength: 30 },
  date_from: { type: Date, required: "Start date cannot be empty" },
  date_to: { type: Date, required: "End date cannot be empty" },
  country: { type: String, required: "Country cannot be empty" },
  location: { type: String, required: "Location cannot be empty" },
  description: {
    type: String,
    required: "Description cannot be empty",
    maxLength: 300,
  },
  picture: { type: String },
  picture_public_id: { type: String },
});

module.exports = mongoose.model("Destination", DestinationSchema);

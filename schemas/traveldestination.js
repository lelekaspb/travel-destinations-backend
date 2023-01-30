const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DestinationSchema = new Schema({
  title: { type: String, required: "Title cannot be empty", maxLength: 30 },
  date_from: { type: Date },
  date_to: { type: Date },
  country: { type: String, required: "Country cannot be empty" },
  location: { type: String, required: "Location cannot be empty" },
  description: {
    type: String,
    required: "Description cannot be empty",
    maxLength: 300,
  },
  picture: { type: String },
});

module.exports = mongoose.model("Destination", DestinationSchema);

// validate: {
//   validator: () => Promise.resolve(false),
//   message: 'Email validation failed'
// }

// removed from date_to
// validate: {
//   validator: (date_from, date_to) => {
//     console.log(this);
//     console.log(date_to, date_from);
//     return new Date(date_to) >= new Date(date_from);
//   },
//   message: "Start date cannot be later than end date",
// },

const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    description: { type: String, required: 1 },
    classifier: { type: String, required: 1 },
    openingBalance: { type: Number, required: 1 },
    debit: { type: Number, required: 1 },
    credit: { type: Number, required: 1 },
    finalBalance: { type: Number, required: 1 },
    parent: { type: String },
  },
  { timestamps: true }
)

module.exports = model('AccountsMdl', schema, 'accounts')
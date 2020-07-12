import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');

@Schema()
export class Counter extends Document {
  @Prop()
  _id: { type: string; required: true };

  @Prop()
  seq: { type: number; default: 0 };
}

const CounterSchema = SchemaFactory.createForClass(Counter);

CounterSchema.index({ _id: 1, seq: 1 }, { unique: true });

const counterModel = mongoose.model('counter', CounterSchema);

const autoIncrementModelID = function(modelName, doc, next) {
  counterModel.findByIdAndUpdate(
    // ** Method call begins **
    modelName, // The ID to find for in counters model
    { $inc: { seq: 1 } }, // The update
    { new: true, upsert: true }, // The options
    function(error, counter) {
      // The callback
      if (error) return next(error);

      doc.id = counter.seq;
      next();
    },
  ); // ** Method call ends **
};

module.exports = autoIncrementModelID;

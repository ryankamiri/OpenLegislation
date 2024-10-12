import mongoose from "mongoose";

const { Schema } = mongoose;

// billId, title, congressId, latestAction, originChamber, updateDate, url

const billSchema = new Schema(
  {
    billId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    congressId: {
      type: Number,
      required: true,
    },
    latestAction: {
      actionDate: {
        type: Date,
        required: false,
      },
      text: {
        type: String,
        required: false,
      },
    },
    originChamber: {
      type: String,
      required: true,
    },
    updateDate: {
      type: Date,
      required: true,
    },
    latestStage: {
        type: String,
        required: true
    },
    sponsor: {
        type: Object,
        required: true,
    },
    cosponsors: {
        type: Array,
        required: true
    },
    billUrl: {
      type: String,
      required: true,
    },
    textUrl: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  },
);

const Bill = mongoose.model("Bill", billSchema);

export default Bill;

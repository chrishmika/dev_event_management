import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// RFC 5322-simplified email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => EMAIL_REGEX.test(v),
        message: (props: { value: string }) =>
          `"${props.value}" is not a valid email address.`,
      },
    },
  },
  { timestamps: true }
);

// Index on eventId for fast lookups of bookings per event
BookingSchema.index({ eventId: 1 });

/**
 * Pre-save hook: verify the referenced Event exists before persisting.
 * Prevents orphaned bookings pointing to non-existent events.
 */
BookingSchema.pre("save", async function () {
  // Only check when eventId is set or changed
  if (this.isModified("eventId")) {
    const EventModel = mongoose.model("Event");
    const exists = await EventModel.exists({ _id: this.eventId });
    if (!exists) {
      throw new Error(`Event with id "${this.eventId}" does not exist.`);
    }
  }
});

const Booking: Model<IBooking> =
  mongoose.models.Booking ?? mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;

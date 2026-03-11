import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: {
      type: String,
      required: true,
      enum: ["online", "offline", "hybrid"],
    },
    audience: { type: String, required: true, trim: true },
    agenda: { type: [String], required: true, validate: (v: string[]) => v.length > 0 },
    organizer: { type: String, required: true, trim: true },
    tags: { type: [String], required: true, validate: (v: string[]) => v.length > 0 },
  },
  { timestamps: true }
);

// Unique index for fast slug lookups
EventSchema.index({ slug: 1 }, { unique: true });

/**
 * Pre-save hook:
 * 1. Generates a URL-friendly slug from title (only when title changes).
 * 2. Normalises `date` to ISO 8601 (YYYY-MM-DD) and validates it.
 * 3. Normalises `time` to 24-hour HH:mm format.
 */
EventSchema.pre("save", async function () {
  // --- Slug generation (only when title is new or modified) ---
  if (this.isModified("title")) {
    const base = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")   // strip non-word chars except spaces/hyphens
      .replace(/[\s_]+/g, "-")     // collapse whitespace / underscores to hyphens
      .replace(/-+/g, "-")         // collapse consecutive hyphens
      .replace(/^-|-$/g, "");      // trim leading/trailing hyphens

    // Append a short random suffix to avoid collisions on duplicate titles
    const suffix = Math.random().toString(36).substring(2, 8);
    this.slug = `${base}-${suffix}`;
  }

  // --- Date normalisation (ISO 8601 YYYY-MM-DD) ---
  if (this.isModified("date")) {
    const dateStr = this.date.trim();

    // Require a strict calendar date in the form YYYY-MM-DD
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) {
      throw new Error(
        `Invalid date format: "${this.date}". Expected YYYY-MM-DD.`
      );
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    // Use UTC-based Date to validate the calendar date without timezone shifting
    const utcDate = new Date(Date.UTC(year, month - 1, day));
    if (
      utcDate.getUTCFullYear() !== year ||
      utcDate.getUTCMonth() + 1 !== month ||
      utcDate.getUTCDate() !== day
    ) {
      throw new Error(`Invalid calendar date: "${this.date}".`);
    }

    // Store the validated YYYY-MM-DD string as-is
    this.date = dateStr;
  }

  // --- Time normalisation (HH:mm 24-hour format) ---
  if (this.isModified("time")) {
    const match = this.time.trim().match(
      /^(\d{1,2}):(\d{2})\s*(am|pm)?$/i
    );
    if (!match) {
      throw new Error(`Invalid time format: "${this.time}". Expected HH:mm or h:mm am/pm.`);
    }

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const meridiem = match[3]?.toLowerCase();

    // Validate minutes (always 0–59)
    if (minutes > 59) {
      throw new Error(`Time out of range: "${this.time}".`);
    }

    if (meridiem) {
      // When meridiem is present, treat input as 12-hour time: hours must be 1–12
      if (hours < 1 || hours > 12) {
        throw new Error(`Time out of range: "${this.time}".`);
      }

      // Convert 12-hour to 24-hour when am/pm is present
      if (meridiem === "pm" && hours < 12) hours += 12;
      if (meridiem === "am" && hours === 12) hours = 0;
    } else {
      // Without meridiem, treat input as 24-hour time: hours must be 0–23
      if (hours > 23) {
        throw new Error(`Time out of range: "${this.time}".`);
      }
    }
    this.time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }
});

const Event: Model<IEvent> =
  mongoose.models.Event ?? mongoose.model<IEvent>("Event", EventSchema);

export default Event;

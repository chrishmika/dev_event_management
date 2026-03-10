import Image from "next/image";
import Link from "next/link";

interface Props {
  slug: string;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
}

const EventCard = ({ title, image, slug, date, time, location, type }: Props) => {
  return (
    <Link href={`/event/${slug}`} id="event-card">
      <Image src={image} alt={title} width={410} height={300} className="poster" />

      <div className="flex flex-2 gap-2">
        <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
        <p>{location}</p>
      </div>

      <p className="title">{title}</p>

      <div className="datetime">
        <div>
          <Image src="/icons/calendar.svg" alt="calendar" width={14} height={14} />
          <p>{date}</p>
        </div>

        <div>
          <Image src="/icons/clock.svg" alt="clock" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

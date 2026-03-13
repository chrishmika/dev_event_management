import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { getSimilarEventsBySlug } from "@/lib/actions/events.actions";
import Image from "next/image";
import { notFound } from "next/navigation";

type RouteParams = {
  params: Promise<{ slug: string }>
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

const parseStringArraySafe = (value: unknown): string[] => {
  if (typeof value !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
};


const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => {

  return (
    <div className="flex items-center gap-2">

      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>

    </div>
  )

}

const EventAgenda = ({ agenda }: { agenda: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agenda.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )

}

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {
        tags.map((tag) => (
          <div key={tag} className="pill">
            {tag}
          </div>
        ))
      }
    </div>
  )
}


const EventDetailsPage = async ({ params }: RouteParams) => {
  const { slug } = await params;
  const response = await fetch(`${BASE_URL}/api/events/${slug}`)
  if (!response.ok) {
    return notFound();
  }

  const data = await response.json().catch(() => null);
  const event = data?.event;


  if (!event) return notFound();

  const bookings = 10

  const similarEvents = await getSimilarEventsBySlug(event.slug)
  const agendaItems = Array.isArray(event.agenda) && event.agenda.length > 0
    ? parseStringArraySafe(event.agenda[0])
    : [];
  const tagItems = Array.isArray(event.tags) && event.tags.length > 0
    ? parseStringArraySafe(event.tags[0])
    : [];


  return (
    <section id="event">
      <div className="header">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
      </div>

      <div className="details">

        {/* left event content*/}
        <div className="content">

          <Image
            src={event.image}
            alt={event.title}
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem icon="/icons/calendar.svg" alt="Date" label={event.date} />
            <EventDetailItem icon="/icons/clock.svg" alt="Time" label={event.time} />
            <EventDetailItem icon="/icons/pin.svg" alt="Location" label={event.location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={event.mode} />
            <EventDetailItem icon="/icons/audience.svg" alt="audience" label={event.audience} />
          </section>

          <EventAgenda agenda={agendaItems} />


          <section className="flex-col-gap-3">

            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>

          </section>

          <EventTags tags={tagItems} />
        </div>




        {/* right boking form*/}
        <aside className="booking" >

          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot
              </p>
            ) : (
              <p className="text-sm">Be the first to book your book</p>
            )}


            <BookEvent />
          </div>
        </ aside>
      </div>


      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>

        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((e) => (
            <EventCard
              key={String(e._id)}
              slug={String(e.slug)}
              title={String(e.title)}
              image={String(e.image)}
              date={String(e.date)}
              time={String(e.time)}
              location={String(e.location)}
              type={String(e.mode)}
              description={String(e.description)}
            />
          ))}
        </div>


      </div>
    </section>
  )
}

export default EventDetailsPage

import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { cacheLife } from "next/cache";
// import { events } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

type HomeEvent = {
  _id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  mode?: string;
  type?: string;
  description: string;
};

const Home = async () => {
  'use cache';
  cacheLife('hours')
  const response = await fetch(`${BASE_URL}/api/events`, {});
  const data = response.ok ? await response.json() : { events: [] };
  const events: HomeEvent[] = Array.isArray(data?.events) ? data.events : [];

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br />
        Event You Can&apos;t Miss
      </h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.length > 0 && events.map((event) => (
            <li className="list-none" key={String(event._id)}>
              <EventCard
                slug={event.slug}
                title={event.title}
                image={event.image}
                date={event.date}
                time={event.time}
                location={event.location}
                type={event.type ?? event.mode ?? "offline"}
                description={event.description}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default Home;

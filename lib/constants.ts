export type EventItem = {
  slug: string;
  title: string;
  image: string;
  date: string;
  endDate: string;
  time: string;
  location: string;
  type: string;
  description: string;
};

export const events: EventItem[] = [
  {
    slug: "google-io-2026",
    title: "Google I/O 2026",
    image: "/images/event1.png",
    date: "2026-05-13",
    endDate: "2026-05-14",
    time: "10:00 AM",
    location: "Mountain View, CA, USA",
    type: "Conference",
    description:
      "Google's annual developer conference covering Androslug, Web, AI, and Cloud updates.",
  },
  {
    slug: "build-2026",
    title: "Microsoft Build 2026",
    image: "/images/event2.png",
    date: "2026-05-19",
    endDate: "2026-05-21",
    time: "9:00 AM",
    location: "Seattle, WA, USA",
    type: "Conference",
    description:
      "A major event for developers building with Azure, GitHub, AI, and Microsoft platforms.",
  },
  {
    slug: "react-summit-2026",
    title: "React Summit 2026",
    image: "/images/event3.png",
    date: "2026-06-12",
    endDate: "2026-06-16",
    time: "9:30 AM",
    location: "Amsterdam, Netherlands",
    type: "Conference",
    description:
      "One of the most popular React-focused conferences with talks from core contributors and experts.",
  },
  {
    slug: "ethglobal-istanbul-2026",
    title: "ETHGlobal Istanbul 2026",
    image: "/images/event4.png",
    date: "2026-07-24",
    endDate: "2026-07-26",
    time: "8:00 AM",
    location: "Istanbul, Turkiye",
    type: "Hackathon",
    description:
      "A global Ethereum hackathon where teams build and demo web3 products over a weekend.",
  },
  {
    slug: "aws-reinvent-2026",
    title: "AWS re:Invent 2026",
    image: "/images/event5.png",
    date: "2026-12-01",
    endDate: "2026-12-05",
    time: "8:30 AM",
    location: "Las Vegas, NV, USA",
    type: "Conference",
    description:
      "Amazon Web Services' flagship conference featuring cloud architecture, security, and AI tracks.",
  },
  {
    slug: "def-con-34",
    title: "DEF CON 34",
    image: "/images/event6.png",
    date: "2026-08-06",
    endDate: "2026-08-09",
    time: "10:00 AM",
    location: "Las Vegas, NV, USA",
    type: "Conference",
    description:
      "A long-running cybersecurity conference with hands-on villages, CTFs, and security research talks.",
  },
  {
    slug: "berlin-js-meetup-june-2026",
    title: "Berlin JavaScript Community Meetup",
    image: "/images/event1.png",
    date: "2026-06-18",
    endDate: "2026-06-18",
    time: "6:30 PM",
    location: "Berlin, Germany",
    type: "Meetup",
    description:
      "A monthly JavaScript meetup featuring lightning talks, networking, and frontend engineering discussions.",
  },
  {
    slug: "hack-the-north-2026",
    title: "Hack the North 2026",
    image: "/images/event2.png",
    date: "2026-09-18",
    endDate: "2026-09-20",
    time: "12:00 PM",
    location: "Waterloo, ON, Canada",
    type: "Hackathon",
    description:
      "A wslugely recognized student hackathon with mentor sessions, project demos, and sponsor challenges.",
  },
];

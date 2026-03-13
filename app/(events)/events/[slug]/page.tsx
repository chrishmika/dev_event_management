import EventDetails from "@/components/EventDetails";
import { Suspense } from "react";

type RouteParams = {
  params: Promise<{ slug: string }>
}




const EventDetailsPage = async ({ params }: RouteParams) => {
  const slug = params.then((p) => p.slug);

  return <div>

    <Suspense fallback={<div>loading </div>}><EventDetails params={slug} /></Suspense>
  </div>
}

export default EventDetailsPage

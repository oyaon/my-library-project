"use client";

import EventList from "@/components/events/EventList";
import EventManagement from "@/components/events/EventManagement";

const EventsPage = () => {
  return (
    <div>
      <h1>Events</h1>
      <EventManagement />
      <EventList />
    </div>
  );
};

export default EventsPage;
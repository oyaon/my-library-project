"use client";

import EventList from "@/components/events/EventList";
import EventManagement from "@/components/events/EventManagement";
import {useAuth, UserRoles} from "@/components/auth/AuthContext";

const EventsPage = () => {
  const { user, role } = useAuth();

  // Only admins and librarians can manage events
  const canManageEvents = role === UserRoles.ADMIN || role === UserRoles.LIBRARIAN;

  return (
    <div>
      <h1>Events</h1>
      {canManageEvents && <EventManagement />}
      <EventList />
    </div>
  );
};

export default EventsPage;

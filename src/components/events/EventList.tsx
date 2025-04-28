"use client";

import { useState, useEffect } from 'react';
import type { Event } from '@/types/Event';
import { getEvents } from '@/services/eventService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton";

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true); // Set loading to true when fetching starts
      try {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setIsLoading(false); // Set loading to false when fetching completes
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? ( // Show skeleton loader while loading
          Array.from({ length: 6 }).map((_, index) => ( // Adjust the length based on your grid layout
            <Card key={`skeleton-${index}`} className="overflow-hidden">
              <Skeleton className="h-[200px] w-full object-cover rounded-md aspect-[2/1]" />
              <CardContent className="p-4">
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))
        ) : (
          events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <Image
                src={event.imageUrl}
                alt={event.name}
                width={400}
                height={200}
                className="object-cover rounded-md aspect-[2/1] hover:scale-105 transition-transform"
              />
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold">{event.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {event.date} - {event.time}
                </CardDescription>
                <p className="text-sm">{event.description}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;

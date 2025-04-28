"use client";

import { useState } from 'react';
import type { Event } from '@/types/Event';
import { createEvent, updateEvent, deleteEvent } from '@/services/eventService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

const EventManagement = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const { toast } = useToast();

  const handleCreateEvent = async () => {
    try {
      await createEvent({ name, date, time, location, description, imageUrl });
        toast({
            title: "Event Created",
            description: `Event ${name} has been created`
        })
      clearInputFields();
    } catch (error) {
      console.error("Failed to create event", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: `Failed to create event`
        })
    }
  };

  const handleUpdateEvent = async () => {
    if (!selectedEventId) {
      console.warn("No event selected for update.");
        toast({
            variant: "destructive",
            title: "Error",
            description: `No event selected for update.`
        })
      return;
    }
    try {
      await updateEvent(selectedEventId, { name, date, time, location, description, imageUrl });
        toast({
            title: "Event Updated",
            description: `Event ${name} has been updated`
        })
      clearInputFields();
      setSelectedEventId(null);
    } catch (error) {
      console.error("Failed to update event", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: `Failed to update event`
        })
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEventId) {
      console.warn("No event selected for deletion.");
        toast({
            variant: "destructive",
            title: "Error",
            description: `No event selected for deletion.`
        })
      return;
    }
    try {
      await deleteEvent(selectedEventId);
        toast({
            title: "Event Deleted",
            description: `Event has been deleted`
        })
      clearInputFields();
      setSelectedEventId(null);
    } catch (error) {
      console.error("Failed to delete event", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: `Failed to delete event`
        })
    }
  };

  const clearInputFields = () => {
    setName('');
    setDate('');
    setTime('');
    setLocation('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Event Management</h2>

      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2"
      />
      <Input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mb-2"
      />
      <Input
        type="time"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="mb-2"
      />
      <Input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="mb-2"
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-2"
      />
      <Input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="mb-4"
      />

      <div className="flex gap-2">
        <Button onClick={handleCreateEvent}>Create Event</Button>
        <Button onClick={handleUpdateEvent} disabled={!selectedEventId}>Update Event</Button>
        <Button onClick={handleDeleteEvent} disabled={!selectedEventId}>Delete Event</Button>
      </div>
    </div>
  );
};

export default EventManagement;

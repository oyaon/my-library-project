"use client";

import React, { useState } from 'react';
import { chatWithLibrary, ChatWithLibraryInput } from '@/ai/flows/library-chatbot-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from "@/components/ui/scroll-area";

const Chatbot = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = { role: 'user' as const, content: newMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      const input: ChatWithLibraryInput = {
        userMessage: newMessage,
        chatHistory: messages,
      };

      const response = await chatWithLibrary(input);

      setMessages(prevMessages => [
        ...prevMessages,
        userMessage,
        { role: 'assistant' as const, content: response.response },
      ]);
    } catch (error) {
      console.error("Error chatting with library:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        userMessage,
        { role: 'assistant' as const, content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-96 border rounded-md shadow-sm bg-muted">
      <div className="flex-grow p-4 overflow-y-auto">
        <ScrollArea className="h-[250px] w-full rounded-md border">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === 'user' ? 'bg-secondary text-secondary-foreground ml-auto w-fit' : 'bg-accent text-accent-foreground mr-auto w-fit'
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && <div className="p-3 rounded-lg bg-accent text-accent-foreground mr-auto w-fit">Loading...</div>}
        </div>
        </ScrollArea>
      </div>
      <div className="p-4 flex items-center">
        <Input
          type="text"
          placeholder="Ask me anything about the library..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          className="flex-grow mr-2"
          onKeyDown={e => e.key === 'Enter' ? handleSendMessage() : null}
        />
        <Button onClick={handleSendMessage} disabled={isLoading}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chatbot;

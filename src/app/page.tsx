"use client"

import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Calendar} from '@/components/ui/calendar';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel"
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import Autoplay from "embla-carousel-autoplay";
import {ScrollArea} from "@/components/ui/scroll-area";
import Link from "next/link";
import {Contact2, Facebook, Instagram, Twitter} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {Toaster} from "@/components/ui/toaster";
import Logout from "@/components/auth/Logout";
import {useAuth} from "@/components/auth/AuthContext";
import BookRecommendations from "@/components/recommendations/BookRecommendations";
import Chatbot from "@/components/chatbot/Chatbot";

const featuredBooks = [
  {
    title: 'The Secret Garden',
    author: 'Frances Hodgson Burnett',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    imageUrl: 'https://picsum.photos/200/301',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    imageUrl: 'https://picsum.photos/200/302',
  },
  {
    title: '1984',
    author: 'George Orwell',
    imageUrl: 'https://picsum.photos/200/303',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    imageUrl: 'https://picsum.photos/200/304',
  },
];

const events = [
  {
    name: 'Book Club Meeting',
    date: '2024-08-15',
    description: 'Discussing "The Midnight Library" by Matt Haig.',
  },
  {
    name: 'Author Talk: Sarah J. Maas',
    date: '2024-09-01',
    description: 'An evening with the bestselling fantasy author.',
  },
  {
    name: 'Children\'s Storytime',
    date: '2024-09-15',
    description: 'Fun stories and activities for kids aged 4-8.',
  },
];

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const {toast} = useToast();
  const [userDescription, setUserDescription] = useState(''); // User description state

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDescription(e.target.value);
  };

  return (
    <div className="min-h-screen bg-muted fade-in">
      <Navbar/>
      <HeroSection/>
      <AboutSection/>
      <FeaturedBooks/>
      <div className="container mx-auto px-4">
        <Input
          type="text"
          placeholder="Tell us about your reading preferences"
          value={userDescription}
          onChange={handleDescriptionChange}
          className="mb-4"
        />
        {/* Pass description to BookRecommendations component */}
        {isClient && <BookRecommendations userDescription={userDescription} />}
      </div>
       {isClient && <Chatbot />}
      <UpcomingEvents/>
      <MembershipPromo/>
      <Footer/>
      {isClient && <Toaster/>}
      {/* Next steps for advanced features:
           Book reservation system,
           Mobile app integration (Flutter),
           Usage analytics dashboard,
           Bulk import/export functionality
        */}
    </div>
  );
}

function Navbar() {
  const {user, loading} = useAuth();

  return (
    <nav className="bg-background py-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold text-primary">
          Library Hub
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-secondary transition-colors">
            Home
          </Link>
          <Link href="/search" className="hover:text-secondary transition-colors">
            Search
          </Link>
           <Link href="/books" className="hover:text-secondary transition-colors">
            Books
          </Link>
           <Link href="/loans" className="hover:text-secondary transition-colors">
            Loans
          </Link>
          <Link href="/events" className="hover:text-secondary transition-colors">
            Events
          </Link>
          {user ? (
            <Logout />
          ) : (
            <>
              <Link href="/login" className="hover:text-secondary transition-colors">
                Login
              </Link>
              <Link href="/register" className="hover:text-secondary transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      className="relative py-24 bg-cover bg-center"
      style={{backgroundImage: 'url(https://picsum.photos/1200/600)'}}
    >
      <div className="absolute inset-0 bg-background opacity-60"/>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Welcome to Library Hub
        </h1>
        <p className="text-lg text-foreground mb-8">
          Discover a world of knowledge and stories.
        </p>
        <div className="max-w-xl mx-auto">
          <Input type="text" placeholder="Search for books, authors, and more"/>
          <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/80">
            Explore Now
          </Button>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
          Our Mission and Vision
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>
                To provide access to information and resources that enrich, empower,
                and educate our community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              We strive to foster a love of reading and lifelong learning.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
              <CardDescription>
                To be a vibrant community hub that connects people with ideas,
                information, and each other.
              </CardDescription>
            </CardHeader>
            <CardContent>
              We envision a future where everyone has the opportunity to explore
              their potential through access to knowledge.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function FeaturedBooks() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
          Featured Books
        </h2>
        {isClient && (
          <Carousel
            opts={{
              loop: true,
              dragFree: true,
              slidesToScroll: "auto",
            }}
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: true,
                pauseOnHover: true,
              }),
            ]}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-1 md:-ml-4">
              {featuredBooks.map((book, index) => (
                <CarouselItem key={index} className="pl-1 md:pl-4">
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <Image
                        src={book.imageUrl}
                        alt={book.title}
                        width={200}
                        height={300}
                        className="object-cover rounded-md aspect-[2/3] hover:scale-105 transition-transform"
                      />
                      <CardContent className="p-4">
                        <CardTitle className="text-sm font-semibold">{book.title}</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">{book.author}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2"/>
            <CarouselNext className="right-2"/>
          </Carousel>
        )}
      </div>
    </section>
  );
}

function UpcomingEvents() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View events in a calendar format.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {isClient && <Calendar/>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>List of Events</CardTitle>
              <CardDescription>See a list of upcoming events.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full rounded-md border">
                <div className="p-4">
                  {events.map((event) => (
                    <div key={event.name} className="mb-4">
                      <h3 className="text-lg font-semibold text-secondary">{event.name}</h3>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                      <p className="text-sm">{event.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function MembershipPromo() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-primary mb-8">
          Unlock Exclusive Benefits with a Library Membership
        </h2>
        <p className="text-lg text-foreground mb-8">
          Enjoy unlimited access to books, events, and online resources.
        </p>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/80">
          Register Now
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background py-8 border-t">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-sm text-foreground">
          &copy; {new Date().getFullYear()} Library Hub. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/contact" className="hover:text-secondary transition-colors flex items-center space-x-2">
            <Contact2 className="h-4 w-4"/>
            <span>Contact Us</span>
          </Link>
          <a href="#" className="hover:text-secondary transition-colors">
            <Facebook className="h-5 w-5"/>
          </a>
          <a href="#" className="hover:text-secondary transition-colors">
            <Twitter className="h-5 w-5"/>
          </a>
          <a href="#" className="hover:text-secondary transition-colors">
            <Instagram className="h-5 w-5"/>
          </a>
        </div>
      </div>
    </footer>
  );
}






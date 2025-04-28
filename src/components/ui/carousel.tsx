"use client"

import * as React from "react"
// import * as CarouselPrimitive from "@radix-ui/react-carousel"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full overflow-x-auto", className)}
    {...props}
  >
    {/* Placeholder for CarouselPrimitive.Root */}
    
      {props.children}
    
  </div>
));

Carousel.displayName = "Carousel";

const CarouselViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative", className)} {...props} />
));

CarouselViewport.displayName = "CarouselViewport";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex snap-mandatory snap-x overflow-x-scroll scroll-smooth",
      className
    )}
    style={{scrollSnapType: 'x mandatory'}}
    {...props}
  />
));
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("snap-start shrink-0", className)}
    style={{scrollSnapAlign: 'start'}}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

const CarouselNext = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => (
  <Button
    variant="ghost"
    size="sm"
    className={cn(
      "absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/30 hover:bg-background/50 data-[disabled]:opacity-50 [&:not([data-disabled])]:translate-x-2",
      "right-0",
      className
    )}
    {...props}
    ref={ref}
  >
    <ChevronRight className="h-4 w-4" />
    <span className="sr-only">Next Slide</span>
  </Button>
))
CarouselNext.displayName = "CarouselNext"

const CarouselPrevious = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => (
  <Button
    variant="ghost"
    size="sm"
    className={cn(
      "absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/30 hover:bg-background/50 data-[disabled]:opacity-50 [&:not([data-disabled])]:-translate-x-2",
      "left-0",
      className
    )}
    {...props}
    ref={ref}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">Previous Slide</span>
  </Button>
))
CarouselPrevious.displayName = "CarouselPrevious"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselViewport,
}

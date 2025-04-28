"use client"

import * as React from "react"
import * as CarouselPrimitive from "@radix-ui/react-carousel"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Carousel = CarouselPrimitive.Root

const CarouselViewport = CarouselPrimitive.Viewport

const CarouselContent = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive.Content>
>(({ className, ...props }, ref) => (
  <CarouselPrimitive.Content
    ref={ref}
    className={cn(
      "flex h-full w-full overflow-hidden touch-pan-y snap-mandatory snap-x",
      className
    )}
    {...props}
  />
))
CarouselContent.displayName = CarouselPrimitive.Content.displayName

const CarouselItem = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CarouselPrimitive.Item
    ref={ref}
    className={cn("snap-start relative w-full h-full", className)}
    {...props}
  />
))
CarouselItem.displayName = CarouselPrimitive.Item.displayName

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

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  Sparkles,
  MapPin,
} from "lucide-react";

interface PhotoItem {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  aspect?: string;
}

const photos: PhotoItem[] = [
  {
    id: 1,
    title: "Image 1",
    category: "category",
    location: "Location",
    description: "This is a description.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Image 2",
    category: "category",
    location: "Location",
    description: "This is a description.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Image 3",
    category: "category",
    location: "Location",
    description: "This is a description.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Image 4",
    category: "category",
    location: "Location",
    description: "This is a description.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  },
];

export const PhotoCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Autoplay functionality with pause on hover
  useEffect(() => {
    if (!api || isPaused) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [api, isPaused]);

  const handlePrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            {/* <div className="inline-flex items-center gap-2 text-secondary font-medium tracking-wider text-sm uppercase mb-3">
              <Camera className="w-4 h-4 text-secondary" />
              <span>Life & Culture at NXDigita</span>
            </div> */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
              Gallery
            </h2>
            {/* <p className="mt-3 text-muted-foreground max-w-xl text-base sm:text-lg">
              A behind-the-scenes look at our high-energy workspaces.
            </p> */}
          </div>

          {/* Navigation Controls in Header */}
          <div className="flex items-center gap-4">
            <div className="text-sm font-mono text-muted-foreground mr-2">
              <span className="font-semibold text-foreground text-base">
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="mx-1">/</span>
              <span>{String(count || photos.length).padStart(2, "0")}</span>
            </div>

            <button
              onClick={handlePrev}
              aria-label="Previous photo"
              className="w-11 h-11 rounded-full border border-border bg-card/60 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next photo"
              className="w-11 h-11 rounded-full border border-border bg-card/60 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Component */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {photos.map((photo, index) => (
                <CarouselItem
                  key={photo.id}
                  className="pl-4 sm:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative rounded-2xl overflow-hidden bg-card border border-border/60 shadow-lg hover:shadow-2xl transition-all duration-500 h-[430px] flex flex-col justify-end"
                  >
                    {/* Photo Image with Zoom on Hover */}
                    <img
                      src={photo.image}
                      alt={photo.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 group-hover:via-black/40 transition-colors duration-500" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 hover:bg-white/30 text-xs px-2.5 py-1">
                        {photo.category}
                      </Badge>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-200 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        <MapPin className="w-3 h-3 text-secondary" />
                        {photo.location}
                      </span>
                    </div>

                    {/* Bottom Content Card */}
                    <div className="relative z-10 p-6 flex flex-col gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-1.5 text-secondary text-xs font-semibold tracking-wider uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>NXDigita Life</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {photo.title}
                      </h3>
                      <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                        {photo.description}
                      </p>
                    </div>

                    {/* Bottom Glow Line on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-secondary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;

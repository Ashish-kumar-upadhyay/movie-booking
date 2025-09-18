import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  rating: number;
  industry: "Bollywood" | "Hollywood";
}

interface MovieCarouselProps {
  movies: Movie[];
}

export function MovieCarousel({ movies }: MovieCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [movies.length, isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  if (!movies.length) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[70vh] overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentMovie.poster})` }}
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Badge
                    variant={currentMovie.industry === "Bollywood" ? "default" : "secondary"}
                    className="mb-4 bg-primary/20 backdrop-blur-sm"
                  >
                    {currentMovie.industry}
                  </Badge>
                  
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {currentMovie.title}
                  </h1>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-xl font-semibold text-white">{currentMovie.rating}</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-white">2024</span>
                  </div>
                  
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {currentMovie.description}
                  </p>
                  
                  <div className="flex space-x-4">
                    <Button size="lg" className="gradient-cinema text-white shadow-neon">
                      <Play className="w-5 h-5 mr-2 fill-current" />
                      Watch Trailer
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Book Tickets
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${
              index === currentIndex
                ? "bg-primary shadow-neon"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
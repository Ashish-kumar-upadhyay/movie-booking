import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrailerModal } from "./trailer-modal";

interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  rating: number;
  industry: "Bollywood" | "Hollywood";
  trailerId?: string;
}

interface MovieCarouselProps {
  movies: Movie[];
}

export function MovieCarousel({ movies }: MovieCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const navigate = useNavigate();

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying || isTrailerOpen) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [movies.length, isPlaying, isTrailerOpen]);

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

  const handleBookTickets = () => {
    const currentMovie = movies[currentIndex];
    navigate('/cinema-selection', { 
      state: { 
        movie: {
          id: currentMovie.id,
          title: currentMovie.title,
          description: currentMovie.description,
          poster: currentMovie.poster,
          rating: currentMovie.rating,
          industry: currentMovie.industry
        }
      }
    });
  };

  const handleWatchTrailer = () => {
    setIsPlaying(false); // Pause auto-slide when trailer opens
    setIsTrailerOpen(true);
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
          
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
          
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
                  
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent drop-shadow-2xl">
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
                  
                  <p className="text-lg text-gray-200 mb-8 leading-relaxed drop-shadow-lg">
                    {currentMovie.description}
                  </p>
                  
                  <div className="flex space-x-4">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-blue-400/30"
                      onClick={handleWatchTrailer}
                    >
                      <Play className="w-5 h-5 mr-2 fill-current" />
                      Watch Trailer
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                      onClick={handleBookTickets}
                    >
                      Book Tickets
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Enhanced Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white border border-white/20 hover:border-white/40 hover:scale-110 transition-all duration-300 shadow-2xl"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white border border-white/20 hover:border-white/40 hover:scale-110 transition-all duration-300 shadow-2xl"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
      
      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentIndex
                ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50 scale-125"
                : "bg-white/40 hover:bg-white/60 backdrop-blur-sm"
            }`}
          />
        ))}
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => {
          setIsTrailerOpen(false);
          setIsPlaying(true); // Resume auto-slide when trailer closes
        }}
        movieTitle={currentMovie.title}
        trailerId={currentMovie.trailerId || "dQw4w9WgXcQ"}
      />
    </div>
  );
}
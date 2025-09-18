import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Star, Clock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrailerModal } from "./trailer-modal";

interface MovieCardProps {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  poster: string;
  industry: "Bollywood" | "Hollywood";
  trailerId?: string;
  onBookNow?: () => void;
  index?: number;
}

export function MovieCard({
  id,
  title,
  genre,
  duration,
  rating,
  poster,
  industry,
  trailerId,
  onBookNow,
  index = 0,
}: MovieCardProps) {
  const navigate = useNavigate();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      // Default behavior - navigate to cinema selection
      navigate('/cinema-selection', {
        state: {
          movie: {
            id,
            title,
            genre,
            duration,
            rating,
            poster,
            industry,
            trailerId
          }
        }
      });
    }
  };

  const handlePlayTrailer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (trailerId) {
      setIsTrailerOpen(true);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative"
      style={{ 
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div 
        className="neumorphic-card bg-card rounded-3xl overflow-hidden transition-all duration-300"
        whileHover={{
          boxShadow: "20px 20px 40px rgb(25, 25, 25), -20px -20px 40px rgb(60, 60, 60)",
          transition: { duration: 0.3 }
        }}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          background: "#212121",
          boxShadow: "15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60)"
        }}
      >
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <motion.img
            src={poster}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-poster opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Industry Badge */}
          <Badge
            variant={industry === "Bollywood" ? "default" : "secondary"}
            className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm"
          >
            {industry}
          </Badge>
          
          {/* Rating */}
          <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-white">{rating}</span>
          </div>
          
          {/* Play Button - Appears on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={handlePlayTrailer}
                className="rounded-full w-16 h-16 gradient-cinema shadow-lg"
                disabled={!trailerId}
              >
                <Play className="w-6 h-6 text-white fill-current" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Movie Info */}
        <div className="p-4 space-y-3 bg-gradient-to-b from-transparent to-black/20">
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </span>
            <span className="text-accent font-medium">{genre}</span>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleBookNow}
              className="w-full neumorphic-button text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #ff006e 0%, #8338ec 100%)",
                boxShadow: "8px 8px 16px rgb(25, 25, 25), -8px -8px 16px rgb(60, 60, 60)"
              }}
            >
              Book Now
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Trailer Modal */}
      {trailerId && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          movieTitle={title}
          trailerId={trailerId}
        />
      )}
    </motion.div>
  );
}
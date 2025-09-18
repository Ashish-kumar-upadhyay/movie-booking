import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Star, Clock, Play, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrailerModal } from "./trailer-modal";
import { ReviewModal } from "./review-modal";
import { useAuth } from "@/hooks/useAuth";

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
  const { user } = useAuth();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

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

  const handleViewReviews = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReviewOpen(true);
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
        className="bg-card/50 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500 border border-white/10"
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.2)",
          transition: { duration: 0.3 }
        }}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
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
            className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/20 text-white/90"
          >
            {industry}
          </Badge>
          
          {/* Rating */}
          <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-md rounded-md px-2 py-1 border border-white/20">
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
                className="rounded-full w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl backdrop-blur-sm border border-blue-400/30 hover:scale-110 transition-all duration-300"
                disabled={!trailerId}
              >
                <Play className="w-6 h-6 text-white fill-current" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Movie Info */}
        <div className="p-4 space-y-3 bg-gradient-to-b from-transparent to-black/30 backdrop-blur-sm">
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors duration-300 drop-shadow-sm">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </span>
            <span className="text-accent font-medium">{genre}</span>
          </div>
          
          <div className="space-y-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm border border-blue-400/30"
              >
                Book Now
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleViewReviews}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Reviews
              </Button>
            </motion.div>
          </div>
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

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        movieId={id}
        movieTitle={title}
        moviePoster={poster}
        currentUserId={user?.id}
      />
    </motion.div>
  );
}
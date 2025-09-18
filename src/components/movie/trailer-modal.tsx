import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle: string;
  trailerId: string;
}

export function TrailerModal({ isOpen, onClose, movieTitle, trailerId }: TrailerModalProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsPlaying(false);
    onClose();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          style={{ 
            willChange: 'opacity',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl mx-4 bg-black rounded-lg overflow-hidden shadow-2xl"
            style={{ 
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/20 to-secondary/20">
              <h3 className="text-xl font-bold text-white">{movieTitle} - Trailer</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Video Container */}
            <div 
              className="relative aspect-video bg-black"
              style={{
                contain: 'layout style paint',
                isolation: 'isolate'
              }}
            >
              <iframe
                key={trailerId}
                src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`}
                title={`${movieTitle} Trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ 
                  border: 'none',
                  outline: 'none',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'auto'
                }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div className="text-sm text-white/70">
                Press ESC to close
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star, Users, Ticket } from "lucide-react";

interface ShowTime {
  id: string;
  time: string;
  format: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

interface Cinema {
  id: string;
  name: string;
  location: string;
  rating: number;
}

const showTimes: ShowTime[] = [
  { id: "1", time: "10:00 AM", format: "2D", price: 250, availableSeats: 45, totalSeats: 50 },
  { id: "2", time: "1:30 PM", format: "2D", price: 300, availableSeats: 38, totalSeats: 50 },
  { id: "3", time: "4:00 PM", format: "3D", price: 450, availableSeats: 42, totalSeats: 50 },
  { id: "4", time: "7:30 PM", format: "2D", price: 350, availableSeats: 15, totalSeats: 50 },
  { id: "5", time: "10:30 PM", format: "3D", price: 400, availableSeats: 48, totalSeats: 50 },
];

const formatPrices = {
  "2D": "₹250-350",
  "3D": "₹400-450",
  "IMAX": "₹500-600",
  "4DX": "₹600-700"
};

export default function ShowSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const movieData = location.state?.movie;
  const cinemaData = location.state?.cinema;
  const [selectedShow, setSelectedShow] = useState<string | null>(null);

  const handleShowSelect = (showId: string) => {
    setSelectedShow(showId);
  };

  const handleContinue = () => {
    if (selectedShow) {
      const show = showTimes.find(s => s.id === selectedShow);
      navigate('/seat-selection', { 
        state: { 
          movie: movieData, 
          cinema: cinemaData,
          show: show
        } 
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "text-green-500";
    if (percentage > 20) return "text-yellow-500";
    return "text-red-500";
  };

  const getAvailabilityText = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "Good availability";
    if (percentage > 20) return "Limited seats";
    return "Almost full";
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            ← Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Select <span className="bg-gradient-cinema bg-clip-text text-transparent">Show Time</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose your preferred show time for {movieData?.title}
            </p>
          </div>
        </motion.div>

        {/* Movie and Cinema Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-card/50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{movieData?.title}</h2>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{cinemaData?.name}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <span className="mr-4">{cinemaData?.location}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{cinemaData?.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrices[movieData?.industry === "Bollywood" ? "2D" : "3D"]}
                  </div>
                  <div className="text-sm text-muted-foreground">Starting from</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Show Times */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-4">Available Show Times</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {showTimes.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedShow === show.id 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleShowSelect(show.id)}
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">{show.time}</div>
                      <Badge variant="outline" className="mb-3">
                        {show.format}
                      </Badge>
                      <div className="text-lg font-semibold text-primary mb-2">
                        ₹{show.price}
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-3">
                        <Users className="w-4 h-4" />
                        <span className={getAvailabilityColor(show.availableSeats, show.totalSeats)}>
                          {show.availableSeats} seats left
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getAvailabilityText(show.availableSeats, show.totalSeats)}
                      </div>
                      
                      {selectedShow === show.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-3 p-2 bg-primary/10 rounded-lg border border-primary/20"
                        >
                          <p className="text-xs text-primary font-medium">
                            ✓ Selected Show
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedShow}
            size="lg"
            className="gradient-cinema text-white shadow-neon disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Ticket className="w-5 h-5 mr-2" />
            Continue to Seat Selection
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

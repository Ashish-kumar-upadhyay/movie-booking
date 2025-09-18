import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Wifi, Car, Coffee } from "lucide-react";

interface Cinema {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  amenities: string[];
  image: string;
}

const cinemas: Cinema[] = [
  {
    id: "1",
    name: "PVR Cinemas - Select City Walk",
    location: "Saket, New Delhi",
    distance: "2.5 km",
    rating: 4.6,
    amenities: ["IMAX", "Dolby Atmos", "Parking", "Food Court"],
    image: "/api/placeholder/300/200"
  },
  {
    id: "2", 
    name: "INOX - Nehru Place",
    location: "Nehru Place, New Delhi",
    distance: "3.2 km",
    rating: 4.4,
    amenities: ["4DX", "Dolby Vision", "Parking", "Cafe"],
    image: "/api/placeholder/300/200"
  },
  {
    id: "3",
    name: "Cinepolis - DLF Mall",
    location: "Noida, Uttar Pradesh", 
    distance: "5.8 km",
    rating: 4.5,
    amenities: ["IMAX", "VIP Lounge", "Parking", "Restaurant"],
    image: "/api/placeholder/300/200"
  },
  {
    id: "4",
    name: "Miraj Cinemas - Lajpat Nagar",
    location: "Lajpat Nagar, New Delhi",
    distance: "4.1 km", 
    rating: 4.3,
    amenities: ["Dolby Atmos", "Parking", "Food Court", "Wheelchair Access"],
    image: "/api/placeholder/300/200"
  }
];

const amenityIcons: { [key: string]: any } = {
  "IMAX": <Star className="w-4 h-4" />,
  "4DX": <Star className="w-4 h-4" />,
  "Dolby Atmos": <Star className="w-4 h-4" />,
  "Dolby Vision": <Star className="w-4 h-4" />,
  "Parking": <Car className="w-4 h-4" />,
  "Food Court": <Coffee className="w-4 h-4" />,
  "Cafe": <Coffee className="w-4 h-4" />,
  "Restaurant": <Coffee className="w-4 h-4" />,
  "VIP Lounge": <Star className="w-4 h-4" />,
  "Wheelchair Access": <Wifi className="w-4 h-4" />
};

export default function CinemaSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const movieData = location.state?.movie;
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);

  const handleCinemaSelect = (cinemaId: string) => {
    setSelectedCinema(cinemaId);
  };

  const handleContinue = () => {
    if (selectedCinema) {
      const cinema = cinemas.find(c => c.id === selectedCinema);
      navigate('/show-selection', { 
        state: { 
          movie: movieData, 
          cinema: cinema 
        } 
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              Select <span className="bg-gradient-cinema bg-clip-text text-transparent">Cinema</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose your preferred cinema for {movieData?.title}
            </p>
          </div>
        </motion.div>

        {/* Cinema Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {cinemas.map((cinema, index) => (
            <motion.div
              key={cinema.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedCinema === cinema.id 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleCinemaSelect(cinema.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{cinema.name}</CardTitle>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{cinema.location}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{cinema.distance} away</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{cinema.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {cinema.amenities.map((amenity) => (
                        <Badge
                          key={amenity}
                          variant="secondary"
                          className="flex items-center space-x-1 text-xs"
                        >
                          {amenityIcons[amenity]}
                          <span>{amenity}</span>
                        </Badge>
                      ))}
                    </div>
                    
                    {selectedCinema === cinema.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20"
                      >
                        <p className="text-sm text-primary font-medium text-center">
                          ✓ Selected Cinema
                        </p>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedCinema}
            size="lg"
            className="gradient-cinema text-white shadow-neon disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Show Selection
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

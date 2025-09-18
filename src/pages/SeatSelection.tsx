import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star, Ticket, Users, ArrowLeft, ArrowRight } from "lucide-react";

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'premium' | 'vip';
  price: number;
  isAvailable: boolean;
  isSelected: boolean;
}

interface ShowTime {
  id: string;
  time: string;
  format: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

// Generate seats for a cinema hall
const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  
  rows.forEach((row, rowIndex) => {
    const seatsInRow = rowIndex < 3 ? 8 : rowIndex < 6 ? 10 : rowIndex < 9 ? 12 : 10;
    const startSeat = rowIndex < 3 ? 1 : rowIndex < 6 ? 1 : rowIndex < 9 ? 1 : 1;
    
    for (let i = 0; i < seatsInRow; i++) {
      const seatNumber = startSeat + i;
      let type: 'standard' | 'premium' | 'vip' = 'standard';
      let price = 250;
      
      if (rowIndex < 2) {
        type = 'vip';
        price = 500;
      } else if (rowIndex < 5) {
        type = 'premium';
        price = 350;
      }
      
      // Randomly make some seats unavailable
      const isAvailable = Math.random() > 0.15;
      
      seats.push({
        id: `${row}${seatNumber}`,
        row,
        number: seatNumber,
        type,
        price,
        isAvailable,
        isSelected: false
      });
    }
  });
  
  return seats;
};

const seatTypes = {
  standard: { label: 'Standard', color: 'bg-blue-500', price: 250 },
  premium: { label: 'Premium', color: 'bg-purple-500', price: 350 },
  vip: { label: 'VIP', color: 'bg-gold-500', price: 500 }
};

export default function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const movieData = location.state?.movie;
  const cinemaData = location.state?.cinema;
  const showData = location.state?.show;
  
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setSeats(generateSeats());
  }, []);

  useEffect(() => {
    const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    setTotalPrice(total);
  }, [selectedSeats]);

  const handleSeatClick = (seat: Seat) => {
    if (!seat.isAvailable) return;

    setSeats(prevSeats => 
      prevSeats.map(s => 
        s.id === seat.id 
          ? { ...s, isSelected: !s.isSelected }
          : s
      )
    );

    setSelectedSeats(prevSelected => {
      if (seat.isSelected) {
        return prevSelected.filter(s => s.id !== seat.id);
      } else {
        return [...prevSelected, { ...seat, isSelected: true }];
      }
    });
  };

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      navigate('/booking-confirmation', {
        state: {
          movie: movieData,
          cinema: cinemaData,
          show: showData,
          seats: selectedSeats,
          totalPrice
        }
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getSeatColor = (seat: Seat) => {
    if (!seat.isAvailable) return 'bg-gray-400 cursor-not-allowed';
    if (seat.isSelected) return 'bg-primary';
    return seatTypes[seat.type].color;
  };

  const getSeatLabel = (seat: Seat) => {
    if (!seat.isAvailable) return 'X';
    return seat.number;
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
              Select <span className="bg-gradient-cinema bg-clip-text text-transparent">Seats</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose your preferred seats for {movieData?.title}
            </p>
          </div>
        </motion.div>

        {/* Movie and Show Info */}
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
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{showData?.time} - {showData?.format}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    ₹{showData?.price}
                  </div>
                  <div className="text-sm text-muted-foreground">Per ticket</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cinema Hall */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Screen</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Screen */}
                <div className="w-full h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg mb-8 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SCREEN</span>
                </div>

                {/* Seats */}
                <div className="space-y-2">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((row, rowIndex) => {
                    const rowSeats = seats.filter(seat => seat.row === row);
                    if (rowSeats.length === 0) return null;
                    
                    return (
                      <div key={row} className="flex items-center justify-center space-x-1">
                        <div className="w-8 text-center font-medium text-sm">{row}</div>
                        <div className="flex space-x-1">
                          {rowSeats.map((seat) => (
                            <motion.button
                              key={seat.id}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSeatClick(seat)}
                              className={`w-8 h-8 rounded text-xs font-medium text-white transition-all duration-200 ${getSeatColor(seat)} ${
                                seat.isAvailable ? 'hover:opacity-80' : ''
                              }`}
                              disabled={!seat.isAvailable}
                            >
                              {getSeatLabel(seat)}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  {Object.entries(seatTypes).map(([type, info]) => (
                    <div key={type} className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded ${info.color}`}></div>
                      <span className="text-sm text-muted-foreground">
                        {info.label} (₹{info.price})
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-gray-400"></div>
                    <span className="text-sm text-muted-foreground">Unavailable</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Booking Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Selected Seats</h4>
                  {selectedSeats.length > 0 ? (
                    <div className="space-y-2">
                      {selectedSeats.map((seat) => (
                        <div key={seat.id} className="flex justify-between items-center text-sm">
                          <span>{seat.row}{seat.number} ({seatTypes[seat.type].label})</span>
                          <span>₹{seat.price}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No seats selected</p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total ({selectedSeats.length} ticket{selectedSeats.length !== 1 ? 's' : ''})</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={selectedSeats.length === 0}
                  className="w-full gradient-cinema text-white shadow-neon disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

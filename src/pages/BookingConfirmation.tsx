import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin, Star, Ticket, Download, Share2 } from "lucide-react";

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'premium' | 'vip';
  price: number;
}

interface BookingData {
  movie: any;
  cinema: any;
  show: any;
  seats: Seat[];
  totalPrice: number;
}

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData: BookingData = location.state;
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmBooking = () => {
    setIsConfirmed(true);
    // Here you would typically send the booking data to your backend
    setTimeout(() => {
      navigate('/bookings');
    }, 3000);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleDownloadTicket = () => {
    // Implement ticket download functionality
    console.log('Downloading ticket...');
  };

  const handleShareBooking = () => {
    // Implement sharing functionality
    console.log('Sharing booking...');
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your tickets have been booked successfully
          </p>
          <div className="space-y-4">
            <p className="text-lg">Redirecting to your bookings...</p>
            <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
              <div className="bg-primary h-2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Booking <span className="bg-gradient-cinema bg-clip-text text-transparent">Confirmation</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Review your booking details before confirming
            </p>
          </div>
        </motion.div>

        {/* Booking Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Movie Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Ticket className="w-6 h-6 mr-2" />
                Movie Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-32 h-48 bg-gray-200 rounded-lg flex-shrink-0">
                  <img 
                    src={bookingData?.movie?.poster} 
                    alt={bookingData?.movie?.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{bookingData?.movie?.title}</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{bookingData?.cinema?.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{bookingData?.show?.time} - {bookingData?.show?.format}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      <span>{bookingData?.cinema?.rating} • {bookingData?.cinema?.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seat Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Selected Seats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bookingData?.seats?.map((seat) => (
                  <div key={seat.id} className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="font-bold text-lg">{seat.row}{seat.number}</div>
                    <div className="text-sm text-muted-foreground capitalize">{seat.type}</div>
                    <div className="text-sm font-medium">₹{seat.price}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Price Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bookingData?.seats?.map((seat) => (
                  <div key={seat.id} className="flex justify-between items-center">
                    <span>{seat.row}{seat.number} ({seat.type})</span>
                    <span>₹{seat.price}</span>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total ({bookingData?.seats?.length} ticket{bookingData?.seats?.length !== 1 ? 's' : ''})</span>
                    <span>₹{bookingData?.totalPrice}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleConfirmBooking}
              size="lg"
              className="gradient-cinema text-white shadow-neon"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Confirm Booking
            </Button>
            <Button
              variant="outline"
              onClick={handleBackToHome}
              size="lg"
            >
              Back to Home
            </Button>
          </div>

          {/* Additional Actions */}
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              variant="ghost"
              onClick={handleDownloadTicket}
              className="text-muted-foreground hover:text-foreground"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Ticket
            </Button>
            <Button
              variant="ghost"
              onClick={handleShareBooking}
              className="text-muted-foreground hover:text-foreground"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Booking
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Ticket, Download, X, Film } from "lucide-react";

// Sample booking data - in real app this would come from Supabase
const sampleBookings = [
  {
    id: "1",
    movieTitle: "Blockbuster Hero",
    theater: "CinemaMax IMAX",
    date: "Dec 25, 2024",
    time: "7:30 PM",
    seats: ["A12", "A13"],
    amount: 850,
    status: "confirmed" as const,
    poster: "/api/placeholder/300/450",
  },
  {
    id: "2", 
    movieTitle: "Shadow Guardian",
    theater: "PVR Multiplex",
    date: "Dec 28, 2024",
    time: "9:00 PM", 
    seats: ["D8", "D9", "D10"],
    amount: 1200,
    status: "confirmed" as const,
    poster: "/api/placeholder/300/450",
  },
  {
    id: "3",
    movieTitle: "Love Story",
    theater: "Star Cinema",
    date: "Dec 20, 2024",
    time: "6:00 PM",
    seats: ["B5", "B6"],
    amount: 700,
    status: "completed" as const,
    poster: "/api/placeholder/300/450",
  },
];

const upcomingBookings = sampleBookings.filter(b => b.status === "confirmed");
const pastBookings = sampleBookings.filter(b => b.status === "completed");

export default function Bookings() {
  const handleDownloadTicket = (bookingId: string) => {
    // TODO: Implement ticket download functionality
    console.log(`Download ticket for booking ${bookingId}`);
  };

  const handleCancelBooking = (bookingId: string) => {
    // TODO: Implement booking cancellation
    console.log(`Cancel booking ${bookingId}`);
  };

  const BookingCard = ({ booking, showCancelButton = false }: { 
    booking: typeof sampleBookings[0], 
    showCancelButton?: boolean 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-card transition-smooth">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Movie Poster */}
            <div className="w-24 h-36 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Film className="w-8 h-8 text-muted-foreground" />
            </div>
            
            {/* Booking Details */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {booking.movieTitle}
                  </h3>
                  <p className="text-muted-foreground flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {booking.theater}
                  </p>
                </div>
                <Badge 
                  variant={booking.status === "confirmed" ? "default" : "secondary"}
                  className={booking.status === "confirmed" ? "glow-primary" : ""}
                >
                  {booking.status === "confirmed" ? "Confirmed" : "Completed"}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {booking.date}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  {booking.time}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Ticket className="w-4 h-4 mr-1" />
                    Seats: {booking.seats.join(", ")}
                  </div>
                  <div className="text-lg font-bold text-primary">
                    ₹{booking.amount}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadTicket(booking.id)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  {showCancelButton && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-cinema bg-clip-text text-transparent">Bookings</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your movie tickets and booking history
          </p>
        </motion.div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="upcoming" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Upcoming</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center space-x-2">
              <Ticket className="w-4 h-4" />
              <span>Past</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  showCancelButton={true} 
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No upcoming bookings</h3>
                <p className="text-muted-foreground mb-6">
                  Book your next movie experience today!
                </p>
                <Button className="gradient-cinema text-white">
                  Browse Movies
                </Button>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  showCancelButton={false} 
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <Ticket className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No past bookings</h3>
                <p className="text-muted-foreground">
                  Your booking history will appear here
                </p>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
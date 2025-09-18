import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MovieCarousel } from "@/components/movie/movie-carousel";
import { MovieCard } from "@/components/movie/movie-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Ticket, Clock, Users } from "lucide-react";

// Import movie posters
import heroCinema from "@/assets/hero-cinema.jpg";
import bollywood1 from "@/assets/movie-bollywood-1.jpg";
import hollywood1 from "@/assets/movie-hollywood-1.jpg";
import bollywood2 from "@/assets/movie-bollywood-2.jpg";
import hollywood2 from "@/assets/movie-hollywood-2.jpg";

const trendingMovies = [
  {
    id: "1",
    title: "Animal Park",
    description: "The highly anticipated sequel to the blockbuster hit Animal. Ranbir Kapoor returns in this intense action thriller that explores the dark side of human nature and revenge.",
    poster: "/movie/animal.jpg",
    rating: 4.9,
    industry: "Bollywood" as const,
    trailerId: "8FkLRUJj-o0", // Animal Park trailer
  },
  {
    id: "2", 
    title: "Deadpool & Wolverine",
    description: "The Merc with a Mouth teams up with the adamantium-clawed mutant in this epic Marvel adventure. Ryan Reynolds and Hugh Jackman reunite for the ultimate buddy comedy action film.",
    poster: "/movie/Deadpool & Wolverine.jpg",
    rating: 4.8,
    industry: "Hollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Deadpool & Wolverine trailer
  },
  {
    id: "3",
    title: "Mirzapur 3",
    description: "The crime saga continues in the lawless city of Mirzapur. Pankaj Tripathi returns as Kaleen Bhaiya in this gripping tale of power, politics, and violence.",
    poster: "/movie/Mirzapur 3.jpg",
    rating: 4.7,
    industry: "Bollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Mirzapur 3 trailer
  },
];

const allMovies = [
  ...trendingMovies,
  {
    id: "4",
    title: "Jawan 2",
    description: "Shah Rukh Khan returns in this high-octane action thriller. A vigilante's quest for justice takes him on a dangerous path against corruption and crime.",
    poster: "/movie/Jawan 2.jpg",
    rating: 4.8,
    industry: "Bollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Jawan 2 trailer
  },
  {
    id: "5",
    title: "Dune: Part Two",
    description: "Timothée Chalamet returns as Paul Atreides in this epic sci-fi sequel. The battle for control of the desert planet Arrakis continues in this visually stunning masterpiece.",
    poster: "/movie/part.jpg",
    rating: 4.9,
    industry: "Hollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Dune: Part Two trailer
  },
  {
    id: "6",
    title: "Pushpa 2: The Rule",
    description: "Allu Arjun returns as Pushpa Raj in this highly anticipated sequel. The sandalwood smuggler's story continues with more action, drama, and intense sequences.",
    poster: "/movie/Pushpa 2.jpg",
    rating: 4.7,
    industry: "Bollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Pushpa 2 trailer
  },
  {
    id: "7",
    title: "Avatar: The Way of Water",
    description: "James Cameron's epic sequel takes us back to Pandora. Jake Sully and his family must fight to protect their home in this visually breathtaking underwater adventure.",
    poster: "/movie/Avatar The Way of Water.jpg",
    rating: 4.6,
    industry: "Hollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Avatar 2 trailer
  },
  {
    id: "8",
    title: "Pathaan 2",
    description: "Shah Rukh Khan and Deepika Padukone return in this high-octane spy thriller. The RAW agent's mission takes him across the globe in this action-packed sequel.",
    poster: "/movie/Pathaan 2.jpg",
    rating: 4.8,
    industry: "Bollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Pathaan 2 trailer
  },
];

const bollywoodMovies = allMovies.filter(movie => movie.industry === "Bollywood");
const hollywoodMovies = allMovies.filter(movie => movie.industry === "Hollywood");

const stats = [
  { icon: Users, label: "Happy Customers", value: "50K+" },
  { icon: Ticket, label: "Tickets Booked", value: "200K+" },
  { icon: Star, label: "Average Rating", value: "4.8" },
  { icon: Clock, label: "Years of Service", value: "10+" },
];

export default function Home() {
  const navigate = useNavigate();

  const handleBrowseMovies = () => {
    navigate('/movies');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MovieCarousel movies={trendingMovies} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-background via-card/30 to-background backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Movie-Ticket</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your trusted partner for the ultimate movie experience
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-blue-400/30 hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Now <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Showing</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Book your tickets for the latest blockbusters
            </p>
          </motion.div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all">All Movies</TabsTrigger>
              <TabsTrigger value="bollywood">Bollywood</TabsTrigger>
              <TabsTrigger value="hollywood">Hollywood</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allMovies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  genre={movie.industry === "Bollywood" ? "Action/Drama" : "Action/Sci-Fi"}
                  duration={movie.industry === "Bollywood" ? "2h 45m" : "2h 30m"}
                  rating={movie.rating}
                  poster={movie.poster}
                  industry={movie.industry}
                  trailerId={movie.trailerId}
                  index={index}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="bollywood" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bollywoodMovies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  genre="Action/Drama"
                  duration="2h 45m"
                  rating={movie.rating}
                  poster={movie.poster}
                  industry={movie.industry}
                  trailerId={movie.trailerId}
                  index={index}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="hollywood" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hollywoodMovies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  genre="Action/Sci-Fi"
                  duration="2h 30m"
                  rating={movie.rating}
                  poster={movie.poster}
                  industry={movie.industry}
                  trailerId={movie.trailerId}
                  index={index}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 backdrop-blur-xl"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Next <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Movie Experience</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of movie lovers and book your perfect seat today
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-blue-400/30"
              onClick={handleBrowseMovies}
            >
              <Ticket className="w-5 h-5 mr-2" />
              Browse All Movies
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
import { motion } from "framer-motion";
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
    title: "Blockbuster Hero",
    description: "An epic action-packed adventure that will keep you on the edge of your seat. Experience the ultimate thrill ride with stunning cinematography and heart-pounding action sequences.",
    poster: bollywood1,
    rating: 4.8,
    industry: "Bollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Rick Roll as placeholder - replace with actual trailer
  },
  {
    id: "2", 
    title: "Shadow Guardian",
    description: "A dark and gritty superhero tale that explores the depths of human nature. When the city needs a hero, shadows become the only hope for justice.",
    poster: hollywood1,
    rating: 4.6,
    industry: "Hollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Rick Roll as placeholder - replace with actual trailer
  },
  {
    id: "3",
    title: "Love Story",
    description: "A beautiful romantic journey that transcends time and tradition. Experience the magic of love in this heartwarming tale that will touch your soul.",
    poster: bollywood2,
    rating: 4.7,
    industry: "Bollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Rick Roll as placeholder - replace with actual trailer
  },
];

const allMovies = [
  ...trendingMovies,
  {
    id: "4",
    title: "Future Worlds",
    description: "Sci-fi thriller set in distant future",
    poster: hollywood2,
    rating: 4.5,
    industry: "Hollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Rick Roll as placeholder - replace with actual trailer
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

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MovieCarousel movies={trendingMovies} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-cinema bg-clip-text text-transparent">CinemaBook</span>?
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
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-cinema rounded-2xl flex items-center justify-center shadow-neon">
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
              Now <span className="bg-gradient-cinema bg-clip-text text-transparent">Showing</span>
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
                  genre="Action"
                  duration="2h 30m"
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
                  genre="Action"
                  duration="2h 30m"
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
                  genre="Action"
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
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Next <span className="bg-gradient-cinema bg-clip-text text-transparent">Movie Experience</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of movie lovers and book your perfect seat today
            </p>
            <Button size="lg" className="gradient-cinema text-white shadow-neon">
              <Ticket className="w-5 h-5 mr-2" />
              Browse All Movies
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
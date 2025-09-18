import { useState } from "react";
import { motion } from "framer-motion";
import { MovieCard } from "@/components/movie/movie-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Star } from "lucide-react";

// Import movie posters
import bollywood1 from "@/assets/movie-bollywood-1.jpg";
import hollywood1 from "@/assets/movie-hollywood-1.jpg";
import bollywood2 from "@/assets/movie-bollywood-2.jpg";
import hollywood2 from "@/assets/movie-hollywood-2.jpg";

const allMovies = [
  {
    id: "1",
    title: "Blockbuster Hero",
    genre: "Action",
    duration: "2h 45m",
    rating: 4.8,
    poster: bollywood1,
    industry: "Bollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Rick Roll as placeholder - replace with actual trailer
  },
  {
    id: "2",
    title: "Shadow Guardian", 
    genre: "Superhero",
    duration: "2h 20m",
    rating: 4.6,
    poster: hollywood1,
    industry: "Hollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Rick Roll as placeholder - replace with actual trailer
  },
  {
    id: "3",
    title: "Love Story",
    genre: "Romance",
    duration: "2h 35m", 
    rating: 4.7,
    poster: bollywood2,
    industry: "Bollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Rick Roll as placeholder - replace with actual trailer
  },
  {
    id: "4",
    title: "Future Worlds",
    genre: "Sci-Fi",
    duration: "2h 15m",
    rating: 4.5,
    poster: hollywood2,
    industry: "Hollywood" as const,
    trailerId: "dQw4w9WgXcQ", // Rick Roll as placeholder - replace with actual trailer
  },
];

const genres = ["All", "Action", "Romance", "Superhero", "Sci-Fi", "Drama", "Comedy"];

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const filteredMovies = allMovies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    const matchesIndustry = selectedIndustry === "all" || movie.industry.toLowerCase() === selectedIndustry;
    
    return matchesSearch && matchesGenre && matchesIndustry;
  });

  const bollywoodMovies = filteredMovies.filter(movie => movie.industry === "Bollywood");
  const hollywoodMovies = filteredMovies.filter(movie => movie.industry === "Hollywood");

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All <span className="bg-gradient-cinema bg-clip-text text-transparent">Movies</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover and book your favorite movies
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Genre Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant={selectedGenre === genre ? "default" : "secondary"}
                    className="cursor-pointer transition-smooth hover:bg-primary/20"
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Industry Tabs */}
          <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all">All Movies</TabsTrigger>
              <TabsTrigger value="bollywood">Bollywood</TabsTrigger>
              <TabsTrigger value="hollywood">Hollywood</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Movies Grid */}
        <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry} className="w-full">
          <TabsContent value="all">
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map((movie, index) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    genre={movie.genre}
                    duration={movie.duration}
                    rating={movie.rating}
                    poster={movie.poster}
                  industry={movie.industry}
                  trailerId={movie.trailerId}
                  index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-semibold mb-2">No movies found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="bollywood">
            {bollywoodMovies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {bollywoodMovies.map((movie, index) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    genre={movie.genre}
                    duration={movie.duration}
                    rating={movie.rating}
                    poster={movie.poster}
                  industry={movie.industry}
                  trailerId={movie.trailerId}
                  index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-xl font-semibold mb-2">No Bollywood movies found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="hollywood">
            {hollywoodMovies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {hollywoodMovies.map((movie, index) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    genre={movie.genre}
                    duration={movie.duration}
                    rating={movie.rating}
                    poster={movie.poster}
                  industry={movie.industry}
                  trailerId={movie.trailerId}
                  index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🎪</div>
                <h3 className="text-xl font-semibold mb-2">No Hollywood movies found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
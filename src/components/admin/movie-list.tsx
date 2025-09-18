import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  Star,
  Calendar,
  Users,
  DollarSign
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  industry: "Bollywood" | "Hollywood";
  status: "active" | "inactive" | "upcoming";
  releaseDate: string;
  director: string;
  bookings: number;
  revenue: string;
  poster: string;
}

// Mock data
const movies: Movie[] = [
  {
    id: "1",
    title: "Blockbuster Hero",
    genre: "Action",
    duration: "2h 30m",
    rating: 4.8,
    industry: "Bollywood",
    status: "active",
    releaseDate: "2024-01-15",
    director: "Raj Kumar",
    bookings: 156,
    revenue: "₹12,450",
    poster: "/api/placeholder/100/150"
  },
  {
    id: "2",
    title: "Shadow Guardian",
    genre: "Superhero",
    duration: "2h 20m",
    rating: 4.6,
    industry: "Hollywood",
    status: "active",
    releaseDate: "2024-01-20",
    director: "Christopher Nolan",
    bookings: 134,
    revenue: "₹10,890",
    poster: "/api/placeholder/100/150"
  },
  {
    id: "3",
    title: "Love Story",
    genre: "Romance",
    duration: "2h 15m",
    rating: 4.7,
    industry: "Bollywood",
    status: "active",
    releaseDate: "2024-02-01",
    director: "Priya Sharma",
    bookings: 98,
    revenue: "₹8,230",
    poster: "/api/placeholder/100/150"
  },
  {
    id: "4",
    title: "Future Worlds",
    genre: "Sci-Fi",
    duration: "2h 45m",
    rating: 4.5,
    industry: "Hollywood",
    status: "upcoming",
    releaseDate: "2024-03-15",
    director: "Denis Villeneuve",
    bookings: 0,
    revenue: "₹0",
    poster: "/api/placeholder/100/150"
  }
];

const statusColors = {
  active: "bg-green-500",
  inactive: "bg-red-500",
  upcoming: "bg-yellow-500"
};

const statusLabels = {
  active: "Active",
  inactive: "Inactive", 
  upcoming: "Upcoming"
};

export function MovieList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [industryFilter, setIndustryFilter] = useState<string>("all");

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || movie.status === statusFilter;
    const matchesIndustry = industryFilter === "all" || movie.industry === industryFilter;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const handleEdit = (movieId: string) => {
    console.log("Edit movie:", movieId);
  };

  const handleDelete = (movieId: string) => {
    console.log("Delete movie:", movieId);
  };

  const handleView = (movieId: string) => {
    console.log("View movie:", movieId);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="neumorphic-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search movies, directors, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="upcoming">Upcoming</option>
              </select>
              
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-md text-sm"
              >
                <option value="all">All Industries</option>
                <option value="Bollywood">Bollywood</option>
                <option value="Hollywood">Hollywood</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="neumorphic-card group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                {/* Movie Poster */}
                <div className="relative aspect-[2/3] overflow-hidden rounded-t-3xl">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge 
                      className={`${statusColors[movie.status]} text-white`}
                    >
                      {statusLabels[movie.status]}
                    </Badge>
                  </div>
                  
                  {/* Industry Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary">
                      {movie.industry}
                    </Badge>
                  </div>
                  
                  {/* Action Menu */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(movie.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(movie.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Movie
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(movie.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Movie
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Movie Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">{movie.director}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{movie.genre}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{movie.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{movie.duration}</span>
                    <span>{movie.releaseDate}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div className="text-center">
                      <div className="flex items-center justify-center text-muted-foreground mb-1">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-xs">Bookings</span>
                      </div>
                      <p className="font-semibold">{movie.bookings}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center text-muted-foreground mb-1">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span className="text-xs">Revenue</span>
                      </div>
                      <p className="font-semibold">{movie.revenue}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMovies.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No movies found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </div>
  );
}

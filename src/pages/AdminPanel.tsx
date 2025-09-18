import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Film, 
  Users, 
  BarChart3, 
  Settings, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Star,
  LogOut
} from "lucide-react";
import { AddMovieForm } from "@/components/admin/add-movie-form";
import { MovieList } from "@/components/admin/movie-list";

// Mock data for admin dashboard
const stats = [
  { label: "Total Movies", value: "24", icon: Film, change: "+3 this month" },
  { label: "Total Users", value: "1,234", icon: Users, change: "+12% from last month" },
  { label: "Bookings Today", value: "89", icon: Calendar, change: "+5% from yesterday" },
  { label: "Revenue", value: "₹45,678", icon: BarChart3, change: "+8% from last month" }
];

const recentMovies = [
  {
    id: "1",
    title: "Blockbuster Hero",
    genre: "Action",
    rating: 4.8,
    status: "active",
    bookings: 156,
    revenue: "₹12,450"
  },
  {
    id: "2", 
    title: "Shadow Guardian",
    genre: "Superhero",
    rating: 4.6,
    status: "active",
    bookings: 134,
    revenue: "₹10,890"
  },
  {
    id: "3",
    title: "Love Story",
    genre: "Romance", 
    rating: 4.7,
    status: "active",
    bookings: 98,
    revenue: "₹8,230"
  }
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    navigate('/auth');
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Admin <span className="bg-gradient-cinema bg-clip-text text-transparent">Panel</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your cinema booking system
              </p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button className="gradient-cinema text-white shadow-neon">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="neumorphic-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-green-500 mt-1">
                        {stat.change}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-cinema rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="add-movie">Add Movie</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Movies */}
                <Card className="neumorphic-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Film className="w-5 h-5 mr-2" />
                      Recent Movies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentMovies.map((movie) => (
                        <div key={movie.id} className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-cinema rounded-lg flex items-center justify-center">
                              <Film className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{movie.title}</h4>
                              <p className="text-sm text-muted-foreground">{movie.genre}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{movie.status}</Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Star className="w-4 h-4 mr-1" />
                              {movie.rating}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="neumorphic-card">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab("add-movie")}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Movie
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      View All Users
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      System Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Movies Tab */}
            <TabsContent value="movies">
              <MovieList />
            </TabsContent>

            {/* Add Movie Tab */}
            <TabsContent value="add-movie">
              <AddMovieForm />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card className="neumorphic-card">
                <CardHeader>
                  <CardTitle>Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Analytics Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Detailed analytics and reporting features will be available soon.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

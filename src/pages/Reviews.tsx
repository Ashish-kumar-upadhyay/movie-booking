import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, Edit, Trash2, Filter, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Review } from "@/types/review";
import { ReviewForm } from "@/components/movie/review-form";
import { ReviewDisplay } from "@/components/movie/review-display";

// Mock data - replace with actual API calls
const mockUserReviews: Review[] = [
  {
    id: "1",
    movieId: "1",
    userId: "user123",
    userName: "You",
    rating: 5,
    title: "Absolutely Amazing!",
    content: "This movie exceeded all my expectations. The cinematography was stunning, the acting was top-notch, and the story kept me engaged from start to finish. Highly recommend!",
    createdAt: new Date("2024-01-15"),
    helpful: 12,
    verified: true,
  },
  {
    id: "2",
    movieId: "2",
    userId: "user123",
    userName: "You",
    rating: 4,
    title: "Great movie with minor flaws",
    content: "Overall a very good movie. The plot was engaging and the characters were well-developed. However, I felt the ending was a bit rushed. Still worth watching!",
    createdAt: new Date("2024-01-10"),
    helpful: 8,
    verified: true,
  },
  {
    id: "3",
    movieId: "3",
    userId: "user123",
    userName: "You",
    rating: 3,
    title: "Decent but not exceptional",
    content: "The movie was okay. Some good moments but overall felt average. The pacing was slow in the middle section. Not bad, but not great either.",
    createdAt: new Date("2024-01-05"),
    helpful: 3,
    verified: false,
  },
];

const mockMovies = [
  { id: "1", title: "Blockbuster Hero", poster: "/movie-bollywood-1.jpg" },
  { id: "2", title: "Shadow Guardian", poster: "/movie-hollywood-1.jpg" },
  { id: "3", title: "Love Story", poster: "/movie-bollywood-2.jpg" },
  { id: "4", title: "Future Worlds", poster: "/movie-hollywood-2.jpg" },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(mockUserReviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "rating">("newest");
  const [filterBy, setFilterBy] = useState<"all" | "verified" | "unverified">("all");
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredReviews = reviews.filter((review) => {
    const movie = mockMovies.find(m => m.id === review.movieId);
    const matchesSearch = movie?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === "all" || 
                         (filterBy === "verified" && review.verified) ||
                         (filterBy === "unverified" && !review.verified);
    
    return matchesSearch && matchesFilter;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  const handleUpdateReview = async (data: any) => {
    if (!editingReview) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setReviews(prev => 
      prev.map(review => 
        review.id === editingReview.id 
          ? { ...review, ...data, updatedAt: new Date() }
          : review
      )
    );
    
    setEditingReview(null);
    setIsSubmitting(false);
  };

  const getMovieTitle = (movieId: string) => {
    return mockMovies.find(m => m.id === movieId)?.title || "Unknown Movie";
  };

  const getMoviePoster = (movieId: string) => {
    return mockMovies.find(m => m.id === movieId)?.poster || "";
  };

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
            My <span className="bg-gradient-cinema bg-clip-text text-transparent">Reviews</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage and view all your movie reviews
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
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Sort */}
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter */}
            <Select value={filterBy} onValueChange={(value: any) => setFilterBy(value)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
                <SelectItem value="unverified">Unverified Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Reviews List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {sortedReviews.length > 0 ? (
            sortedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="w-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-24 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={getMoviePoster(review.movieId)}
                            alt={getMovieTitle(review.movieId)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{getMovieTitle(review.movieId)}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditReview(review)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteReview(review.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold">{review.title}</h4>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {review.content}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Helpful: {review.helpful}</span>
                        {review.updatedAt && (
                          <span>Updated: {new Date(review.updatedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? "Try adjusting your search criteria" : "You haven't written any reviews yet"}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Edit Review Modal */}
        {editingReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <ReviewForm
                movieTitle={getMovieTitle(editingReview.movieId)}
                onSubmit={handleUpdateReview}
                isLoading={isSubmitting}
                onCancel={() => setEditingReview(null)}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

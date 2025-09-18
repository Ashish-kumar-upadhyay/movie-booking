import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MessageSquare, Plus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewForm } from "./review-form";
import { ReviewDisplay } from "./review-display";
import { Review, ReviewFormData, ReviewStats } from "@/types/review";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: string;
  movieTitle: string;
  moviePoster?: string;
  currentUserId?: string;
  onReviewSubmit?: (data: ReviewFormData) => void;
  onReviewEdit?: (review: Review) => void;
  onReviewDelete?: (reviewId: string) => void;
  onReviewHelpful?: (reviewId: string, helpful: boolean) => void;
  onReviewReport?: (reviewId: string) => void;
}

// Mock data - replace with actual API calls
const mockReviews: Review[] = [
  {
    id: "1",
    movieId: "1",
    userId: "user1",
    userName: "MovieBuff2024",
    userAvatar: "",
    rating: 5,
    title: "Absolutely Amazing!",
    content: "This movie exceeded all my expectations. The cinematography was stunning, the acting was top-notch, and the story kept me engaged from start to finish. Highly recommend!",
    createdAt: new Date("2024-01-15"),
    helpful: 12,
    verified: true,
  },
  {
    id: "2",
    movieId: "1",
    userId: "user2",
    userName: "CinemaLover",
    userAvatar: "",
    rating: 4,
    title: "Great movie with minor flaws",
    content: "Overall a very good movie. The plot was engaging and the characters were well-developed. However, I felt the ending was a bit rushed. Still worth watching!",
    createdAt: new Date("2024-01-10"),
    helpful: 8,
    verified: true,
  },
  {
    id: "3",
    movieId: "1",
    userId: "user3",
    userName: "FilmCritic",
    userAvatar: "",
    rating: 3,
    title: "Decent but not exceptional",
    content: "The movie was okay. Some good moments but overall felt average. The pacing was slow in the middle section. Not bad, but not great either.",
    createdAt: new Date("2024-01-05"),
    helpful: 3,
    verified: false,
  },
];

const mockStats: ReviewStats = {
  averageRating: 4.0,
  totalReviews: 3,
  ratingDistribution: {
    5: 1,
    4: 1,
    3: 1,
    2: 0,
    1: 0,
  },
};

export function ReviewModal({
  isOpen,
  onClose,
  movieId,
  movieTitle,
  moviePoster,
  currentUserId,
  onReviewSubmit,
  onReviewEdit,
  onReviewDelete,
  onReviewHelpful,
  onReviewReport,
}: ReviewModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("reviews");
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [stats, setStats] = useState<ReviewStats>(mockStats);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter reviews for this specific movie
  const movieReviews = reviews.filter(review => review.movieId === movieId);
  const movieStats = {
    ...stats,
    totalReviews: movieReviews.length,
    averageRating: movieReviews.length > 0 
      ? movieReviews.reduce((sum, review) => sum + review.rating, 0) / movieReviews.length 
      : 0,
  };

  // Check if current user has already reviewed this movie
  const userHasReviewed = user ? movieReviews.some(review => review.userId === user.id) : false;
  const userReview = user ? movieReviews.find(review => review.userId === user.id) : null;

  const handleReviewSubmit = async (data: ReviewFormData) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (userHasReviewed) {
      alert('You have already reviewed this movie! You can only write one review per movie.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newReview: Review = {
      id: Date.now().toString(),
      movieId,
      userId: user.id,
      userName: user.email?.split('@')[0] || "User",
      rating: data.rating,
      title: data.title,
      content: data.content,
      createdAt: new Date(),
      helpful: 0,
      verified: data.verified,
    };

    setReviews(prev => [newReview, ...prev]);
    onReviewSubmit?.(data);
    setIsSubmitting(false);
    setActiveTab("reviews");
  };

  const handleReviewEdit = (review: Review) => {
    onReviewEdit?.(review);
  };

  const handleReviewDelete = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
    onReviewDelete?.(reviewId);
  };

  const handleReviewHelpful = (reviewId: string, helpful: boolean) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: helpful ? review.helpful + 1 : Math.max(0, review.helpful - 1) }
          : review
      )
    );
    onReviewHelpful?.(reviewId, helpful);
  };

  const handleReviewReport = (reviewId: string) => {
    onReviewReport?.(reviewId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold">
            {movieTitle} - Reviews & Ratings
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="reviews" className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Reviews ({movieReviews.length})</span>
              </TabsTrigger>
              <TabsTrigger 
                value="write" 
                className="flex items-center space-x-2"
                disabled={!user || userHasReviewed}
              >
                <Plus className="w-4 h-4" />
                <span>
                  {!user ? "Login to Review" : userHasReviewed ? "Already Reviewed" : "Write Review"}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="h-full overflow-y-auto">
              <ReviewDisplay
                reviews={movieReviews}
                stats={movieStats}
                currentUserId={currentUserId}
                onHelpful={handleReviewHelpful}
                onEdit={handleReviewEdit}
                onDelete={handleReviewDelete}
                onReport={handleReviewReport}
              />
            </TabsContent>

            <TabsContent value="write" className="h-full overflow-y-auto">
              {!user ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔐</div>
                  <h3 className="text-xl font-semibold mb-2">Login Required</h3>
                  <p className="text-muted-foreground mb-6">
                    You need to be logged in to write a review for this movie.
                  </p>
                  <Button 
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login to Continue
                  </Button>
                </div>
              ) : userHasReviewed ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-semibold mb-2">Already Reviewed</h3>
                  <p className="text-muted-foreground mb-6">
                    You have already written a review for this movie. You can only write one review per movie.
                  </p>
                  {userReview && (
                    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= userReview.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(userReview.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{userReview.title}</h4>
                      <p className="text-muted-foreground">{userReview.content}</p>
                    </div>
                  )}
                </div>
              ) : (
                <ReviewForm
                  movieTitle={movieTitle}
                  onSubmit={handleReviewSubmit}
                  isLoading={isSubmitting}
                  onCancel={() => setActiveTab("reviews")}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

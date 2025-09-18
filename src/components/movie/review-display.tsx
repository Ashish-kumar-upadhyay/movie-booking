import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown, MoreHorizontal, Flag, Edit, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Review, ReviewStats } from "@/types/review";
import { formatDistanceToNow } from "date-fns";

interface ReviewDisplayProps {
  reviews: Review[];
  stats: ReviewStats;
  currentUserId?: string;
  onHelpful?: (reviewId: string, helpful: boolean) => void;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
  onReport?: (reviewId: string) => void;
}

interface ReviewItemProps {
  review: Review;
  currentUserId?: string;
  onHelpful?: (reviewId: string, helpful: boolean) => void;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
  onReport?: (reviewId: string) => void;
}

function ReviewItem({ 
  review, 
  currentUserId, 
  onHelpful, 
  onEdit, 
  onDelete, 
  onReport 
}: ReviewItemProps) {
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);

  const handleHelpful = (helpful: boolean) => {
    if (isHelpful === helpful) {
      setIsHelpful(null);
      onHelpful?.(review.id, false);
    } else {
      setIsHelpful(helpful);
      onHelpful?.(review.id, helpful);
    }
  };

  const isOwner = currentUserId === review.userId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={review.userAvatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {review.userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-base">{review.userName}</h4>
                  {review.verified && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
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
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</span>
                </div>
              </div>
            </div>

            {/* Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isOwner ? (
                  <>
                    <DropdownMenuItem onClick={() => onEdit?.(review)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Review
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete?.(review.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Review
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => onReport?.(review.id)}>
                    <Flag className="w-4 h-4 mr-2" />
                    Report Review
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-lg">{review.title}</h5>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {review.content}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleHelpful(true)}
                className={`flex items-center space-x-1 ${
                  isHelpful === true ? "text-blue-600 bg-blue-50" : "text-muted-foreground hover:text-blue-600"
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful})</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleHelpful(false)}
                className={`flex items-center space-x-1 ${
                  isHelpful === false ? "text-red-600 bg-red-50" : "text-muted-foreground hover:text-red-600"
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span>Not Helpful</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ReviewDisplay({ 
  reviews, 
  stats, 
  currentUserId, 
  onHelpful, 
  onEdit, 
  onDelete, 
  onReport 
}: ReviewDisplayProps) {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">Reviews & Ratings</h3>
              <p className="text-muted-foreground">
                {stats.totalReviews} review{stats.totalReviews !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">/ 5</span>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm font-medium w-8">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] / stats.totalReviews) * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8 text-right">
                  {stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">
          Reviews ({reviews.length})
        </h4>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              currentUserId={currentUserId}
              onHelpful={onHelpful}
              onEdit={onEdit}
              onDelete={onDelete}
              onReport={onReport}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
            <p className="text-muted-foreground">
              Be the first to share your thoughts about this movie!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

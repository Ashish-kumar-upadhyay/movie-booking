import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewFormData } from "@/types/review";

interface ReviewFormProps {
  movieTitle: string;
  onSubmit: (data: ReviewFormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function ReviewForm({ movieTitle, onSubmit, isLoading = false, onCancel }: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    title: "",
    content: "",
    verified: false,
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleInputChange = (field: keyof ReviewFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating > 0 && formData.title.trim() && formData.content.trim()) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.rating > 0 && formData.title.trim() && formData.content.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Write a Review for <span className="text-primary">{movieTitle}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Section */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Your Rating *</Label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors duration-200 ${
                        star <= (hoveredRating || formData.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </motion.button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {formData.rating > 0 && (
                    <span className="font-medium">
                      {formData.rating === 1 ? "Poor" :
                       formData.rating === 2 ? "Fair" :
                       formData.rating === 3 ? "Good" :
                       formData.rating === 4 ? "Very Good" : "Excellent"}
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Review Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Review Title *
              </Label>
              <Input
                id="title"
                placeholder="Summarize your review in a few words..."
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="text-base"
                maxLength={100}
              />
              <div className="text-right text-xs text-muted-foreground">
                {formData.title.length}/100
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-base font-semibold">
                Your Review *
              </Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts about the movie. What did you like or dislike? How was the acting, story, cinematography?"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                className="min-h-[120px] text-base resize-none"
                maxLength={1000}
              />
              <div className="text-right text-xs text-muted-foreground">
                {formData.content.length}/1000
              </div>
            </div>

            {/* Verified Purchase Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified"
                checked={formData.verified}
                onCheckedChange={(checked) => handleInputChange("verified", checked as boolean)}
              />
              <Label htmlFor="verified" className="text-sm text-muted-foreground">
                I have watched this movie
              </Label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {isLoading ? "Submitting..." : "Submit Review"}
              </Button>
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
              )}
            </div>

            {/* Form Validation Message */}
            {!isFormValid && formData.rating > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md p-3"
              >
                Please fill in all required fields to submit your review.
              </motion.div>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}







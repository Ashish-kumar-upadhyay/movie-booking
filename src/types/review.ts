export interface Review {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5 stars
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  helpful: number; // number of helpful votes
  verified: boolean; // if user has watched the movie
}

export interface ReviewFormData {
  rating: number;
  title: string;
  content: string;
  verified: boolean;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Plus, Save, Film } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MovieFormData {
  title: string;
  description: string;
  genre: string;
  duration: string;
  rating: number;
  industry: "Bollywood" | "Hollywood";
  trailerId: string;
  poster: string;
  releaseDate: string;
  director: string;
  cast: string[];
  language: string;
  ageRating: string;
}

const genres = [
  "Action", "Comedy", "Drama", "Horror", "Romance", 
  "Thriller", "Sci-Fi", "Fantasy", "Adventure", "Crime"
];

const ageRatings = ["U", "U/A", "A", "12+", "15+", "18+"];

const languages = ["Hindi", "English", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati"];

export function AddMovieForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<MovieFormData>({
    title: "",
    description: "",
    genre: "",
    duration: "",
    rating: 0,
    industry: "Bollywood",
    trailerId: "",
    poster: "",
    releaseDate: "",
    director: "",
    cast: [],
    language: "Hindi",
    ageRating: "U/A"
  });

  const [newCastMember, setNewCastMember] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof MovieFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddCastMember = () => {
    if (newCastMember.trim() && !formData.cast.includes(newCastMember.trim())) {
      setFormData(prev => ({
        ...prev,
        cast: [...prev.cast, newCastMember.trim()]
      }));
      setNewCastMember("");
    }
  };

  const handleRemoveCastMember = (member: string) => {
    setFormData(prev => ({
      ...prev,
      cast: prev.cast.filter(c => c !== member)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          poster: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Be compatible with current Supabase schema (which may not have genre/industry/rating fields)
      const { error } = await supabase.from("movies").insert({
        title: formData.title,
        // Map form genre to 'category' column used in current schema
        category: formData.genre || null,
        description: formData.description || null,
        poster_url: formData.poster || null,
      });
      if (error) throw error;
      
      toast({
        title: "Movie Added Successfully!",
        description: `${formData.title} has been added to the cinema system.`,
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        genre: "",
        duration: "",
        rating: 0,
        industry: "Bollywood",
        trailerId: "",
        poster: "",
        releaseDate: "",
        director: "",
        cast: [],
        language: "Hindi",
        ageRating: "U/A"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to add movie. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="neumorphic-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Film className="w-6 h-6 mr-2" />
              Add New Movie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Movie Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter movie title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="director">Director *</Label>
                  <Input
                    id="director"
                    value={formData.director}
                    onChange={(e) => handleInputChange("director", e.target.value)}
                    placeholder="Enter director name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter movie description"
                  rows={4}
                  required
                />
              </div>

              {/* Movie Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre *</Label>
                  <Select value={formData.genre} onValueChange={(value) => handleInputChange("genre", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    placeholder="e.g., 2h 30m"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Rating *</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => handleInputChange("rating", parseFloat(e.target.value))}
                    placeholder="4.5"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={formData.industry} onValueChange={(value: "Bollywood" | "Hollywood") => handleInputChange("industry", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bollywood">Bollywood</SelectItem>
                      <SelectItem value="Hollywood">Hollywood</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language *</Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageRating">Age Rating *</Label>
                  <Select value={formData.ageRating} onValueChange={(value) => handleInputChange("ageRating", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ageRatings.map((rating) => (
                        <SelectItem key={rating} value={rating}>
                          {rating}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="releaseDate">Release Date *</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    value={formData.releaseDate}
                    onChange={(e) => handleInputChange("releaseDate", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trailerId">YouTube Trailer ID *</Label>
                  <Input
                    id="trailerId"
                    value={formData.trailerId}
                    onChange={(e) => handleInputChange("trailerId", e.target.value)}
                    placeholder="Enter YouTube video ID"
                    required
                  />
                </div>
              </div>

              {/* Cast Members */}
              <div className="space-y-2">
                <Label>Cast Members</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newCastMember}
                    onChange={(e) => setNewCastMember(e.target.value)}
                    placeholder="Enter cast member name"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCastMember())}
                  />
                  <Button type="button" onClick={handleAddCastMember} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.cast.map((member) => (
                    <Badge key={member} variant="secondary" className="flex items-center space-x-1">
                      <span>{member}</span>
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleRemoveCastMember(member)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Poster Upload */}
              <div className="space-y-2">
                <Label>Movie Poster</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-32 h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                    {formData.poster ? (
                      <img src={formData.poster} alt="Poster preview" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">No poster</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="poster-upload"
                    />
                    <Button type="button" variant="outline" asChild>
                      <label htmlFor="poster-upload" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Poster
                      </label>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: 300x450px
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="gradient-cinema text-white shadow-neon"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Adding Movie...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Add Movie
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

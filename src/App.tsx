import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Bookings from "./pages/Bookings";
import Reviews from "./pages/Reviews";
import Auth from "./pages/Auth";
import CinemaSelection from "./pages/CinemaSelection";
import ShowSelection from "./pages/ShowSelection";
import SeatSelection from "./pages/SeatSelection";
import BookingConfirmation from "./pages/BookingConfirmation";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="min-h-screen bg-background flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/bookings" element={
                    <ProtectedRoute>
                      <Bookings />
                    </ProtectedRoute>
                  } />
                  <Route path="/reviews" element={
                    <ProtectedRoute>
                      <Reviews />
                    </ProtectedRoute>
                  } />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/cinema-selection" element={<CinemaSelection />} />
                  <Route path="/show-selection" element={<ShowSelection />} />
                  <Route path="/seat-selection" element={<SeatSelection />} />
                  <Route path="/booking-confirmation" element={
                    <ProtectedRoute>
                      <BookingConfirmation />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <AdminRoute>
                      <AdminPanel />
                    </AdminRoute>
                  } />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

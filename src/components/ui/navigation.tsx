import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film, User, Ticket, Menu, X, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: "Home", path: "/", icon: Film },
    { name: "Movies", path: "/movies", icon: Film },
    { name: "My Bookings", path: "/bookings", icon: Ticket },
  ];

  const adminItems = [
    { name: "Admin Panel", path: "/admin", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-lg border-b border-border fixed top-0 left-0 right-0 z-50 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with enhanced design */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-10 h-10 bg-gradient-cinema rounded-xl flex items-center justify-center shadow-neon group-hover:shadow-premium transition-smooth"
            >
              <Film className="w-6 h-6 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-cinema bg-clip-text text-transparent">
                CinemaBook
              </span>
              <div className="text-xs text-muted-foreground -mt-1">Premium Cinema</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    isActive(item.path)
                      ? "bg-primary/20 text-primary glow-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Admin Panel Link */}
                <Link to="/admin">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
                
                <div className="flex items-center space-x-2 px-3 py-1 bg-secondary/50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-cinema rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="gradient-cinema text-white shadow-neon hover:shadow-premium">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-smooth ${
                    isActive(item.path)
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-2 space-y-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-secondary/50 rounded-lg">
                      <div className="w-6 h-6 bg-gradient-cinema rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium truncate">{user.email}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button size="sm" className="w-full gradient-cinema text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
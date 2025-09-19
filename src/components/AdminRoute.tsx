import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem('isAdmin');
    setIsAdmin(stored === 'true');
    setChecking(false);
  }, [location.pathname]);

  if (checking || loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <ShieldAlert className="w-8 h-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  Login Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Please sign in to your account, then use Admin Access.
                </p>
                <Button 
                  className="w-full gradient-cinema text-white"
                  onClick={() => navigate('/auth')}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Go to Login
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <ShieldAlert className="w-8 h-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  Admin Access Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You must be logged in as an admin to view this page.
                </p>
                <Button 
                  className="w-full gradient-cinema text-white"
                  onClick={() => navigate('/auth')}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Go to Admin Login
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}



import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { validateEmail, validatePassword } from '@/utils/validators';
import { Loader } from '@/components/ui/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      const route = user.role === 'manager' 
        ? '/manager-review' 
        : user.role === 'hr' 
        ? '/hr-dashboard' 
        : '/dashboard';
      navigate(route);
    }
  }, [user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Login successful');
      
      // Get user role and redirect accordingly
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const route = userData.role === 'manager' 
        ? '/manager-review' 
        : userData.role === 'hr' 
        ? '/hr-dashboard' 
        : '/dashboard';
      
      navigate(route);
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 border-b border-secondary/20">
          <CardTitle className="text-2xl font-bold text-center text-foreground">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="border-input focus:border-secondary focus:ring-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="border-input focus:border-secondary focus:ring-secondary"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-secondary hover:bg-secondaryDark text-white" 
              disabled={isLoading}
            >
              {isLoading ? <Loader size={20} /> : 'Sign In'}
            </Button>
          </form>
          <div className="mt-6 space-y-3">
            <div className="text-center text-sm text-muted-foreground border-t pt-4">
              <p className="mb-2 font-medium">Demo Accounts:</p>
              <p>Manager: manager@company.com / 123456</p>
              <p>HR: hr@company.com / 123456</p>
              <p>Employee: anas@gmail.com / 123456</p>
            </div>
            <div className="text-center text-sm">
              <Link to="/signup" className="text-secondary hover:underline font-medium">
                Create an Employee Account
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

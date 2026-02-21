import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-foreground flex flex-col items-center justify-center px-4 text-center">
      <Link to="/" className="mb-12">
        <img src={logo} alt="Leaders Performance" className="h-14 w-auto" />
      </Link>

      <p className="text-lioner-gold font-medium tracking-[0.3em] uppercase text-sm mb-4">
        Page Not Found
      </p>

      <h1 className="text-7xl md:text-9xl font-bold text-primary-foreground/10 leading-none mb-2">
        404
      </h1>

      <p className="text-primary-foreground/60 text-lg max-w-md mb-10">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          asChild
          className="bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none px-8 py-3"
        >
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-primary-foreground/20 bg-transparent text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-none px-8 py-3"
        >
          <a href="javascript:history.back()">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

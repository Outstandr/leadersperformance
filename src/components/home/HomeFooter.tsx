import { Link } from "react-router-dom";

export const HomeFooter = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Leaders Performance. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

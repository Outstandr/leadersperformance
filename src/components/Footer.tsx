import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm">© {new Date().getFullYear()} Lionel Eersteling. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6">
            <Link 
              to="/terms-of-service" 
              className="text-sm hover:underline transition-all"
            >
              Terms of Service
            </Link>
            <Link 
              to="/terms-and-conditions" 
              className="text-sm hover:underline transition-all"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Schedule from "@/pages/Schedule";
import Scanner from "@/pages/Scanner";
import Analytics from "@/pages/Analytics";
import Community from "@/pages/Community";
import Learn from "@/pages/Learn";
import About from "@/pages/About";
import AuthPage from "@/pages/auth-page";
import { AuthProvider } from "@/hooks/useAuth";

function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      {user ? (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/scanner" component={Scanner} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/community" component={Community} />
          <Route path="/learn" component={Learn} />
          <Route path="/about" component={About} />
        </>
      ) : (
        <Route path="/" component={Landing} />
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <AuthProvider>
              <div>
                <Navbar />
                <Toaster />
                <Router />
              </div>
            </AuthProvider>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

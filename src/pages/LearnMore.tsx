
import { Button } from "@/components/ui/button";
import { Target, CheckCircle, Calendar, TrendingUp, Users, Zap, Shield, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const LearnMore = () => {
  const features = [
    {
      icon: <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Smart Goal Setting",
      description: "Set SMART goals with our guided process that helps you create achievable, measurable objectives."
    },
    {
      icon: <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />,
      title: "Weekly Check-ins",
      description: "Stay accountable with regular progress check-ins and mood tracking to maintain momentum."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "Progress Analytics",
      description: "Visualize your progress with detailed charts and statistics to understand your patterns."
    },
    {
      icon: <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />,
      title: "Community Support",
      description: "Connect with like-minded individuals and share your journey for added motivation."
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
      title: "Habit Tracking",
      description: "Build lasting habits with our integrated habit tracker and streak counters."
    },
    {
      icon: <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />,
      title: "Privacy First",
      description: "Your goals and progress data are completely private and secure with end-to-end encryption."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 lg:px-6 h-16 flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Target className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">GoalTracker</span>
        </Link>
        <div className="ml-auto flex items-center space-x-2">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="ghost" size="sm">Pricing</Button>
          </Link>
          <Link to="/auth">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/auth">
            <Button size="sm">Get Started</Button>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-secondary/20">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-foreground">
            Master Your Goals with
            <br />
            <span className="text-primary">GoalTracker</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            The most effective way to track, measure, and achieve your personal and professional goals. 
            Join thousands of successful goal achievers who use our proven system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto">Start Free Today</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30 dark:bg-muted/10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you stay focused, motivated, and on track to achieve your dreams.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-card/60 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border/50 hover:shadow-md transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-secondary/20 via-secondary/30 to-secondary/20 dark:from-secondary/10 dark:via-secondary/20 dark:to-secondary/10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              How GoalTracker Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to transform your ambitions into achievements
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Set Your Goals</h3>
              <p className="text-muted-foreground">
                Create clear, specific goals with deadlines and categories that matter to you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Track Progress</h3>
              <p className="text-muted-foreground">
                Check in weekly to log your progress and reflect on your journey.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Achieve Success</h3>
              <p className="text-muted-foreground">
                Celebrate milestones and build momentum toward your ultimate goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-primary/90">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Achieve Your Goals?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful goal achievers who are already using GoalTracker to transform their lives.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted/30 dark:bg-muted/10 border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Target className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">GoalTracker</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a>
            </div>
          </div>
          <div className="border-t border-border mt-6 pt-6 text-center text-muted-foreground">
            <p>© 2024 GoalTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LearnMore;

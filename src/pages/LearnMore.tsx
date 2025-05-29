
import { Button } from "@/components/ui/button";
import { Target, CheckCircle, Calendar, TrendingUp, Users, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const LearnMore = () => {
  const features = [
    {
      icon: <Target className="h-6 w-6 text-blue-600" />,
      title: "Smart Goal Setting",
      description: "Set SMART goals with our guided process that helps you create achievable, measurable objectives."
    },
    {
      icon: <Calendar className="h-6 w-6 text-green-600" />,
      title: "Weekly Check-ins",
      description: "Stay accountable with regular progress check-ins and mood tracking to maintain momentum."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      title: "Progress Analytics",
      description: "Visualize your progress with detailed charts and statistics to understand your patterns."
    },
    {
      icon: <Users className="h-6 w-6 text-orange-600" />,
      title: "Community Support",
      description: "Connect with like-minded individuals and share your journey for added motivation."
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-600" />,
      title: "Habit Tracking",
      description: "Build lasting habits with our integrated habit tracker and streak counters."
    },
    {
      icon: <Shield className="h-6 w-6 text-red-600" />,
      title: "Privacy First",
      description: "Your goals and progress data are completely private and secure with end-to-end encryption."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white border-b">
        <Link to="/" className="flex items-center space-x-2">
          <Target className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">GoalTracker</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          <Link to="/auth">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/auth">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Master Your Goals with
            <br />
            <span className="text-blue-600">GoalTracker</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            The most effective way to track, measure, and achieve your personal and professional goals. 
            Join thousands of successful goal achievers who use our proven system.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg">Start Free Today</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you stay focused, motivated, and on track to achieve your dreams.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How GoalTracker Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to transform your ambitions into achievements
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Set Your Goals</h3>
              <p className="text-gray-600">
                Create clear, specific goals with deadlines and categories that matter to you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Check in weekly to log your progress and reflect on your journey.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Achieve Success</h3>
              <p className="text-gray-600">
                Celebrate milestones and build momentum toward your ultimate goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Achieve Your Goals?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful goal achievers who are already using GoalTracker to transform their lives.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Target className="h-6 w-6" />
              <span className="text-lg font-bold">GoalTracker</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/pricing" className="hover:text-blue-400">Pricing</Link>
              <a href="#" className="hover:text-blue-400">Privacy</a>
              <a href="#" className="hover:text-blue-400">Terms</a>
              <a href="#" className="hover:text-blue-400">Support</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400">
            <p>© 2024 GoalTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LearnMore;

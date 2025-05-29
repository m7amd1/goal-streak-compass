
import { Button } from "@/components/ui/button";
import { Target, CheckCircle, Calendar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <div className="flex items-center space-x-2">
          <Target className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">GoalTracker</span>
        </div>
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Your Goals,
                  <br />
                  <span className="text-blue-600">Celebrate Your Progress</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  A simple, focused goal tracker with weekly check-ins to help you stay motivated and achieve your dreams.
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/auth">
                  <Button size="lg">Start Tracking Goals</Button>
                </Link>
                <Link to="/learn-more">
                  <Button variant="outline" size="lg">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple Goal Management
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  Set clear goals with descriptions, categories, and deadlines. Track your progress with visual indicators and stay motivated with weekly check-ins.
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="font-bold">Easy Goal Creation</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Add goals with title, description, category, and deadline in seconds.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <h3 className="font-bold">Weekly Check-ins</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Rate your progress and mood each week with optional reflection notes.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <h3 className="font-bold">Progress Tracking</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Visual progress bars and streak counters keep you motivated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              From free starter plans to premium features, we have something for everyone
            </p>
            <Link to="/pricing">
              <Button size="lg" variant="outline">
                View All Plans
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
                  Ready to Achieve Your Goals?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  Join thousands of users who are already tracking their progress and achieving their dreams.
                </p>
              </div>
              <Link to="/auth">
                <Button size="lg" variant="secondary">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-gray-500">© 2024 GoalTracker. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="/pricing" className="text-xs hover:underline underline-offset-4">
            Pricing
          </Link>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Index;

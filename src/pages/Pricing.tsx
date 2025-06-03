
import { Button } from "@/components/ui/button";
import { Check, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Pricing = () => {
  const plans = [
    {
      name: "Freemium",
      price: "Free",
      description: "2–3 goals for free, upgrade for unlimited goals",
      features: [
        "2–3 goals tracking",
        "Basic progress tracking",
        "Weekly check-ins",
        "Email support"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Subscription",
      price: "$3–$5/month",
      description: "Pro features: notes, stats, reminders",
      features: [
        "Unlimited goals",
        "Detailed notes and comments",
        "Advanced statistics",
        "Smart reminders",
        "Progress analytics",
        "Priority support"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Team Plans",
      price: "Custom pricing",
      description: "Coaches or teams track members' goals (small B2B angle)",
      features: [
        "Team dashboard",
        "Member goal tracking",
        "Coach oversight tools",
        "Team analytics",
        "Bulk goal management",
        "Dedicated support"
      ],
      buttonText: "Contact Sales",
      popular: false
    },
    {
      name: "One-time",
      price: "$15",
      description: "Lifetime unlock",
      features: [
        "Unlimited goals forever",
        "All pro features included",
        "No recurring payments",
        "Lifetime updates",
        "Premium support"
      ],
      buttonText: "Buy Lifetime",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 lg:px-6 h-16 flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Target className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">GoalTracker</span>
        </Link>
        <nav className="ml-auto flex gap-2 sm:gap-4 items-center">
          <ThemeToggle />
          <Link to="/auth">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/auth">
            <Button size="sm">Get Started</Button>
          </Link>
        </nav>
      </header>

      {/* Pricing Section */}
      <main className="py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan for your goal tracking needs
            </p>
          </div>

          <div className="grid gap-8 md:gap-6 lg:grid-cols-4 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg border bg-card p-6 shadow-sm ${
                  plan.popular ? 'border-primary shadow-lg' : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {plan.price}
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? '' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  asChild
                >
                  <Link to="/auth">{plan.buttonText}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;

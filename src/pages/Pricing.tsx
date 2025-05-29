
import { Button } from "@/components/ui/button";
import { Check, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Freemium",
      price: "Free",
      description: "5 free email generations per day, upgrade for more",
      features: [
        "5 email generations per day",
        "Basic templates",
        "Email support",
        "Limited analytics"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Subscription",
      price: "$9–$19/month",
      description: "Unlimited access, premium templates",
      features: [
        "Unlimited email generations",
        "Premium templates",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "API access"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Pay-per-credit",
      price: "1 email = 1 credit",
      description: "Pay only for what you use",
      features: [
        "No monthly commitment",
        "Credits never expire",
        "All templates included",
        "Standard support",
        "Usage analytics"
      ],
      buttonText: "Buy Credits",
      popular: false
    },
    {
      name: "Affiliate",
      price: "Earn commissions",
      description: "Recommend email tools and earn",
      features: [
        "Recommend Mailchimp",
        "Recommend Woodpecker",
        "Earn up to 30% commission",
        "Monthly payouts",
        "Marketing materials provided"
      ],
      buttonText: "Join Program",
      popular: false
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
          <Link to="/auth">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/auth">
            <Button>Get Started</Button>
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
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect plan for your email generation needs
            </p>
          </div>

          <div className="grid gap-8 md:gap-6 lg:grid-cols-4 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg border bg-white p-6 shadow-sm ${
                  plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {plan.price}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
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
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
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

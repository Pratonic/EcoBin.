import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/Footer";
import { 
  Calendar, 
  Camera, 
  Coins, 
  Leaf, 
  Users, 
  TrendingUp, 
  Recycle,
  Award,
  ChartLine,
  Heart,
  CheckCircle,
  PlayCircle,
  Download,
  Smartphone,
  Apple,
  Gamepad2,
  Lightbulb,
  Newspaper,
  HelpCircle,
  Brain,
  Target,
  Trophy,
  Medal,
  Zap,
  Palette,
  BookOpen,
  Globe,
  Sprout,
  BarChart3,
  Shield,
  Settings,
  MessageCircle,
  Star,
  ArrowRight,
  ExternalLink,
  Mail
} from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Waste Pickup",
      description: "Schedule pickups by waste type with calendar-based scheduling and real-time GPS tracking.",
      details: ["Organic waste scheduling", "Plastic & e-waste pickup", "Real-time tracking"],
      color: "text-eco-green",
      bgColor: "bg-eco-green/10"
    },
    {
      icon: Camera,
      title: "AI Waste Scanner",
      description: "Powered by Gemini AI, scan items to get disposal instructions and environmental impact insights.",
      details: ["Material type analysis", "Disposal recommendations", "Impact tracking"],
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Coins,
      title: "Recycling Rewards",
      description: "Earn EcoPoints for segregation and recycling, redeem for eco-vouchers and discounts.",
      details: ["EcoPoints system", "Eco-vouchers", "Donation credits"],
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: Recycle,
      title: "Segregation Guidance",
      description: "Interactive visual guide with barcode scanning for proper waste sorting instructions.",
      details: ["Step-by-step guides", "Barcode scanning", "Visual instructions"],
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: ChartLine,
      title: "Waste Analytics",
      description: "Visual insights on waste generated with personalized suggestions for improvement.",
      details: ["Weekly/monthly reports", "Trend analysis", "Improvement tips"],
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Report issues, join clean-up drives, and compete with community members.",
      details: ["Issue reporting", "Clean-up events", "Leaderboards"],
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Download & Register",
      description: "Download the EcoBin app and create your account. Choose your location and set up your waste preferences.",
      gradient: "from-eco-green to-blue-500"
    },
    {
      step: 2,
      title: "Sort & Schedule",
      description: "Use our AI scanner to identify waste types and follow segregation guides. Schedule pickups for different waste categories.",
      gradient: "from-blue-500 to-amber-500"
    },
    {
      step: 3,
      title: "Earn & Impact",
      description: "Earn EcoPoints for sustainable actions, track your environmental impact, and contribute to a cleaner planet.",
      gradient: "from-amber-500 to-eco-green"
    }
  ];

  const advancedFeatures = [
    {
      icon: Leaf,
      title: "Carbon Footprint Tracker",
      description: "Monitor your environmental impact and unlock Green Tier levels as you improve your sustainability metrics.",
      color: "text-eco-green"
    },
    {
      icon: Sprout,
      title: "Composting Assistant",
      description: "Get guided setup for home composting with health monitoring, moisture tips, and harvest reminders.",
      color: "text-amber-500"
    },
    {
      icon: ArrowRight,
      title: "Reuse Marketplace",
      description: "Buy, sell, and exchange reusable items to support the local circular economy and reduce waste.",
      color: "text-blue-500"
    }
  ];

  const stats = [
    { value: "50,000+", label: "Active Users", color: "text-eco-green" },
    { value: "1M+", label: "Tons Recycled", color: "text-blue-500" },
    { value: "500+", label: "Clean-up Events", color: "text-amber-500" },
    { value: "25%", label: "Carbon Reduction", color: "text-green-500" }
  ];

  const leaderboard = [
    { name: "EcoWarrior123", points: "15,420", badge: "🏆 Gold Badge", color: "from-yellow-400 to-yellow-600" },
    { name: "GreenGuardian", points: "12,850", badge: "🥈 Silver Badge", color: "from-gray-400 to-gray-600" },
    { name: "EcoChampion", points: "11,340", badge: "🥉 Bronze Badge", color: "from-orange-400 to-orange-600" }
  ];

  const educationalContent = [
    {
      icon: PlayCircle,
      title: "Educational Videos",
      description: "Watch expert-created videos on sustainability, waste management, and environmental conservation.",
      tags: ["100+ Videos", "Expert Content"],
      color: "text-blue-500"
    },
    {
      icon: HelpCircle,
      title: "AI-Powered Quizzes",
      description: "Test your knowledge with custom MCQs generated by Gemini AI based on your learning preferences.",
      hasButton: true,
      color: "text-eco-green"
    },
    {
      icon: Newspaper,
      title: "Latest Articles",
      description: "Stay updated with the latest environmental news, tips, and insights from top publications.",
      articles: [
        "Climate Change and Waste Management",
        "Circular Economy Best Practices",
        "Zero Waste Living Guide"
      ],
      color: "text-amber-500"
    }
  ];

  const challenges = [
    {
      title: "Recycle 5 Items",
      progress: 60,
      current: 3,
      target: 5,
      points: "+200 Points",
      color: "bg-eco-green"
    },
    {
      title: "No Plastic Day",
      progress: 100,
      current: 1,
      target: 1,
      points: "+150 Points",
      color: "bg-blue-500",
      completed: true
    },
    {
      title: "Compost Setup",
      progress: 25,
      current: 1,
      target: 4,
      points: "+300 Points",
      color: "bg-amber-500"
    }
  ];

  const competitions = [
    { icon: Palette, title: "Poster Making", timeLeft: "2 days left", color: "text-eco-green" },
    { icon: Lightbulb, title: "Eco Trivia", timeLeft: "5 days left", color: "text-blue-500" }
  ];

  const aboutFeatures = [
    "AI-powered waste recognition and sorting",
    "Community-driven environmental action",
    "Reward-based sustainability programs",
    "Multilingual support for global impact"
  ];

  const missionVision = [
    {
      title: "Our Mission",
      description: "To revolutionize waste management through intelligent technology, making sustainable living accessible and rewarding for everyone while building stronger, environmentally conscious communities.",
      color: "bg-eco-green/10 text-eco-green"
    },
    {
      title: "Our Vision",
      description: "A world where waste is minimized, resources are maximized, and every individual contributes to a circular economy powered by smart technology and community collaboration.",
      color: "bg-blue-500/10 text-blue-500"
    }
  ];

  const techStack = [
    { category: "AI & ML", tech: "Gemini AI, TensorFlow" },
    { category: "Mobile", tech: "React Native, Flutter" },
    { category: "Backend", tech: "Node.js, Python" },
    { category: "Cloud", tech: "Google Cloud, AWS" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-eco-green/10 via-blue-500/5 to-amber-500/10 dark:from-eco-green/20 dark:via-blue-500/10 dark:to-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Smart Waste Management with{" "}
                <span className="text-eco-green">AI-Powered</span> Solutions
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                EcoBin empowers individuals, communities, and institutions to dispose of waste smartly, 
                track eco-impact, and adopt greener habits. Join millions making a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-eco-green hover:bg-eco-dark-green text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.location.href = "/api/login"}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-eco-green text-eco-green hover:bg-eco-green hover:text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-eco-green">50k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-eco-green">1M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Waste Sorted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-eco-green">25%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Carbon Reduced</div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Hero app mockup */}
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 max-w-sm mx-auto">
                {/* App Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-6 w-6 text-eco-green" />
                    <span className="font-bold text-eco-green">EcoBin</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                      A
                    </div>
                  </div>
                </div>

                {/* Main Dashboard */}
                <div className="space-y-4">
                  {/* EcoPoints Card */}
                  <div className="bg-gradient-to-r from-eco-green to-blue-500 rounded-2xl p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm opacity-90">EcoPoints</div>
                        <div className="text-2xl font-bold">2,450</div>
                      </div>
                      <Coins className="h-8 w-8 opacity-80" />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-center">
                      <Calendar className="h-6 w-6 text-eco-green mx-auto mb-2" />
                      <div className="text-sm font-medium">Schedule Pickup</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-center">
                      <Camera className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-sm font-medium">AI Scanner</div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Recent Activity</div>
                    <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center">
                        <Recycle className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Plastic recycled</div>
                        <div className="text-xs text-gray-500">+50 EcoPoints</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-eco-green/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comprehensive <span className="text-eco-green">Waste Management</span> Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From smart scheduling to AI-powered sorting, EcoBin offers everything you need for sustainable waste management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-eco-green mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How <span className="text-eco-green">EcoBin</span> Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get started with sustainable waste management in just a few simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center group">
                <div className={`w-24 h-24 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white text-2xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Advanced <span className="text-eco-green">AI-Powered</span> Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Leverage cutting-edge technology for smarter waste management decisions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {advancedFeatures.map((feature, index) => (
                <Card key={index} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right Content - AI Dashboard Mockup */}
            <Card className="shadow-2xl">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2">AI Waste Analysis Dashboard</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Real-time insights powered by Gemini AI</p>
                </div>

                {/* Mock Chart */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Waste Categories</span>
                    <span className="text-sm text-gray-500">This Week</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Organic</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="w-3/4 h-2 bg-eco-green rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Plastic</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="w-1/2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">50%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">E-waste</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="w-1/4 h-2 bg-amber-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="bg-eco-green/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="h-5 w-5 text-eco-green" />
                    <span className="text-sm font-medium">AI Recommendations</span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Increase composting to reduce organic waste</li>
                    <li>• Consider reusable containers for plastic items</li>
                    <li>• Schedule e-waste pickup for next week</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section id="community" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Community <span className="text-eco-green">Impact</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of users making a real difference in their communities through sustainable waste management.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Community Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className={`text-center p-6 ${stat.color === 'text-eco-green' ? 'bg-eco-green/10' : stat.color === 'text-blue-500' ? 'bg-blue-500/10' : stat.color === 'text-amber-500' ? 'bg-amber-500/10' : 'bg-green-500/10'}`}>
                  <CardContent className="p-0">
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Community Features */}
            <div className="space-y-6">
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Community Reporting</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Report overflowing bins, illegal dumping, and other waste-related issues with geotagged photos.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-eco-green/10 rounded-xl flex items-center justify-center">
                      <Camera className="h-6 w-6 text-eco-green" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Photo Upload</div>
                      <div className="text-xs text-gray-500">Geotagged reporting</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Clean-up Events</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Join local community clean-up drives and environmental awareness campaigns.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Event Calendar</div>
                      <div className="text-xs text-gray-500">Upcoming drives</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-gradient-to-r from-eco-green/10 to-blue-500/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Community Leaderboard</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {leaderboard.map((user, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${user.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {index === 0 && <Trophy className="h-8 w-8 text-white" />}
                    {index === 1 && <Medal className="h-8 w-8 text-white" />}
                    {index === 2 && <Award className="h-8 w-8 text-white" />}
                  </div>
                  <div className="font-bold text-lg">{user.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{user.points} EcoPoints</div>
                  <div className="text-xs font-medium mt-1">{user.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Learn & <span className="text-eco-green">Grow</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Expand your knowledge with AI-powered educational content and interactive challenges.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Educational Content */}
            <div className="space-y-6">
              {educationalContent.map((content, index) => (
                <Card key={index} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                        <content.icon className={`h-6 w-6 ${content.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{content.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{content.description}</p>
                        
                        {content.tags && (
                          <div className="flex items-center space-x-4 text-sm">
                            {content.tags.map((tag, i) => (
                              <span key={i} className={`px-3 py-1 rounded-full ${i === 0 ? 'bg-blue-500/10 text-blue-500' : 'bg-eco-green/10 text-eco-green'}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {content.hasButton && (
                          <Button className="bg-eco-green hover:bg-eco-dark-green text-white">
                            Take Quiz
                          </Button>
                        )}
                        
                        {content.articles && (
                          <div className="space-y-2">
                            {content.articles.map((article, i) => (
                              <div key={i} className="text-sm text-gray-600 dark:text-gray-300">
                                • {article}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Eco Challenges */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Weekly Eco Challenges</h3>

                <div className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <div key={index} className={`rounded-xl p-4 ${challenge.color === 'bg-eco-green' ? 'bg-eco-green/10' : challenge.color === 'bg-blue-500' ? 'bg-blue-500/10' : 'bg-amber-500/10'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{challenge.title}</span>
                        <span className={`text-sm font-bold ${challenge.color === 'bg-eco-green' ? 'text-eco-green' : challenge.color === 'bg-blue-500' ? 'text-blue-500' : 'text-amber-500'}`}>
                          {challenge.points}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${challenge.color}`}
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {challenge.completed ? 'Challenge completed! 🎉' : `${challenge.current}/${challenge.target} items ${challenge.title.toLowerCase().includes('recycle') ? 'recycled' : 'completed'}`}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold mb-4">Activity Competitions</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {competitions.map((comp, index) => (
                      <div key={index} className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <comp.icon className={`h-8 w-8 mx-auto mb-2 ${comp.color}`} />
                        <div className="text-sm font-medium">{comp.title}</div>
                        <div className="text-xs text-gray-500">{comp.timeLeft}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About <span className="text-eco-green">EcoBin</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                EcoBin is on a mission to create a cleaner, smarter, and greener planet through innovative AI-powered waste management solutions.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Founded by a team of environmental enthusiasts and technology experts, EcoBin combines cutting-edge AI technology with practical sustainability solutions. Our platform empowers individuals, communities, and institutions to make informed decisions about waste management while building a more sustainable future.
              </p>

              <div className="space-y-4">
                {aboutFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-eco-green/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-eco-green" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Mission & Vision */}
              {missionVision.map((item, index) => (
                <Card key={index} className={item.color.split(' ')[0]}>
                  <CardContent className="p-6">
                    <h3 className={`text-xl font-bold mb-4 ${item.color.split(' ')[1]}`}>{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              ))}

              {/* Tech Stack */}
              <Card className="bg-amber-500/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-amber-500">Technology Stack</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {techStack.map((tech, index) => (
                      <div key={index}>
                        <div className="font-medium text-gray-700 dark:text-gray-300">{tech.category}</div>
                        <div className="text-gray-600 dark:text-gray-400">{tech.tech}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-eco-green to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the <span className="text-white">EcoBin</span> Movement
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Start your journey towards sustainable living today. Download EcoBin and be part of the solution for a cleaner, greener tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              className="bg-white text-eco-green hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = "/api/login"}
            >
              <Apple className="mr-2 h-5 w-5" />
              Get Started Now
            </Button>
            <Button 
              className="bg-white text-eco-green hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = "/api/login"}
            >
              <Smartphone className="mr-2 h-5 w-5" />
              Try Web Version
            </Button>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto">
            <p className="text-lg mb-4 opacity-90">Stay updated with our latest features</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 rounded-l-xl text-gray-900 border-0 focus:ring-2 focus:ring-white"
              />
              <Button className="bg-eco-dark-green hover:bg-eco-green rounded-r-xl border-0">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

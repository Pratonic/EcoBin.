import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Leaf, 
  Users, 
  Target,
  Lightbulb,
  Award,
  Globe,
  Heart,
  Code,
  Zap,
  Shield,
  Recycle,
  Brain,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  ExternalLink,
  Building,
  Calendar,
  TrendingUp
} from "lucide-react";

export default function About() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms powered by Gemini AI for intelligent waste classification and disposal recommendations."
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Connect with like-minded individuals and participate in local environmental initiatives and cleanup drives."
    },
    {
      icon: Award,
      title: "Gamified Experience",
      description: "Earn EcoPoints, unlock achievements, and compete with friends while making a positive environmental impact."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Join a worldwide movement of environmental advocates working together to create a more sustainable future."
    },
    {
      icon: Zap,
      title: "Real-Time Tracking",
      description: "Monitor your environmental impact in real-time with detailed analytics and progress tracking."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security and privacy measures."
    }
  ];

  const techStack = [
    { category: "Frontend", technologies: ["React", "TypeScript", "Tailwind CSS", "Shadcn UI"] },
    { category: "Backend", technologies: ["Node.js", "Express", "PostgreSQL", "Drizzle ORM"] },
    { category: "AI & ML", technologies: ["Gemini AI", "TensorFlow", "Computer Vision", "NLP"] },
    { category: "Cloud & DevOps", technologies: ["Google Cloud", "AWS", "Docker", "GitHub Actions"] },
    { category: "Mobile", technologies: ["React Native", "Flutter", "iOS", "Android"] },
    { category: "Analytics", technologies: ["Chart.js", "D3.js", "Analytics API", "Reporting"] }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      bio: "Leading AI researcher with 15+ years in environmental technology and machine learning.",
      avatar: "SC",
      expertise: ["AI/ML", "Environmental Science", "Product Strategy"]
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Engineering",
      bio: "Full-stack engineer passionate about building scalable solutions for environmental challenges.",
      avatar: "MR",
      expertise: ["Full-Stack Development", "Cloud Architecture", "DevOps"]
    },
    {
      name: "Prof. Elena Petrov",
      role: "Environmental Advisor",
      bio: "Environmental scientist and sustainability expert with extensive research in waste management.",
      avatar: "EP",
      expertise: ["Environmental Science", "Sustainability", "Research"]
    },
    {
      name: "James Park",
      role: "Community Manager",
      bio: "Community builder dedicated to connecting people around environmental causes and local action.",
      avatar: "JP",
      expertise: ["Community Building", "Social Impact", "Partnerships"]
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description: "EcoBin was founded with the mission to revolutionize waste management through AI technology."
    },
    {
      year: "2023",
      title: "MVP Launch",
      description: "Launched the minimum viable product with basic waste classification and tracking features."
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Integrated Gemini AI for advanced waste recognition and personalized recommendations."
    },
    {
      year: "2024",
      title: "Community Features",
      description: "Added community reporting, cleanup events, and social features to connect users."
    },
    {
      year: "2024",
      title: "50K+ Users",
      description: "Reached our first major milestone of 50,000 active users across multiple cities."
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: "Environmental Responsibility",
      description: "We're committed to protecting our planet through innovative technology and community action."
    },
    {
      icon: Heart,
      title: "Community First",
      description: "Our users and their communities are at the heart of everything we do."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible with AI and environmental technology."
    },
    {
      icon: CheckCircle,
      title: "Transparency",
      description: "We believe in open communication and transparency in all our operations and impact reporting."
    }
  ];

  const stats = [
    { value: "50,000+", label: "Active Users", icon: Users },
    { value: "1M+", label: "Tons Recycled", icon: Recycle },
    { value: "500+", label: "Partner Organizations", icon: Building },
    { value: "25%", label: "Carbon Reduction", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="h-16 w-16 text-eco-green" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="text-eco-green">EcoBin</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to create a cleaner, smarter, and greener planet through innovative 
            AI-powered waste management solutions that empower individuals and communities to make a real difference.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-eco-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-eco-green" />
                </div>
                <p className="text-3xl font-bold text-eco-green mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="bg-eco-green/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-eco-green" />
                <span className="text-eco-green">Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To revolutionize waste management through intelligent technology, making sustainable living 
                accessible and rewarding for everyone while building stronger, environmentally conscious communities. 
                We believe that every individual action counts, and together we can create massive positive change.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-6 w-6 text-blue-500" />
                <span className="text-blue-500">Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A world where waste is minimized, resources are maximized, and every individual contributes 
                to a circular economy powered by smart technology and community collaboration. We envision 
                a future where sustainable choices are easy, rewarding, and accessible to everyone.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Our Core Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-eco-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-eco-green" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">What Makes EcoBin Special</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-eco-green/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-eco-green" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-16 bg-amber-500/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-amber-500" />
              <span className="text-amber-500">Technology Stack</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((stack, index) => (
                <div key={index}>
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
                    {stack.category}
                  </h3>
                  <div className="space-y-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="mr-2 mb-2">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>



        {/* Company Timeline */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-purple-500" />
              <span>Our Journey</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-eco-green rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{milestone.year}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mb-16 bg-gradient-to-r from-eco-green/10 to-blue-500/10">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Get In Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-eco-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-eco-green" />
                </div>
                <h3 className="font-bold mb-2">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-300">hello@ecobin.com</p>
                <p className="text-gray-600 dark:text-gray-300">support@ecobin.com</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-bold mb-2">Visit Us</h3>
                <p className="text-gray-600 dark:text-gray-300">123 Green Street</p>
                <p className="text-gray-600 dark:text-gray-300">Eco City, EC 12345</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-bold mb-2">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                <p className="text-gray-600 dark:text-gray-300">Mon-Fri 9AM-6PM</p>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="text-center">
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-eco-green to-blue-500 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the EcoBin Movement</h2>
            <p className="text-xl mb-6 opacity-90">
              Together, we can create a more sustainable future for our planet. 
              Start your journey with EcoBin today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-eco-green hover:bg-gray-100"
                onClick={() => window.location.href = "/api/login"}
              >
                Get Started Now
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-eco-green"
              >
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Trophy, 
  Star, 
  Clock, 
  Target,
  CheckCircle,
  Award,
  ExternalLink,
  Play,
  Search,
  Filter,
  Lightbulb,
  Globe,
  Users,
  Calendar,
  BarChart3,
  TrendingUp,
  Leaf,
  Recycle,
  Zap,
  Heart,
  XCircle
} from "lucide-react";

export default function Learn() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quizTopic, setQuizTopic] = useState("");
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({});
  const [quizResults, setQuizResults] = useState<any>(null);

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

  const { data: learningProgress } = useQuery({
    queryKey: ["/api/user/learning-progress"],
    retry: false,
    enabled: isAuthenticated,
  });

  const generateQuizMutation = useMutation({
    mutationFn: async (data: { topic: string; difficulty: string }) => {
      const response = await apiRequest("POST", "/api/quiz/generate", data);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentQuiz(data);
      setQuizAnswers({});
      setQuizResults(null);
      toast({
        title: "Quiz Generated!",
        description: "Your personalized quiz is ready. Good luck!",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    },
  });

  const submitQuizMutation = useMutation({
    mutationFn: async (answers: {[key: number]: number}) => {
      // Calculate results locally
      const results = {
        score: 0,
        totalQuestions: currentQuiz.length,
        correct: 0,
        wrong: 0,
        details: currentQuiz.map((q: any, index: number) => ({
          question: q.question,
          selectedAnswer: answers[index],
          correctAnswer: q.correctAnswer,
          isCorrect: answers[index] === q.correctAnswer,
          explanation: q.explanation,
        })),
      };

      results.correct = results.details.filter((d: any) => d.isCorrect).length;
      results.wrong = results.totalQuestions - results.correct;
      results.score = Math.round((results.correct / results.totalQuestions) * 100);

      return results;
    },
    onSuccess: (results) => {
      setQuizResults(results);
      toast({
        title: "Quiz Completed!",
        description: `You scored ${results.score}% - ${results.correct}/${results.totalQuestions} correct!`,
      });
    },
  });

  const handleGenerateQuiz = () => {
    if (!quizTopic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic for the quiz.",
        variant: "destructive",
      });
      return;
    }
    generateQuizMutation.mutate({ topic: quizTopic, difficulty: "medium" });
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(quizAnswers).length < currentQuiz.length) {
      toast({
        title: "Error",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }
    submitQuizMutation.mutate(quizAnswers);
  };

  const realArticles = [
    {
      id: 1,
      title: "The Complete Guide to Waste Segregation",
      description: "Learn the fundamentals of proper waste segregation to maximize recycling and minimize environmental impact.",
      category: "basics",
      readTime: "8 min",
      difficulty: "Beginner",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop",
      url: "https://www.epa.gov/recycle/how-do-i-recycle-common-recyclables",
      tags: ["recycling", "basics", "environment"]
    },
    {
      id: 2,
      title: "Composting 101: Transform Your Kitchen Scraps",
      description: "Master the art of home composting and turn organic waste into nutrient-rich soil for your garden.",
      category: "composting",
      readTime: "12 min",
      difficulty: "Intermediate",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
      url: "https://www.epa.gov/recycle/composting-home",
      tags: ["composting", "organic", "garden"]
    },
    {
      id: 3,
      title: "Understanding E-Waste: The Hidden Environmental Crisis",
      description: "Explore the growing problem of electronic waste and discover responsible disposal methods.",
      category: "e-waste",
      readTime: "10 min",
      difficulty: "Intermediate",
      image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=300&h=200&fit=crop",
      url: "https://www.epa.gov/recycle/electronics-donation-and-recycling",
      tags: ["e-waste", "electronics", "recycling"]
    },
    {
      id: 4,
      title: "Plastic Pollution: Facts, Impacts, and Solutions",
      description: "Understand the scope of plastic pollution and learn practical ways to reduce plastic consumption.",
      category: "plastic",
      readTime: "15 min",
      difficulty: "Advanced",
      image: "https://images.unsplash.com/photo-1583431842791-cb5a8c063e79?w=300&h=200&fit=crop",
      url: "https://www.nationalgeographic.com/environment/article/plastic-pollution",
      tags: ["plastic", "pollution", "ocean"]
    },
    {
      id: 5,
      title: "Zero Waste Living: A Practical Guide",
      description: "Discover how to adopt a zero-waste lifestyle with actionable tips and sustainable alternatives.",
      category: "lifestyle",
      readTime: "20 min",
      difficulty: "Advanced",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop",
      url: "https://www.goingzerowaste.com/blog/what-is-zero-waste/",
      tags: ["zero-waste", "lifestyle", "sustainable"]
    },
    {
      id: 6,
      title: "Community Recycling Programs: Getting Involved",
      description: "Learn how to participate in and support local recycling initiatives in your community.",
      category: "community",
      readTime: "6 min",
      difficulty: "Beginner",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
      url: "https://www.recycleacrossamerica.org/recycling-facts",
      tags: ["community", "recycling", "local"]
    }
  ];

  const categories = [
    { value: "all", label: "All Topics", icon: "🌍" },
    { value: "basics", label: "Basics", icon: "📚" },
    { value: "composting", label: "Composting", icon: "🌱" },
    { value: "e-waste", label: "E-Waste", icon: "💻" },
    { value: "plastic", label: "Plastic", icon: "♻️" },
    { value: "lifestyle", label: "Lifestyle", icon: "🏠" },
    { value: "community", label: "Community", icon: "👥" },
  ];

  const filteredArticles = realArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('nav.learn')} & Grow
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Expand your knowledge on waste management and environmental sustainability
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-eco-green">12</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Articles Read</p>
                </div>
                <BookOpen className="h-8 w-8 text-eco-green" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-500">5</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quizzes Completed</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-500">850</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Learning Points</p>
                </div>
                <Star className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-500">3h 45m</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Time Spent</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="articles">Articles & Resources</TabsTrigger>
            <TabsTrigger value="quiz">AI Quiz Generator</TabsTrigger>
            <TabsTrigger value="challenges">Learning Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="mt-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getDifficultyColor(article.difficulty)}>
                        {article.difficulty}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {article.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => window.open(article.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="mt-6">
            <div className="max-w-4xl mx-auto">
              {!currentQuiz && !quizResults ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-6 w-6 mr-2 text-yellow-500" />
                      AI Quiz Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Generate a personalized quiz on any environmental topic using AI. 
                      Test your knowledge and learn something new!
                    </p>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="quiz-topic">Quiz Topic</Label>
                        <Input
                          id="quiz-topic"
                          placeholder="e.g., plastic recycling, composting, renewable energy..."
                          value={quizTopic}
                          onChange={(e) => setQuizTopic(e.target.value)}
                        />
                      </div>
                      <Button 
                        onClick={handleGenerateQuiz}
                        disabled={generateQuizMutation.isPending}
                        className="w-full"
                      >
                        {generateQuizMutation.isPending ? (
                          "Generating Quiz..."
                        ) : (
                          <>
                            <Lightbulb className="h-4 w-4 mr-2" />
                            Generate AI Quiz
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : currentQuiz && !quizResults ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz: {quizTopic}</CardTitle>
                    <Progress value={(Object.keys(quizAnswers).length / currentQuiz.length) * 100} className="w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {currentQuiz.map((question: any, index: number) => (
                        <div key={index} className="border-b pb-4">
                          <h3 className="font-semibold mb-3">
                            {index + 1}. {question.question}
                          </h3>
                          <div className="space-y-2">
                            {question.options.map((option: string, optionIndex: number) => (
                              <Button
                                key={optionIndex}
                                variant={quizAnswers[index] === optionIndex ? "default" : "outline"}
                                className="w-full justify-start"
                                onClick={() => setQuizAnswers(prev => ({ ...prev, [index]: optionIndex }))}
                              >
                                {String.fromCharCode(65 + optionIndex)}. {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-6">
                      <Button 
                        onClick={handleSubmitQuiz}
                        disabled={submitQuizMutation.isPending}
                        className="flex-1"
                      >
                        {submitQuizMutation.isPending ? "Submitting..." : "Submit Quiz"}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setCurrentQuiz(null);
                          setQuizAnswers({});
                          setQuizTopic("");
                        }}
                      >
                        Start Over
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : quizResults ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
                      Quiz Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-eco-green mb-2">
                        {quizResults.score}%
                      </div>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        You got {quizResults.correct} out of {quizResults.totalQuestions} questions correct!
                      </p>
                    </div>
                    <div className="space-y-4">
                      {quizResults.details.map((detail: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            {detail.isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 mr-2" />
                            )}
                            <span className="font-semibold">
                              Question {index + 1}
                            </span>
                          </div>
                          <p className="mb-2">{detail.question}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <strong>Explanation:</strong> {detail.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={() => {
                        setCurrentQuiz(null);
                        setQuizAnswers({});
                        setQuizResults(null);
                        setQuizTopic("");
                      }}
                      className="w-full mt-6"
                    >
                      Take Another Quiz
                    </Button>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Learning Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-6 w-6 mr-2 text-blue-500" />
                    Weekly Reading Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Progress</span>
                      <span className="font-semibold">3/5 articles</span>
                    </div>
                    <Progress value={60} className="w-full" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Read 2 more articles this week to complete the challenge!
                    </p>
                    <Badge variant="outline" className="w-fit">
                      50 EcoPoints Reward
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-6 w-6 mr-2 text-purple-500" />
                    Quiz Master
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Progress</span>
                      <span className="font-semibold">5/10 quizzes</span>
                    </div>
                    <Progress value={50} className="w-full" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Complete 5 more quizzes to earn the Quiz Master badge!
                    </p>
                    <Badge variant="outline" className="w-fit">
                      Quiz Master Badge
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-6 w-6 mr-2 text-red-500" />
                    Eco Explorer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Progress</span>
                      <span className="font-semibold">4/6 topics</span>
                    </div>
                    <Progress value={67} className="w-full" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Learn about 2 more topics to become an Eco Explorer!
                    </p>
                    <Badge variant="outline" className="w-fit">
                      Eco Explorer Title
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
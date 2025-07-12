import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Coins, 
  Calendar, 
  Camera, 
  TrendingUp, 
  Recycle, 
  Leaf,
  Users,
  Award,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Zap
} from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

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

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["/api/analytics"],
    retry: false,
    enabled: isAuthenticated,
  });

  const { data: pickupSchedules, isLoading: schedulesLoading } = useQuery({
    queryKey: ["/api/pickup-schedules"],
    retry: false,
    enabled: isAuthenticated,
  });

  const { data: challenges, isLoading: challengesLoading } = useQuery({
    queryKey: ["/api/challenges"],
    retry: false,
    enabled: isAuthenticated,
  });

  const { data: challengeProgress, isLoading: progressLoading } = useQuery({
    queryKey: ["/api/challenges/progress"],
    retry: false,
    enabled: isAuthenticated,
  });

  const { data: communityReports, isLoading: reportsLoading } = useQuery({
    queryKey: ["/api/community-reports"],
    retry: false,
    enabled: isAuthenticated,
  });

  if (isLoading || analyticsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
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

  const upcomingPickups = pickupSchedules?.filter((schedule: any) => 
    schedule.status === 'scheduled' && new Date(schedule.scheduledDate) > new Date()
  ).slice(0, 3) || [];

  const activeChallenges = challenges?.slice(0, 3) || [];
  const recentReports = communityReports?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.firstName || user?.email?.split('@')[0] || 'EcoWarrior'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your environmental impact dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-eco-green to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">EcoPoints</p>
                  <p className="text-3xl font-bold">{user?.ecoPoints || 0}</p>
                </div>
                <Coins className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Waste Entries</p>
                  <p className="text-3xl font-bold">{analytics?.totalWasteEntries || 0}</p>
                </div>
                <Recycle className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Green Tier</p>
                  <p className="text-3xl font-bold">{user?.greenTier || 'Bronze'}</p>
                </div>
                <Award className="h-8 w-8 text-amber-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Carbon Saved</p>
                  <p className="text-3xl font-bold">{analytics?.carbonFootprint || 0}<span className="text-lg">kg</span></p>
                </div>
                <Leaf className="h-8 w-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-eco-green" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Link href="/schedule">
                  <Button className="w-full bg-eco-green hover:bg-eco-dark-green h-16 flex-col space-y-2">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">Schedule Pickup</span>
                  </Button>
                </Link>
                <Link href="/scanner">
                  <Button variant="outline" className="w-full h-16 flex-col space-y-2">
                    <Camera className="h-6 w-6" />
                    <span className="text-sm">AI Scanner</span>
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button variant="outline" className="w-full h-16 flex-col space-y-2">
                    <BarChart3 className="h-6 w-6" />
                    <span className="text-sm">View Analytics</span>
                  </Button>
                </Link>
                <Link href="/community">
                  <Button variant="outline" className="w-full h-16 flex-col space-y-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Community</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Waste Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <span>Waste Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analytics?.wasteByType && Object.keys(analytics.wasteByType).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(analytics.wasteByType).map(([type, amount]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{type}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div 
                            className="h-2 bg-eco-green rounded-full"
                            style={{ width: `${Math.min((amount as number) / 10 * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{amount}kg</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Recycle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No waste data available yet</p>
                  <p className="text-sm">Start tracking your waste to see insights</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Pickups */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-eco-green" />
              <span>Upcoming Pickups</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingPickups.length > 0 ? (
              <div className="space-y-4">
                {upcomingPickups.map((pickup: any) => (
                  <div key={pickup.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-eco-green/10 rounded-full flex items-center justify-center">
                        <Recycle className="h-6 w-6 text-eco-green" />
                      </div>
                      <div>
                        <p className="font-medium capitalize">{pickup.wasteType} Pickup</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {new Date(pickup.scheduledDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="capitalize">
                        {pickup.status}
                      </Badge>
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No upcoming pickups scheduled</p>
                <Link href="/schedule">
                  <Button className="mt-4 bg-eco-green hover:bg-eco-dark-green">
                    Schedule Pickup
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-amber-500" />
                <span>Active Challenges</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeChallenges.length > 0 ? (
                <div className="space-y-4">
                  {activeChallenges.map((challenge: any) => (
                    <div key={challenge.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{challenge.title}</span>
                        <Badge className="bg-eco-green text-white">
                          +{challenge.ecoPointsReward} Points
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {challenge.description}
                      </p>
                      <Progress value={50} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        Ends {new Date(challenge.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No active challenges</p>
                  <p className="text-sm">Check back later for new challenges</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Recent Community Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentReports.length > 0 ? (
                <div className="space-y-4">
                  {recentReports.map((report: any) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium text-sm capitalize">{report.reportType.replace('_', ' ')}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={report.status === 'resolved' ? 'default' : 'secondary'}
                        className={report.status === 'resolved' ? 'bg-green-500' : ''}
                      >
                        {report.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent community reports</p>
                  <Link href="/community">
                    <Button variant="outline" className="mt-4">
                      View Community
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

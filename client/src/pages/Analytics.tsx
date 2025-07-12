import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Leaf, 
  Recycle,
  Award,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Coins,
  Activity
} from "lucide-react";

export default function Analytics() {
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

  const { data: wasteEntries, isLoading: entriesLoading } = useQuery({
    queryKey: ["/api/waste-entries"],
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

  const getWasteTypeColor = (type: string) => {
    const colors = {
      organic: 'bg-green-500',
      plastic: 'bg-blue-500',
      paper: 'bg-yellow-500',
      glass: 'bg-cyan-500',
      metal: 'bg-gray-500',
      'e-waste': 'bg-purple-500',
      hazardous: 'bg-red-500',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  const getWasteTypeIcon = (type: string) => {
    const icons = {
      organic: '🌱',
      plastic: '♻️',
      paper: '📄',
      glass: '🥤',
      metal: '🥫',
      'e-waste': '💻',
      hazardous: '☢️',
    };
    return icons[type as keyof typeof icons] || '📦';
  };

  const calculateTotalWaste = () => {
    if (!analytics?.wasteByType) return 0;
    return Object.values(analytics.wasteByType).reduce((sum, amount) => sum + (amount as number), 0);
  };

  const calculateMonthlyTrend = () => {
    if (!wasteEntries || wasteEntries.length === 0) return 0;
    
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth - 1;
    
    const currentMonthEntries = wasteEntries.filter((entry: any) => 
      new Date(entry.createdAt).getMonth() === currentMonth
    );
    
    const lastMonthEntries = wasteEntries.filter((entry: any) => 
      new Date(entry.createdAt).getMonth() === lastMonth
    );
    
    const currentTotal = currentMonthEntries.reduce((sum: number, entry: any) => sum + parseFloat(entry.quantity), 0);
    const lastTotal = lastMonthEntries.reduce((sum: number, entry: any) => sum + parseFloat(entry.quantity), 0);
    
    if (lastTotal === 0) return 0;
    return ((currentTotal - lastTotal) / lastTotal) * 100;
  };

  const getRecentEntries = () => {
    if (!wasteEntries) return [];
    return wasteEntries.slice(0, 5);
  };

  const monthlyTrend = calculateMonthlyTrend();
  const totalWaste = calculateTotalWaste();
  const recentEntries = getRecentEntries();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Waste Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your environmental impact and waste management progress
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-eco-green to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total EcoPoints</p>
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
                  <p className="text-blue-100 text-sm font-medium">Total Waste</p>
                  <p className="text-3xl font-bold">{totalWaste.toFixed(1)}<span className="text-lg">kg</span></p>
                </div>
                <Recycle className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Carbon Footprint</p>
                  <p className="text-3xl font-bold">{analytics?.carbonFootprint || 0}<span className="text-lg">kg CO₂</span></p>
                </div>
                <Leaf className="h-8 w-8 text-purple-100" />
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
        </div>

        {/* Main Analytics Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Waste Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-eco-green" />
                <span>Waste Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analytics?.wasteByType && Object.keys(analytics.wasteByType).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(analytics.wasteByType).map(([type, amount]) => {
                    const percentage = totalWaste > 0 ? ((amount as number) / totalWaste) * 100 : 0;
                    return (
                      <div key={type} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getWasteTypeIcon(type)}</span>
                            <span className="font-medium capitalize">{type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {(amount as number).toFixed(1)}kg
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {percentage.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2">
                          <div 
                            className={`h-full rounded-full transition-all ${getWasteTypeColor(type)}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </Progress>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No waste data available yet</p>
                  <p className="text-sm">Start tracking your waste to see breakdown</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <span>Monthly Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">This Month</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {analytics?.totalWasteEntries || 0} entries
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {monthlyTrend > 0 ? (
                      <TrendingUp className="h-5 w-5 text-red-500" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-green-500" />
                    )}
                    <span className={`text-sm font-medium ${monthlyTrend > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {Math.abs(monthlyTrend).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Target className="h-6 w-6 text-eco-green mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Weekly Goal</p>
                    <p className="font-bold text-eco-green">5.0 kg</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Activity className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Avg/Entry</p>
                    <p className="font-bold text-blue-500">
                      {totalWaste && analytics?.totalWasteEntries 
                        ? (totalWaste / analytics.totalWasteEntries).toFixed(1) 
                        : 0}kg
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Progress to Goal</span>
                    <span className="font-medium">
                      {totalWaste.toFixed(1)}kg / 20.0kg
                    </span>
                  </div>
                  <Progress value={Math.min((totalWaste / 20) * 100, 100)} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Entries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <span>Recent Entries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentEntries.length > 0 ? (
              <div className="space-y-4">
                {recentEntries.map((entry: any, index: number) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-eco-green/10 rounded-full flex items-center justify-center">
                        <span className="text-lg">{getWasteTypeIcon(entry.wasteType)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                          {entry.wasteType}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {entry.quantity} {entry.unit}
                      </p>
                      <Badge className="bg-eco-green/10 text-eco-green">
                        +{entry.ecoPointsEarned} points
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No entries recorded yet</p>
                <p className="text-sm">Start using the scanner to track your waste</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-eco-green" />
              <span>Environmental Impact</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-eco-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-eco-green" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">CO₂ Saved</p>
                <p className="text-2xl font-bold text-eco-green">
                  {(analytics?.carbonFootprint || 0)} kg
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Items Recycled</p>
                <p className="text-2xl font-bold text-blue-500">
                  {analytics?.totalWasteEntries || 0}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-500" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Impact Score</p>
                <p className="text-2xl font-bold text-purple-500">
                  {Math.round((user?.ecoPoints || 0) / 10)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

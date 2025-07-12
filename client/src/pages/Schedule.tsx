import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Truck, 
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Recycle,
  Trash2
} from "lucide-react";

const scheduleSchema = z.object({
  wasteType: z.string().min(1, "Please select a waste type"),
  scheduledDate: z.date({
    required_error: "Please select a pickup date",
  }),
  address: z.string().min(5, "Address must be at least 5 characters"),
  specialInstructions: z.string().optional(),
  estimatedQuantity: z.string().min(1, "Please enter estimated quantity"),
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

export default function Schedule() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

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

  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      wasteType: "",
      address: "",
      specialInstructions: "",
      estimatedQuantity: "",
    },
  });

  const { data: schedules, isLoading: schedulesLoading } = useQuery({
    queryKey: ["/api/pickup-schedules"],
    retry: false,
    enabled: isAuthenticated,
  });

  const scheduleMutation = useMutation({
    mutationFn: async (data: ScheduleFormData) => {
      const response = await apiRequest("POST", "/api/pickup-schedules", {
        ...data,
        scheduledDate: data.scheduledDate.toISOString(),
        estimatedQuantity: data.estimatedQuantity.toString(),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pickup-schedules"] });
      toast({
        title: "Success",
        description: "Pickup scheduled successfully!",
      });
      setShowForm(false);
      form.reset();
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
        description: "Failed to schedule pickup. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ScheduleFormData) => {
    scheduleMutation.mutate(data);
  };

  if (isLoading || schedulesLoading) {
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

  const wasteTypes = [
    { value: "organic", label: "Organic", icon: "🌱" },
    { value: "plastic", label: "Plastic", icon: "♻️" },
    { value: "paper", label: "Paper", icon: "📄" },
    { value: "glass", label: "Glass", icon: "🥤" },
    { value: "metal", label: "Metal", icon: "🥫" },
    { value: "e-waste", label: "E-waste", icon: "💻" },
    { value: "hazardous", label: "Hazardous", icon: "☢️" },
    { value: "bulk", label: "Bulk Items", icon: "📦" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "in-progress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="h-4 w-4" />;
      case "in-progress":
        return <Truck className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Pickup Schedule
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Schedule and manage your waste pickups
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-eco-green hover:bg-eco-dark-green text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Pickup
          </Button>
        </div>

        {/* Schedule Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Schedule New Pickup</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="wasteType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Waste Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select waste type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {wasteTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center space-x-2">
                                    <span>{type.icon}</span>
                                    <span>{type.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="scheduledDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Pickup Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={`w-full pl-3 text-left font-normal ${
                                    !field.value && "text-muted-foreground"
                                  }`}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="estimatedQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Quantity (kg)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="Enter quantity"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your complete address..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please provide a complete address including landmarks
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialInstructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Instructions (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special instructions for pickup..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-eco-green hover:bg-eco-dark-green text-white"
                      disabled={scheduleMutation.isPending}
                    >
                      {scheduleMutation.isPending ? "Scheduling..." : "Schedule Pickup"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Scheduled Pickups */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Scheduled Pickups
          </h2>

          {schedules && schedules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schedules.map((schedule: any) => (
                <Card key={schedule.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-eco-green/10 rounded-full flex items-center justify-center">
                          <Recycle className="h-5 w-5 text-eco-green" />
                        </div>
                        <div>
                          <CardTitle className="text-lg capitalize">
                            {schedule.wasteType} Pickup
                          </CardTitle>
                          <p className="text-sm text-gray-500">
                            ID: #{schedule.id}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(schedule.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(schedule.status)}
                          <span className="capitalize">{schedule.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <CalendarIcon className="h-4 w-4" />
                      <span>
                        {new Date(schedule.scheduledDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <span className="line-clamp-2">{schedule.address}</span>
                    </div>

                    {schedule.estimatedQuantity && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <Trash2 className="h-4 w-4" />
                        <span>~{schedule.estimatedQuantity} kg</span>
                      </div>
                    )}

                    {schedule.specialInstructions && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <strong>Instructions:</strong> {schedule.specialInstructions}
                        </p>
                      </div>
                    )}

                    {schedule.pickupPersonnel && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <Truck className="h-4 w-4" />
                        <span>Assigned to: {schedule.pickupPersonnel}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No pickups scheduled
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Schedule your first pickup to get started with waste management
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-eco-green hover:bg-eco-dark-green text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Pickup
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

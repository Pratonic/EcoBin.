import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Camera, 
  Upload, 
  Scan, 
  Leaf, 
  Recycle,
  MapPin,
  Lightbulb,
  Award,
  CheckCircle,
  AlertCircle,
  Plus,
  X
} from "lucide-react";

export default function Scanner() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [entryData, setEntryData] = useState({
    wasteType: '',
    quantity: '',
    unit: 'kg',
    disposalMethod: '',
    notes: ''
  });

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

  const scanMutation = useMutation({
    mutationFn: async (imageData: string) => {
      const response = await apiRequest("POST", "/api/ai-scanner", {
        imageData,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setScanResult(data);
      setEntryData(prev => ({
        ...prev,
        wasteType: data.wasteType || '',
        disposalMethod: data.disposalMethod || '',
        notes: data.instructions || ''
      }));
      toast({
        title: "Scan Complete",
        description: "AI analysis completed successfully!",
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
        title: "Scan Failed",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addEntryMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/waste-entries", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/waste-entries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
      toast({
        title: "Entry Added",
        description: "Waste entry added successfully!",
      });
      setShowAddEntry(false);
      setEntryData({
        wasteType: '',
        quantity: '',
        unit: 'kg',
        disposalMethod: '',
        notes: ''
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
        description: "Failed to add waste entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
    }
  };

  const handleScan = () => {
    if (!selectedFile) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to scan.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      scanMutation.mutate(base64);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleAddEntry = () => {
    if (!entryData.wasteType || !entryData.quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in waste type and quantity.",
        variant: "destructive",
      });
      return;
    }

    const ecoPoints = calculateEcoPoints(entryData.wasteType, parseFloat(entryData.quantity));
    
    addEntryMutation.mutate({
      ...entryData,
      quantity: parseFloat(entryData.quantity),
      ecoPointsEarned: ecoPoints,
    });
  };

  const calculateEcoPoints = (wasteType: string, quantity: number): number => {
    const pointsPerKg = {
      'organic': 5,
      'plastic': 10,
      'paper': 8,
      'glass': 12,
      'metal': 15,
      'e-waste': 20,
      'hazardous': 25,
    };
    
    return Math.round((pointsPerKg[wasteType as keyof typeof pointsPerKg] || 5) * quantity);
  };

  const resetScanner = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setScanResult(null);
    setShowAddEntry(false);
    setEntryData({
      wasteType: '',
      quantity: '',
      unit: 'kg',
      disposalMethod: '',
      notes: ''
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Waste Scanner
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Scan items to get AI-powered disposal recommendations and environmental insights
          </p>
        </div>

        {/* Scanner Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Image Upload & Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-eco-green" />
                <span>Upload Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!previewUrl ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Click to upload or drag and drop an image
                    </p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Select Image
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Selected"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      onClick={resetScanner}
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-white dark:bg-gray-800"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {previewUrl && !scanResult && (
                  <Button
                    onClick={handleScan}
                    className="w-full bg-eco-green hover:bg-eco-dark-green text-white"
                    disabled={scanMutation.isPending}
                  >
                    {scanMutation.isPending ? (
                      <>
                        <Scan className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Scan className="h-4 w-4 mr-2" />
                        Scan with AI
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Scan Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-eco-blue" />
                <span>AI Analysis Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!scanResult ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scan className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Upload an image and click "Scan with AI" to get disposal recommendations
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Material Type */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Material Type</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                        {scanResult.materialType}
                      </p>
                    </div>
                    <Badge className="bg-eco-green text-white">
                      {scanResult.wasteType}
                    </Badge>
                  </div>

                  {/* Recyclability */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Recyclability</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {scanResult.recyclable ? 'Yes' : 'No'}
                      </p>
                    </div>
                    {scanResult.recyclable ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <AlertCircle className="h-8 w-8 text-red-500" />
                    )}
                  </div>

                  {/* Disposal Instructions */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Recycle className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-100">
                          Disposal Instructions
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {scanResult.instructions}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Environmental Impact */}
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Leaf className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">
                          Environmental Impact
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {scanResult.ecoImpact}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Nearest Center */}
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-900 dark:text-amber-100">
                          Nearest Recycling Center
                        </p>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          {scanResult.nearestCenter}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* EcoPoints */}
                  <div className="p-4 bg-eco-green/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-eco-green" />
                        <span className="font-medium text-eco-green">EcoPoints Earned</span>
                      </div>
                      <Badge className="bg-eco-green text-white text-lg px-3 py-1">
                        +{scanResult.ecoPoints}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Add to Waste Log */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Add to Waste Log
                      </h3>
                      <Button
                        onClick={() => setShowAddEntry(!showAddEntry)}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Entry
                      </Button>
                    </div>

                    {showAddEntry && (
                      <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="wasteType">Waste Type</Label>
                            <Select
                              value={entryData.wasteType}
                              onValueChange={(value) => setEntryData(prev => ({ ...prev, wasteType: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="organic">Organic</SelectItem>
                                <SelectItem value="plastic">Plastic</SelectItem>
                                <SelectItem value="paper">Paper</SelectItem>
                                <SelectItem value="glass">Glass</SelectItem>
                                <SelectItem value="metal">Metal</SelectItem>
                                <SelectItem value="e-waste">E-waste</SelectItem>
                                <SelectItem value="hazardous">Hazardous</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="quantity">Quantity</Label>
                            <div className="flex space-x-2">
                              <Input
                                type="number"
                                step="0.1"
                                min="0"
                                value={entryData.quantity}
                                onChange={(e) => setEntryData(prev => ({ ...prev, quantity: e.target.value }))}
                                placeholder="0.0"
                              />
                              <Select
                                value={entryData.unit}
                                onValueChange={(value) => setEntryData(prev => ({ ...prev, unit: value }))}
                              >
                                <SelectTrigger className="w-20">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="kg">kg</SelectItem>
                                  <SelectItem value="g">g</SelectItem>
                                  <SelectItem value="pieces">pcs</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="disposalMethod">Disposal Method</Label>
                          <Select
                            value={entryData.disposalMethod}
                            onValueChange={(value) => setEntryData(prev => ({ ...prev, disposalMethod: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="recycle">Recycle</SelectItem>
                              <SelectItem value="compost">Compost</SelectItem>
                              <SelectItem value="landfill">Landfill</SelectItem>
                              <SelectItem value="hazardous">Hazardous Disposal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="notes">Notes</Label>
                          <Textarea
                            value={entryData.notes}
                            onChange={(e) => setEntryData(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder="Additional notes..."
                            className="h-20"
                          />
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => setShowAddEntry(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddEntry}
                            className="bg-eco-green hover:bg-eco-dark-green text-white"
                            disabled={addEntryMutation.isPending}
                          >
                            {addEntryMutation.isPending ? "Adding..." : "Add Entry"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

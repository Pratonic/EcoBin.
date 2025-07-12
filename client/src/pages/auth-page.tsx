import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "wouter";

const authSchema = z.object({
  username: z.string().min(8, "Username must be at least 8 characters").max(20, "Username must be at most 20 characters"),
  password: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters"),
}).refine((data) => data.username === data.password, {
  message: "Username and password must be the same",
  path: ["password"],
});

type AuthFormData = z.infer<typeof authSchema>;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, isLoading, loginMutation, registerMutation } = useAuth();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: AuthFormData) => {
    if (isLogin) {
      loginMutation.mutate(data);
    } else {
      registerMutation.mutate(data);
    }
  };

  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-600">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Enter your username and password to access EcoBin"
                : "Choose a username (8-20 characters, same as password) to get started"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="8-20 characters"
                          maxLength={20}
                          className="font-mono"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="password"
                          placeholder="8-20 characters (same as username)"
                          maxLength={20}
                          className="font-mono"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loginMutation.isPending || registerMutation.isPending}
                >
                  {loginMutation.isPending || registerMutation.isPending 
                    ? "Please wait..." 
                    : isLogin ? "Sign In" : "Create Account"
                  }
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm"
              >
                {isLogin 
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Hero */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">
            Welcome to EcoBin
          </h1>
          <p className="text-green-600 dark:text-green-400 leading-relaxed">
            Transform your waste management with smart scheduling, AI-powered scanning, 
            and community engagement. Join thousands making a difference for our planet.
          </p>
          <div className="space-y-2 text-sm text-green-600 dark:text-green-400">
            <div className="flex items-center justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Smart waste pickup scheduling
            </div>
            <div className="flex items-center justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              AI-powered waste analysis
            </div>
            <div className="flex items-center justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Community reporting & rewards
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
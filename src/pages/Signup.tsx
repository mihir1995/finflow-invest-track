
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: { name: string; email: string; password: string }) => {
    // Mock signup functionality for now
    console.log("Signup attempt:", data);
    toast.success("Account created successfully");
    navigate("/login");
  };

  return (
    <MobileLayout hideNavigation>
      <div className="px-4 py-6 space-y-6 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center mb-4 w-full">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground text-sm">Join FinFlow to track your finances</p>
        </div>

        <Card className="w-full p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                Create Account
              </Button>
            </form>
          </Form>
          
          <div className="mt-4 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Signup;

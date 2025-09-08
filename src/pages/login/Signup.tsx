import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      userType: "",
      password: "",
      confirmPassword: "",
    })

    const [error , setError] = useState("");
    const navigate = useNavigate();

    const {register, loginWithGoogle, loading, googleLoading } = useAuth();

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);

      if(!formData || !formData.firstName || !formData.lastName || !formData.email || !formData.userType || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all fields");
        return;
      }
      if(formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if(formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      const result = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        userType: formData.userType,
      });

      if(result.success){
        console.log("Registration successful");
        // Redirect students to profile setup, others to dashboard
        if(formData.userType === "student") {
          navigate("/student-profile-setup");
        } else {
          navigate("/dashboard");
        }
      }else{
        setError(result.error || "Registration failed");
      }

    }

    const handleGoogleSignup = async () => {
        setError("");
        const result = await loginWithGoogle();
        if(result.success){
          console.log("Google sign-in successful");
          navigate("/dashboard");

        }else{
          setError(result.error || "Google sign-in failed");
        }
      }

    const handleInputChange = (name,value) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4 py-20">
      <Card className="w-full max-w-md">
        <form className="space-y-2" onSubmit={handleSubmit}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-primary">EduConnect</span>
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>
            Join thousands of students pursuing international education
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John"  value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userType">I am a</Label>
            <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="university">University Representative</SelectItem>
                <SelectItem value="professor">Professor</SelectItem>
                <SelectItem value="homeowner">Homeowner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create a strong password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={(e) => handleInputChange("confirmPassword", e.target.value)} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent"
            onClick={handleGoogleSignup}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up with Google...
              </>
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
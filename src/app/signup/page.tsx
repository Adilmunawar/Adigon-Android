import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import { Logo } from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center space-y-6">
        <div className="flex items-center gap-2 text-foreground">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tighter">Adigon AI</span>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Get started with your personal AI assistant.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

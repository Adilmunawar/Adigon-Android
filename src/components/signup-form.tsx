"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { useFormStatus } from "react-dom";
import { signup } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Create Account
    </Button>
  );
}

function GoogleButton() {
    const { pending } = useFormStatus();
    const [isSigningIn, setIsSigningIn] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleGoogleSignIn = async () => {
        if (!isFirebaseConfigured || !auth) {
            toast({
                title: 'Configuration Error',
                description:
                'Google Sign-In is not configured. Please add your Firebase project credentials to the .env file.',
                variant: 'destructive',
            });
            return;
        }

        setIsSigningIn(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/chat');
        } catch (error: any) {
            console.error("Google sign-in error", error);
            toast({
                title: 'Sign-Up Error',
                description:
                'Failed to sign up with Google. Please check your Firebase configuration and try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <Button variant="outline" className="w-full" type="button" disabled={pending || isSigningIn} onClick={handleGoogleSignIn}>
            {isSigningIn ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 74.9C307.4 116.5 280.7 104 248 104c-73.8 0-134.3 60.3-134.3 135s60.5 135 134.3 135c84.3 0 115.7-64.3 120.2-96.8H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
            )}
            Sign up with Google
        </Button>
    )
}

export function SignupForm() {
  const [state, action] = useActionState(signup, undefined);

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Ada Lovelace" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        {state?.message && <p className="text-sm text-destructive">{state.message}</p>}
        <SubmitButton />
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
            <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <GoogleButton />
    </form>
  );
}

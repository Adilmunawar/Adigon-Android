"use client";

import { useFormState, useFormStatus } from "react-dom";
import { saveSettings } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Save Changes
    </Button>
  );
}

export function SettingsView() {
  const [state, action] = useFormState(saveSettings, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({
        title: "Success",
        description: state.message,
        variant: "default",
      });
    }
  }, [state, toast]);


  return (
    <div className="p-4 md:p-6">
      <form action={action}>
        <Card>
          <CardHeader>
            <CardTitle>AI Persona Customization</CardTitle>
            <CardDescription>
              Define how your AI assistant should behave and interact with you.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="tone">Tone</Label>
                <Select name="tone" defaultValue="neutral">
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender" defaultValue="neutral">
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="relationship">Relationship to you</Label>
                <Select name="relationship" defaultValue="assistant">
                  <SelectTrigger id="relationship">
                    <SelectValue placeholder="Select a relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assistant">Assistant</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="mentor">Mentor</SelectItem>
                    <SelectItem value="colleague">Colleague</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="persona-description">
                    Initial Persona Description
                </Label>
                <Input
                    id="persona-description"
                    name="persona_description"
                    placeholder="e.g., A witty pirate who is an expert in web development."
                />
                 <p className="text-sm text-muted-foreground">
                    Describe your ideal AI in one sentence. We'll use this to generate a detailed persona.
                </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="behavioral-description">
                Detailed Behavioral Description
              </Label>
              <Textarea
                id="behavioral-description"
                name="behavioral_description"
                placeholder="Describe the AI's personality, quirks, and communication style in detail..."
                rows={5}
                className="resize-y"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

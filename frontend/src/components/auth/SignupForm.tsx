"use client";

import Brand from "@/components/common/Brand";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  return (
    <div className="w-full max-w-xl">

      {/* Heading */}
    <div className="mb-10">
      <Brand />
    </div>

      {/* Login Card */}

      <Card className="rounded-none border border-border shadow-none">

        <CardContent className="p-10 md:p-12">

          <form className="space-y-7">

            {/* Email */}

            <div className="space-y-3">

              <Label
                htmlFor="email"
                className="text-xs font-bold tracking-widest text-foreground"
              >
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="abc@xyz.com"
                className="h-14 rounded-none border-input text-lg shadow-none focus-visible:ring-2"
              />

            </div>

            {/* Password */}

            <div className="space-y-3">

              <Label
                htmlFor="password"
                className="text-xs font-bold tracking-widest text-foreground"
              >
                Password
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-14 rounded-none border-input text-lg shadow-none focus-visible:ring-2"
              />

            </div>


            {/* Button */}

            <Button
              type="submit"
              className="h-14 w-full rounded-none bg-primary text-lg font-semibold hover:bg-[#1D4ED8]"
            >
              Sign Up
            </Button>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}
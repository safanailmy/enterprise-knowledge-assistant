import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md">

        <CardHeader className="space-y-2">

            <CardTitle className="text-center text-2xl font-bold">
                Enterprise Knowledge Assistant
            </CardTitle>

            <CardDescription className="text-center">
                Sign in to access your AI knowledge platform
            </CardDescription>

            </CardHeader>

      <CardContent>

        <div className="space-y-4">

            <div className="space-y-2">

                <Label htmlFor="email">
                Email
                </Label>

                <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                />

            </div>

            </div>

      </CardContent>

    </Card>
  );
}
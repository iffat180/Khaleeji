import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface LockedOverlayProps {
  message?: string;
}

export function LockedOverlay({ message = "This content is locked. Upgrade to Pro or Lifetime to access." }: LockedOverlayProps) {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
      <Card className="max-w-md mx-4">
        <CardContent className="p-6 text-center space-y-4">
          <Lock className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Premium Content</h3>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
          <Link href="/pricing">
            <Button>Upgrade Now</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

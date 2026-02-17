"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CheckoutButtonProps {
  priceId: string;
  tier: "pro" | "lifetime";
}

export function CheckoutButton({ priceId, tier }: CheckoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, tier }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error creating checkout session. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error creating checkout session. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} className="w-full" disabled={loading}>
      {loading ? "Loading..." : tier === "lifetime" ? "Get Lifetime" : "Upgrade to Pro"}
    </Button>
  );
}

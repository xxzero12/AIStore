"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export default function ApiStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkApiStatus() {
      try {
        const response = await fetch('http://localhost:8000/health');
        setIsConnected(response.ok);
      } catch (error) {
        setIsConnected(false);
      }
    }

    checkApiStatus();
    
    // Check status every 30 seconds
    const interval = setInterval(checkApiStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isConnected === null) {
    return null; // Don't show anything while loading
  }

  return (
    <div className="inline-flex items-center">
      {isConnected ? (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
          API Connected
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
          <span className="mr-1 h-2 w-2 rounded-full bg-red-500"></span>
          API Disconnected
        </Badge>
      )}
    </div>
  );
}
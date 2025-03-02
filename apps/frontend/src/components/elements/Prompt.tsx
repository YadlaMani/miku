"use client";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Router, Send } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
export function Prompt() {
  const [prompt, setPrompt] = useState("");
  const { getToken } = useAuth();
  const router = useRouter();

  return (
    <div>
      <Textarea
        placeholder="Create a chess application..."
        value={prompt}
        onChange={(e: any) => setPrompt(e.target.value)}
      />
      <div className="flex justify-end pt-2">
        <Button onClick={() => console.log("clicked")}>
          <Send />
        </Button>
      </div>
    </div>
  );
}

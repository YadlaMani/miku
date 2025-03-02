"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send } from "lucide-react";
import axios from "axios";

import { useAuth } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
export function Prompt() {
  const [prompt, setPrompt] = useState("");
  const { getToken } = useAuth();
  const router = useRouter();
  async function startProject() {
    const res = await axios.post();
  }

  return (
    <div>
      <Textarea
        placeholder="Create a chess application..."
        value={prompt}
        onChange={(e: any) => setPrompt(e.target.value)}
      />
      <div className="flex justify-end pt-2">
        <Button onClick={startProject} disabled={!prompt}>
          <Send />
        </Button>
      </div>
    </div>
  );
}

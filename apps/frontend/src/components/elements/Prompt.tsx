"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send } from "lucide-react";
import axios from "axios";

import { useAuth } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../../../config";
import { toast } from "sonner";
export function Prompt() {
  const [prompt, setPrompt] = useState("");
  const { getToken } = useAuth();
  const router = useRouter();

  async function startProject() {
    try {
      const token = await getToken();
      const res = await axios.post(
        `${BACKEND_URL}/project`,
        {
          prompt: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success("Project created successfully");
      } else {
        toast.message("Failed to create project");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
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

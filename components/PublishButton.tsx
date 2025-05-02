"use client";

import { toggleProjectPublished } from "@/services/projectAPI";
import { useState } from "react";

type PublishButtonProps = {
  projectId: string;
  initialPublished: boolean;
  onPublishChange: (newPublished: boolean) => void;
};

export default function PublishButton({
  projectId,
  initialPublished,
  onPublishChange,
}: PublishButtonProps) {
  const [isPublished, setIsPublished] = useState(initialPublished);

  const handlePublish = async () => {
    try {
      const updatedPublished = await toggleProjectPublished(projectId, !isPublished);
      setIsPublished(updatedPublished);
      onPublishChange(updatedPublished);
    } catch (error) {
      console.error("Failed to toggle published status:", error);
    }
  };

  return (
    <button
      onClick={handlePublish}
      className="bg-white text-blue-600 px-4 py-2 shadow-md border border-gray rounded hover:bg-blue-600 hover:text-white transition duration-200"
    >
      {isPublished ? "Unpublish" : "Publish"}
    </button>
  );
}

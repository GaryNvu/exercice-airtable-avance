"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

type Project = {
  id: string;
  Title: string;
  Description: string;
  CoverImage?: { url: string }[];
  Technologies?: string[];
  Likes?: number;
  liked: boolean;
  Published: boolean;
  users?: string[];
  technologies?: { id: string; Name: string }[];

  onLike: (projectId: string) => void;
};

export default function ProjectCard({ project }: { project: Project }) {
  const { user } = useUser();
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block border border-gray-300 rounded-xl shadow-md p-4 hover:shadow-lg transition-transform transform hover:scale-105"
    >
      <Image
        src={project.CoverImage?.[0]?.url || "/placeholder-image.svg"}
        alt={project.Title}
        width={400}
        height={250}
        className="rounded-md object-cover w-full h-48"
        priority
      />
      <div className="flex flex-row items-center justify-between mt-4">
        <h2 className="text-xl font-semibold">{project.Title}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              project.onLike(project.id);
            }}
            className={`transition transform ${
              project.liked
                ? "text-red-500 hover:text-red-600 scale-110 cursor-pointer"
                : "text-gray-500 hover:text-gray-600 cursor-pointer"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill={project.liked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
            </svg>
          </button>
          <span className="text-gray-700">{project.Likes || 0}</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-2 italic">
        {project.technologies?.map((tech) => tech.Name).join(", ") || "Aucune technologie spécifiée"}
      </p>
      <p className="text-sm text-gray-600 line-clamp-3">
        {project.Description?.length > 140
          ? `${project.Description.slice(0, 140)}...`
          : project.Description}
      </p>
      {user && (
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <span className={`text-sm text-white px-3 py-1 rounded-full ${
              project.Published ? "bg-green-500" : "bg-red-500"
            }`}>
              {project.Published ? "Published" : "Unpublished"}
            </span>
          </label>
        </div>
      )}
    </Link>
  );
}
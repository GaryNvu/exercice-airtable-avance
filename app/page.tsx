"use client";

import { getAllProjects, likeProject, unlikeProject } from "../services/projectAPI";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import ProjectGrid from "../components/ProjectGrid";
import SearchBar from "../components/SearchBar";
import AddProjectButton from "../components/AddProjectButton";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";

type Project = {
  id: string;
  Title: string;
  Description: string;
  CoverImage?: { url: string }[];
  Technologies?: string[];
  Likes?: number;
  Published: boolean;
  users?: string[];
  technologies?: { id: string, Name: string}[];
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [likedProjects, setLikedProjects] = useState<string[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const data = await getAllProjects();
      setProjects(data);
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  const handleLike = async (projectId: string) => {
    const hasLiked = likedProjects.includes(projectId);

    if (hasLiked) {
      setLikedProjects((prev) => prev.filter((id) => id !== projectId));
      await unlikeProject(projectId);
    } else {
      setLikedProjects((prev) => [...prev, projectId]);
      await likeProject(projectId);
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              Likes: hasLiked
                ? Math.max((project.Likes || 0) - 1, 0)
                : (project.Likes || 0) + 1,
            }
          : project
      )
    );
  };

  const filteredProjects = projects
  .filter((project) => user || project.Published)
  .filter((project) => {
    const titleMatch = project.Title.toLowerCase().includes(search.toLowerCase());
    const techMatch = project.technologies?.some((tech) =>
      tech.Name.toLowerCase().includes(search.toLowerCase())
    );
    return titleMatch || techMatch;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white w-4/5 mx-auto mt-8 grid grid-rows-[20px_1fr_20px] min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 w-full">
        <div className="flex flex-row items-center mb-6 gap-x-4">
          <SearchBar value={search} onChange={setSearch} />
          {user && <AddProjectButton />}
        </div>

        <ProjectGrid
          projects={filteredProjects}
          likedProjects={likedProjects}
          onLike={handleLike}
        />
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-xs text-gray-500">© Portfolio ESGI - 2025</p>
      </footer>
    </div>
  );
}
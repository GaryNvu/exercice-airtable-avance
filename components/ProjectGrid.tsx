"use client";

import ProjectCard from "./ProjectCard";

type Project = {
  id: string;
  Title: string;
  Description: string;
  Image?: { url: string }[];
  Technologies?: string[];
  Likes?: number;
  Published: boolean;
};

type ProjectGridProps = {
  projects: Project[];
  likedProjects: string[];
  onLike: (projectId: string) => void;
};

export default function ProjectGrid({
  projects,
  likedProjects,
  onLike,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="text-center text-gray-500 text-sm col-span-full">
        Aucun projet ne correspond à votre recherche.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={{
            ...project,
            liked: likedProjects.includes(project.id),
            onLike,
          }}
        />
      ))}
    </div>
  );
}

"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PublishButton from "@/components/PublishButton";
import { useState, useEffect } from "react";
import { deleteProject, getProjectById } from "@/services/projectAPI";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import { useUser } from "@/context/UserContext";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<any>(null);
  const [isPublished, setIsPublished] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProjectById(id);
      if (!data) {
        notFound();
      } else {
        setProject(data);
        setIsPublished(data.Published);
      }
    };

    fetchProject();
  }, [id]);

  const handlePublishChange = (newPublished: boolean) => {
    setIsPublished(newPublished);
    setProject((prevProject: any) => ({
      ...prevProject,
      Published: newPublished,
    }));
  };

  if (!project) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-5xl mx-auto mt-6 p-6 space-y-8">
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="flex flex-row gap-2 text-blue-600 px-4 py-2 rounded hover:border-gray-300 hover:shadow-md">
          <ArrowLeft></ArrowLeft>
          Return
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <button
              onClick={async () => {
                if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
                  await deleteProject(project.id);
                  window.location.href = "/";
                }
              }}
              className="bg-red-600 text-white px-4 py-2 shadow-md border border-gray rounded hover:bg-red-700 transition duration-200"
            >
              Delete
            </button>
            <PublishButton
                projectId={id}
                initialPublished={project.Published}
                onPublishChange={handlePublishChange}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-row align-middle items-center gap-4">
              <h1 className="text-4xl font-bold">{project.Title}</h1>
              {user && (
                <div>
                  <label className="flex">
                    <span className={`text-sm text-white px-3 py-1 rounded-full ${
                      isPublished ? "bg-green-500" : "bg-red-500"
                    }`}>
                      {isPublished ? "Published" : "Unpublished"}
                    </span>
                  </label>
                </div>
              )}
            </div>
            
            <div className="flex flex-row items-center gap-x-2 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <p className="text-2xl">{project.Likes ?? 0}</p>
            </div>
          </div>
          {project.Users?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold">Participants :</h2>
              <ul className="space-y-4">
                {project.users.map((user: any, index: number) => (
                  <li key={index} className="flex items-center space-x-4">
                    <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
                      {user.Photo && user.Photo[0]?.url && (
                        <Image
                          src={user.Photo[0].url}
                          alt={user.Name}
                          width={600}
                          height={400}
                          className="rounded-full object-cover overflow-hidden"
                          style={{ width: "100%", height: "auto" }}
                        />
                      )}
                    </div>
                    <span className="text-gray-700">
                      {user.Name} - {user.Class}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.technologies && (
            <div className="flex flex-col gap-y-2">
              <span className="font-semibold">Technologies :</span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: {id: string, Name: string}) => (
                  <span
                    key={tech.id}
                    className="bg-blue-600 px-3 py-1 rounded-full text-white text-sm w-fit"
                  >
                    {tech.Name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {project.CoverImage && (
          <Image
            src={project.CoverImage[0].url}
            alt={project.Title}
            width={600}
            height={400}
            className="rounded shadow-lg object-cover w-full h-auto"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-800 leading-relaxed">{project.Description}</p>
      </div>

      {project.Images && project.Images.length > 0 &&(
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project.Images.map((image: { url: string }, index: number) => (
            <Image
              key={index}
              src={image.url}
              alt={`${project.Title} - Image ${index + 1}`}
              width={1200}
              height={800}
              className="rounded shadow-lg object-cover w-full h-auto"
              style={{ width: "100%", height: "auto" }}
            />
          ))}
          </div>
        </div>
      )}

      {project.Video && project.Video.length > 0 &&(
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Vidéo</h2>
          <div className="flex flex-col gap-4">
          {project.Video && (
            <div className="mt-6">
              <div className="aspect-video w-full">
                <iframe
                  src={project.Video}
                  title={`Vidéo du projet ${project.Title}`}
                  className="w-full h-full rounded"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
}
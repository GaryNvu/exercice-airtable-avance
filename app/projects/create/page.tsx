"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsersByRole } from "@/services/userAPI";
import { createProject, getAllProjects } from "@/services/projectAPI";
import { getAllTechnologies } from "@/services/technoAPI";
import { X } from "lucide-react";

export default function CreateProjectPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState<string[]>([""]);
  const [video, setVideo] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsersByRole("STUDENT");
      setUsers(data);
    };

    const fetchTechs = async () => {
      const data = await getAllTechnologies();
      setTechnologies(data);
    };

    fetchUsers();
    fetchTechs();
  }, []);

  const handleAddImageField = () => {
    setImages((prev) => [...prev, ""]);
  };

  const handleRemoveImageField = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, value: string) => {
    setImages((prev) => prev.map((img, i) => (i === index ? value : img)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const projectData = {
        title,
        description,
        technologies: selectedTechnologies,
        users: selectedUsers,
        coverImage: coverImage.trim(),
        images: images.filter((img) => img.trim() !== ""),
        videos: video.trim(),
      };

      await createProject(projectData);

      setSuccess(true);
      await getAllProjects();
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl mt-6 p-8 max-w-lg w-full space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center text-blue-600">
          Create a project
        </h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm text-center">
            Project successfully created !
          </p>
        )}

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Technologies
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
            {technologies.map((tech: any) => (
              <label key={tech.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={tech.id}
                  checked={selectedTechnologies.includes(tech.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTechnologies((prev) => [...prev, tech.id]);
                    } else {
                      setSelectedTechnologies((prev) =>
                        prev.filter((id) => id !== tech.id)
                      );
                    }
                  }}
                  className="accent-blue-600"
                />
                <span>{tech.Name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Users
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
            {users.map((user: any) => (
              <label key={user.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={user.id}
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers((prev) => [...prev, user.id]);
                    } else {
                      setSelectedUsers((prev) =>
                        prev.filter((id) => id !== user.id)
                      );
                    }
                  }}
                  className="accent-blue-600"
                />
                <span>
                  {user.Name} ({user.Email})
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Cover Image URL
          </label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Images (URLs)
          </label>
          {images.map((img, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="URL de l'image"
              />
              <button
                type="button"
                onClick={() => handleRemoveImageField(index)}
                className="text-white bg-red-600 p-2 rounded hover:bg-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImageField}
            className="text-blue-600 hover:underline"
          >
            Add an image
          </button>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Vidéo (URL)
          </label>
          <input
            type="text"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="URL of the video"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
        >
          Create the project
        </button>
      </form>
    </div>
  );
}
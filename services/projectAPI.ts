export const getAllProjects = async () => {
  const res = await fetch(`/api/projects`);
  if (!res.ok) throw new Error("Erreur lors du fetch des projets");
  return res.json();
};

export const getProjectById = async (id: string) => {
  const res = await fetch(`/api/projects/${id}`);
  if (!res.ok) throw new Error("Erreur lors du fetch du projet");
  return res.json();
};

export const createProject = async (data: any) => {
  const res = await fetch(`/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la création du projet");
  return res.json();
};

export const updateProject = async (id: string, data: any) => {
  const res = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return res.json();
};

export const deleteProject = async (id: string) => {
  const res = await fetch(`/api/projects/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
};

export const toggleProjectPublished = async (id: string, published: boolean) => {
  const res = await fetch(`/api/projects/${id}/publish`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Published: published }),
  });

  if (!res.ok) {
    throw new Error("Failed to toggle published status");
  }

  const data = await res.json();
  return data.published;
};


export const likeProject = async (id: string) => {
  const res = await fetch(`/api/projects/${id}/like`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout du like");
  return res.json();
}

export const unlikeProject = async (id: string) => {
  const res = await fetch(`/api/projects/${id}/unlike`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression du like");
  return res.json();
}

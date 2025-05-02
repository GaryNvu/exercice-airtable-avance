export const getAllTechnologies = async () => {
  const res = await fetch(`/api/technologies`);
  if (!res.ok) throw new Error("Erreur lors du fetch des technos");
  return res.json();
};

export const getTechnologiesById = async (id: string) => {
  const res = await fetch(`/api/technologies/${id}`);
  if (!res.ok) throw new Error("Erreur lors du fetch des technos");
  return res.json();
}

export const createTechnology = async (technoData: { Name: string }) => {
  const res = await fetch(`/api/technologies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(technoData),
  });

  if (!res.ok) throw new Error("Erreur lors de la création de la techno");
  return res.json();
}

export const updateTechnology = async (id: string, technoData: { Name: string }) => {
  const res = await fetch(`/api/technologies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(technoData),
  });

  if (!res.ok) throw new Error("Erreur lors de la mise à jour de la techno");
  return res.json();
}

export const deleteTechnology = async (id: string) => {
  const res = await fetch(`/api/technologies/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de la techno");
  return res.json();
}

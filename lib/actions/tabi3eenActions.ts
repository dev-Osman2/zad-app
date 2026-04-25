export async function getTabi3eenSection(id: string) {
  try {
    const response = await fetch(`/data/tabi3een/${id}.json`);
    if (!response.ok) throw new Error("Not found");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading section:", error);
    return null;
  }
}
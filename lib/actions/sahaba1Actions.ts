export async function getSahaba1Section(id: string) {
  try {
    const response = await fetch(`/data/sahaba-1/${id}.json`);
    if (!response.ok) throw new Error("Not found");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading section:", error);
    return null;
  }
}
export async function getSahaba2Section(id: string) {
  try {
    const response = await fetch(`/data/sahaba-2/${id}.json`);
    if (!response.ok) throw new Error("Not found");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading section:", error);
    return null;
  }
}
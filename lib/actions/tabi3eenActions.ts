"use server";

export async function getTabi3eenSection(id: string) {
  try {
    const data = await import(`@/lib/data/tabi3een/${id}.json`);
    return data.default || data;
  } catch (error) {
    console.error("Error loading section:", error);
    return null;
  }
}
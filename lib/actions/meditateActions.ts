"use server";

export async function getMeditateSection(id: string) {
  try {
    const data = await import(`@/lib/data/meditateQuran/${id}.json`);
    return data.default || data;
  } catch (error) {
    console.error("Error loading section:", error);
    return null;
  }
}
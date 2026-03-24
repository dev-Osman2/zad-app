"use server";

export async function getSahaba2Section(id: string) {
  try {
    const data = await import(`@/lib/data/sahaba-2/${id}.json`);
    return data.default || data;
  } catch (error) {
    console.error("Error loading section:", error);
    return null;
  }
}
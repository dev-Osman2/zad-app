// لا يوجد "use server" هنا!
export async function getMeditateSection(id: string) {
  try {
    // نجلب البيانات من مجلد public مباشرة كأننا نتصفح الموقع
    const response = await fetch(`/data/meditateQuran/${id}.json`);
    if (!response.ok) throw new Error("Not found");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading section:", error);
    return null;
  }
}
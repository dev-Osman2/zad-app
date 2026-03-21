import { allCourses } from "@/lib/data";
import CourseViewer from "@/components/viewers/CourseViewer"; 
import { notFound } from "next/navigation";


export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  
  const { slug } = await params;

  const courseData = allCourses[slug];

  if (!courseData) {
    return notFound();
  }

  return <CourseViewer info={courseData.info} content={courseData.content}  variant="books"/>;
}

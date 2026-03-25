"use client";

import CourseViewer from "@/components/viewers/CourseViewer";
import { CourseData } from "@/lib/types/types";

export default function ClientPage({ courseData }: { courseData: CourseData }) {
  return (
    <CourseViewer
      info={courseData.info}
      content={courseData.content}
      variant="books"
    />
  );
}

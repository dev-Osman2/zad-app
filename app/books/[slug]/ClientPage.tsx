"use client";

import CourseViewer from "@/components/viewers/CourseViewer";

export default function ClientPage({ courseData }: { courseData: any }) {
  return (
    <CourseViewer
      info={courseData.info}
      content={courseData.content}
      variant="books"
    />
  );
}

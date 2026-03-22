"use client"; // أضفنا هذه ليصبح المكون خاصاً بالمتصفح (Client Component)

import CourseViewer from "@/components/viewers/CourseViewer";

// نستقبل البيانات المفلترة من السيرفر كـ Prop
export default function ClientPage({
  courseData,
}: {
  courseData: any; // يمكنك تغيير any إلى نوع البيانات الصحيح الخاص بك (Interface)
}) {
  
  return (
    <CourseViewer 
      info={courseData.info} 
      content={courseData.content}  
      variant="books" 
    />
  );
}
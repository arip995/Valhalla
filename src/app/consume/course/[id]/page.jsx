import CourseConsume from '@/Components/Consume/Course/CourseConsume';

export default function Page({ params }) {
  return <CourseConsume productId={params.id} />;
}

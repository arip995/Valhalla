import CourseConsume from '@/Components/Consume/Course/CourseConsume';

export default async function Page({ params }) {
  return <CourseConsume productId={params.id} />;
}

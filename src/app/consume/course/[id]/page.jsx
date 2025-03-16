import CourseConsume from '@/Components/Consume/Course/CourseConsume';

export default async function Page(props) {
  const params = await props.params;
  return <CourseConsume productId={params.id} />;
}

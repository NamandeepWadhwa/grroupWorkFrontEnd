import ActivityDetail from "@/components/ActivityDetail";
import { useRouter } from 'next/router';

const ActivityDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ActivityDetail id={id} />;
};

export default ActivityDetailPage;

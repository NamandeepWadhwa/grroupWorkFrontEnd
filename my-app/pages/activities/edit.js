import EditActivity from "@/components/EditActivity";
import { useRouter } from 'next/router';

const EditActivityPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <EditActivity id={id} />;
};

export default EditActivityPage;

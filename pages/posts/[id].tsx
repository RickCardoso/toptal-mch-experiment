import {fetcher} from "../../utils/http";
import useSWR from "swr";
import {useRouter} from "next/router";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/posts/${id}`, fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

export default PostPage;
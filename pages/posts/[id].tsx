import {fetcher} from "../../utils/http";
import useSWR from "swr";
import {useRouter} from "next/router";
import Link from "next/link";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/posts/${id}`, fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">{data.title}</h1>
      <p>{data.content}</p>
      <Link href="/posts">
        <button className="bg-transparent hover:bg-white hover:bg-opacity-50 border border-white py-2 px-4 rounded-md mt-8">Back to posts</button>
      </Link>
    </div>
  );
}

export default PostPage;
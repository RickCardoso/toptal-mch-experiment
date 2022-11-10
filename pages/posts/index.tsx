import axios from "axios"
import Link from "next/link"
import { useForm } from "react-hook-form"
import useSWR from "swr"
import { fetcher } from "../../utils/http"
import {Post} from "../../types/post";

const PostsPage = () => {
  const { data, error, mutate } = useSWR('/api/posts', fetcher)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const onSubmit = (data: Partial<Post>) => axios.post('/api/posts', data).then(() => {
    void mutate();
    reset();
  });

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Posts</h1>
      <form className="max-w-4xl flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg">Add new post</h2>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input type="text" {...register('title')} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content">Content</label>
          <textarea {...register('content')} />
        </div>
        <div className="text-right">
          <button className="bg-purple-600 hover:bg-purple-400 py-1 px-2">Submit</button>
        </div>
      </form>

      <h2 className="text-lg font-semibold mb-4">Posts</h2>
      <ul className="flex flex-col gap-4">
        {data.map((post: Post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <li className="rounded-xl bg-zinc-300 p-6 text-black">
              <h3 className="text-lg text-semibold mb-2">{post.title}</h3>
              <p className="text-ellipsis overflow-hidden whitespace-nowrap">{post.content}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default PostsPage;
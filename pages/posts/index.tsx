import axios from "axios"
import Link from "next/link"
import { useForm } from "react-hook-form"
import useSWR from "swr"
import { fetcher } from "../../utils/http"
import {Post} from "../../types/post";
import {useState} from "react";

const PostsPage = () => {
  const { data, error, mutate } = useSWR('/api/posts', fetcher);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const onSubmit = (data: Partial<Post>) => axios.post('/api/posts', data).then(() => {
    void mutate();
    reset();
  });

  const [addPostOpen, setAddPostOpen] = useState(false);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <div className={`p-6 ${addPostOpen ? 'pr-72 mr-72' : ''} transition-all`}>
        <button className="bg-purple-600 hover:bg-purple-400 py-2 px-4 rounded-md" type="button" onClick={() => setAddPostOpen(state => !state)}>Add new post</button>

        <h1 className="text-lg font-semibold my-4">Posts</h1>
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
      {addPostOpen && <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-80" onClick={() => setAddPostOpen(state => !state)} />}
      <form className={`max-w-xl w-full flex flex-col gap-2 fixed left-full top-0 bottom-0 ${addPostOpen ? '-translate-x-full' : ''} transition-all p-6 bg-black`} onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg">Add new post</h2>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input className="h-10 rounded-md px-3" type="text" {...register('title')} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content">Content</label>
          <textarea className="rounded-md px-3 py-2" {...register('content')} rows={10} />
        </div>
        <div className="text-right mt-4">
          <button className="bg-purple-600 hover:bg-purple-400 py-2 px-4 rounded-md">Submit</button>
        </div>
      </form>
    </>
  )
}

export default PostsPage;
'use client'

import { useState } from 'react'
import {
  useGetPostByIdQuery,
  useGetAllPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  usePatchPostMutation,
  useDeletePostMutation,
} from '@/lib/features/posts/postSlice'

export default function PostPage() {
  const [postId, setPostId] = useState<number>(1)

  const { data: singlePost, isLoading: loadingOne } = useGetPostByIdQuery(postId)
  const { data: allPosts, isLoading: loadingAll } = useGetAllPostsQuery()
  const [createPost] = useCreatePostMutation()
  const [updatePost] = useUpdatePostMutation()
  const [patchPost] = usePatchPostMutation()
  const [deletePost] = useDeletePostMutation()

  const handleCreate = async () => {
    await createPost({
      title: 'New Post',
      body: 'This is a new post.',
      userId: 1,
    })
  }

  const handleUpdate = async () => {
    await updatePost({
      id: postId,
      title: 'Updated Title',
      body: 'Updated Body',
      userId: 1,
    })
  }

  const handlePatch = async () => {
    await patchPost({
      id: postId,
      body: 'Patched Body',
    })
  }

  const handleDelete = async () => {
    await deletePost(postId)
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">RTK Query Post CRUD</h1>

      <div>
        <label>Post ID:</label>
        <input
          title='Post ID'
          type="number"
          value={postId}
          onChange={(e) => setPostId(Number(e.target.value))}
          className="border px-2 py-1 ml-2"
        />
      </div>

      <div>
        <h2 className="font-semibold">Single Post:</h2>
        {loadingOne ? <p>Loading...</p> : <pre>{JSON.stringify(singlePost, null, 2)}</pre>}
      </div>

      <div>
        <h2 className="font-semibold">All Posts:</h2>
        {loadingAll ? <p>Loading...</p> : <pre>{JSON.stringify(allPosts?.slice(0, 5), null, 2)}</pre>}
      </div>

      <div className="space-x-2">
        <button type='button' onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded">Create</button>
        <button type='button' onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
        <button type='button' onClick={handlePatch} className="bg-yellow-500 text-white px-4 py-2 rounded">Patch</button>
        <button type='button' onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </div>
  )
}

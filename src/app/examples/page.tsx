export type Root = Array<{
  id: number
  title: string
  content: string
  author: string
  date: string
  category: string
}>


export default async function Example() {
  const data = await fetch('https://api.vercel.app/blog', {cache: "default"})
  const posts: Root = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
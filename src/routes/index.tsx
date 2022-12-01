import { A, unstable_island } from "solid-start";

const Counter = unstable_island(() => import("../components/Counter"));

export default function Home() {
  const content = Object.keys(import.meta.glob('../content/*.md')).map(key => key.replace('../content/', '').replace('.md', ''));
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
      <Counter />
      <ul>
        {content.map(key => (
          <li><A href={`/blog/${key}`}>{key}</A></li>
        ))}
      </ul>
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{" "}
      </p>
    </main>
  );
}

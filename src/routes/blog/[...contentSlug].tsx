import { Show, Suspense } from "solid-js";
import { RouteDataArgs, useParams, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";

function sleep(ms: number) {
  return new Promise(res => {
    setTimeout(() => {
      res(null); 
    }, ms);
  })
}

export function routeData({ params }: RouteDataArgs) {
  const contentResult = createServerData$(async ([slug]: [string]) => {
    const content = import.meta.glob('../../content/*.md', {eager: true});
    const importPath = `../../content/${slug}.md`;
    return content[importPath] as { body: string; frontmatter: Record<string, any> };
  }, {
    key: () => [params.contentSlug] as [string],
  });
  return contentResult;
}

export default function ContentBySlug() {
  const params = useParams<{ contentSlug: string }>();
  const contentResult = useRouteData<typeof routeData>();

  return (
    <main class="p-3">
      <h1>{params.contentSlug}</h1>
      {/* Show is needed to avoid SSR-ing content when it's undefined.
      This is unlike React, which throws to short circuit at suspense boundary */}
      <Show when={contentResult()}>
        <div class="flex flex-col gap-2" innerHTML={contentResult()!.body}></div>
      </Show>
    </main>
  )
}
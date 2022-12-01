import solid from "solid-start/vite";
import { defineConfig, Plugin } from "vite";
import MarkdownIt from 'markdown-it';
import grayMatter from 'gray-matter';


function markdownPlugin(): any {
  const mdParser = new MarkdownIt();
  return {
    name: 'markdown-plugin',
    transform(code: string, id: string) {
      if (id.endsWith('.md')) {
        const {data: frontmatter, content} = grayMatter(code);
        return `export const body = ${JSON.stringify(mdParser.render(content))};\nexport const frontmatter = ${JSON.stringify(frontmatter)};`
      }
    }
  }
}

export default defineConfig({
  plugins: [solid({
    islands: true,
    islandsRouter: true,
  }), markdownPlugin()],
});

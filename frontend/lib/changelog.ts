import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Aggregates all individual changelog MDX files
 * into a list of all changelog entries
 */
export async function getAllChangelogs() {
  const postsDirectory = path.join(process.cwd(), "content/changelog");
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames.map((fileName) => {
    const update = fileName.replace(/\.mdx$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      update,
      title: data.title,
      date: data.date,
      content,
    };
  });

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

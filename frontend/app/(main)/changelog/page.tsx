import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllChangelogs } from "@/lib/changelog";

export default async function ChangelogIndex() {
  const posts = await getAllChangelogs();

  return (
    <div>
      <div className="space-y-12">
        {posts.map((post) => (
          <div
            key={post.update}
            className="relative pl-8 border-l-2 border-(--border) hover:border-(--border-alt) ease-linear duration-75"
          >
            <span className="text-sm text-(--foreground-alt)">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            <Link href={`/changelog/${post.update}`}>
              <h2 className="text-2xl font-semibold mt-2 hover:text-(--foreground-alt) ease-linear duration-75">
                {post.title}
              </h2>
            </Link>

            <article className="prose prose-p:text-(--foreground) prose-headings:text-(--foreground) prose-li:text-(--foreground) prose-strong:text-(--foreground) prose-invert lg:prose-lg mb-10 line-clamp-8 max-w-none">
              <MDXRemote source={post.content} />
            </article>

            <Link
              href={`/changelog/${post.update}`}
              className="inline-block mt-4 text-md whitespace-nowrap hover:text-(--foreground-alt) ease-linear duration-75"
            >
              Read full update {"->"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

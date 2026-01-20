import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ChangelogPage({
  params,
}: {
  params: { update: string };
}) {
  const resolvedParams = await params;
  const update = resolvedParams.update;
  const filePath = path.join(
    process.cwd(),
    "content/changelog",
    `${update}.mdx`,
  );
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { content, data } = matter(fileContent);

    return (
      <div className="border-t border-b border-(--border) p-10">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <p className="text-(--foreground-alt) mb-8">{data.date}</p>
        <article className="prose prose-p:text-(--foreground) prose-headings:text-(--foreground) prose-li:text-(--foreground) prose-strong:text-(--foreground) prose-invert lg:prose-lg mb-10 max-w-none">
          <MDXRemote source={content} />
        </article>
        <div className="flex gap-2 items-center">
          <h1>Thank you for playing PachinGO!</h1>
          <Image
            src={"/logo_small.png"}
            alt="PachinGO! Logo, small"
            width={25}
            height={25}
            className="w-4 h-4"
          />
        </div>
      </div>
    );
  } catch (e) {
    return notFound();
  }
}

"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function EventBody({ body }: { body: string | null }) {
  if (!body) return null;

  return (
    <div className="prose prose-headings:font-heading prose-p:text-foreground/80 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-strong:text-foreground prose-code:text-foreground/80 prose-pre:bg-background dark:prose-invert max-w-none">
      <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
    </div>
  );
}

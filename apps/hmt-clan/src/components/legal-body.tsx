"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function LegalBody({ content }: { content: string }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed md:text-base prose prose-headings:font-heading prose-headings:text-foreground prose-headings:mt-6 prose-headings:mb-2 prose-p:text-foreground/80 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-strong:text-foreground prose-ul:list-disc prose-ul:space-y-1 prose-ul:pl-5 prose-li:text-foreground/80 dark:prose-invert max-w-none [&_h2:first-child]:mt-0">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}

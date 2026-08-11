import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

const components: Components = {
  h1: (props) => (
    <h1 className="mb-3 mt-7 text-2xl font-semibold tracking-tight first:mt-0" {...props} />
  ),
  h2: (props) => (
    <h2 className="mb-2.5 mt-7 text-xl font-semibold tracking-tight first:mt-0" {...props} />
  ),
  h3: (props) => (
    <h3 className="mb-2 mt-6 text-base font-semibold first:mt-0" {...props} />
  ),
  p: (props) => (
    <p className="my-3 leading-7 first:mt-0 last:mb-0" {...props} />
  ),
  a: (props) => (
    <a
      className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-4 list-outside list-disc space-y-2 pl-5 marker:text-primary" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 list-outside list-decimal space-y-2 pl-5 marker:font-semibold marker:text-primary" {...props} />
  ),
  li: (props) => <li className="pl-1 leading-7" {...props} />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-5 rounded-r-xl border-l-4 border-primary/60 bg-primary/5 px-4 py-3 italic text-foreground/80"
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={`rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.88em] text-foreground ${className ?? ""}`}
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-5 overflow-x-auto rounded-xl border border-border/70 bg-slate-950 p-4 text-sm leading-6 text-slate-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-7 border-border/70" {...props} />,
  table: ({ children, ...props }) => (
    <div className="my-5 overflow-x-auto rounded-xl border border-border/70">
      <table className="min-w-full divide-y divide-border text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: (props) => (
    <th className="bg-muted/70 px-4 py-3 text-left font-semibold" {...props} />
  ),
  td: (props) => (
    <td className="border-t border-border/70 px-4 py-3 align-top" {...props} />
  ),
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="min-w-0 text-[15px] text-foreground/85">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

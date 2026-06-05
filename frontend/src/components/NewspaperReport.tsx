import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

/* ------------------------------------------------------------------ */
/*  Newspaper-themed markdown renderer                                */
/* ------------------------------------------------------------------ */

const components: Components = {
  h1: ({ children }) => (
    <h1 className="col-span-full mb-5 mt-2 border-b-2 border-double border-[#e9c46a]/60 pb-3 font-serif text-3xl font-black leading-tight text-[#f4ecd5] md:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-7 flex items-center gap-2 font-serif text-2xl font-black leading-tight text-[#e9c46a]">
      <span className="inline-block h-4 w-1.5 bg-[#7a1f1f]" />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-5 font-serif text-lg font-bold uppercase tracking-wide text-[#f4ecd5]">
      <span className="mr-2 text-[#e9c46a]">§</span>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-1 mt-4 font-serif text-base font-bold italic text-[#d4c19b]">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 font-serif text-[15px] leading-7 text-[#d4c19b]">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-[#f4ecd5]">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-[#e9c46a]">{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-[#e9c46a] underline decoration-[#e9c46a]/40 underline-offset-2 hover:decoration-[#e9c46a]"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="news-ol mb-5 space-y-2">{children}</ol>
  ),
  li: ({ children, ...props }) => {
    // ordered list items get a counter via CSS; unordered get a diamond marker
    const ordered = (props as { node?: { properties?: Record<string, unknown> } });
    void ordered;
    return (
      <li className="news-li relative pl-7 font-serif text-[15px] leading-7 text-[#d4c19b]">
        {children}
      </li>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-5 border-l-4 border-[#7a1f1f] bg-black/30 px-5 py-3 font-serif text-[15px] italic leading-7 text-[#f4ecd5]">
      <span className="mr-1 font-serif text-2xl leading-none text-[#e9c46a]">“</span>
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-black/50 px-1.5 py-0.5 font-mono text-[13px] text-[#e9c46a]">
      {children}
    </code>
  ),
  hr: () => (
    <hr className="my-7 border-0 border-t-2 border-double border-[#d4c19b]/30" />
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto border border-[#d4c19b]/30">
      <table className="w-full border-collapse text-left font-serif text-[14px]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[#1a1410] text-[#e9c46a]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border-b border-[#d4c19b]/30 px-4 py-2.5 font-bold uppercase tracking-wide text-[#e9c46a]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-[#d4c19b]/15 px-4 py-2.5 text-[#d4c19b]">{children}</td>
  ),
};

export default function NewspaperReport({
  markdown,
  columns = true,
}: {
  markdown: string;
  columns?: boolean;
}) {
  return (
    <div className={columns ? 'news-report news-report-cols' : 'news-report'}>
      <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
    </div>
  );
}

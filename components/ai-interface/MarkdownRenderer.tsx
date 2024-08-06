import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const CustomTable = ({ children }) => (
  <div className="overflow-x-auto my-4">
    <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
      {children}
    </table>
  </div>
);

const CustomTableCell = ({ isHeader, children }) => {
  const Tag = isHeader ? 'th' : 'td';
  return (
    <Tag className={`px-4 py-2 ${isHeader ? 'bg-gray-50 font-semibold text-left' : 'border-t border-gray-200'}`}>
      {children}
    </Tag>
  );
};

const MarkdownRenderer = ({ content }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={{
      h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
      h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-3 mb-2" {...props} />,
      h3: ({ node, ...props }) => <h3 className="text-lg font-medium mt-2 mb-1" {...props} />,
      a: ({ node, ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
      ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
      ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2" {...props} />,
      code: ({ node, inline, ...props }) => 
        inline ? (
          <code className="bg-gray-100 rounded px-1" {...props} />
        ) : (
          <code className="block bg-gray-100 rounded p-2 my-2 overflow-x-auto" {...props} />
        ),
      table: CustomTable,
      th: ({ children }) => <CustomTableCell isHeader={true}>{children}</CustomTableCell>,
      td: ({ children }) => <CustomTableCell isHeader={false}>{children}</CustomTableCell>,
    }}
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownRenderer;
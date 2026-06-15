import ReactMarkdown from "react-markdown";

function ReportViewer({ research }) {
  return (
    <div className="mt-10 w-full max-w-5xl space-y-8">

      <section className="bg-slate-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          📄 Research Report
        </h2>

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>
            {research.report}
          </ReactMarkdown>
        </div>
      </section>


      <section className="bg-slate-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          🧠 Critic Feedback
        </h2>

        <div className="text-gray-300">
          {research.feedback}
        </div>
      </section>

    </div>
  );
}

export default ReportViewer;
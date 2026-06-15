function AgentStatus({ progress =[]}) {

  return (
    <div className="mt-8 w-full max-w-3xl">

      <h2 className="text-2xl font-bold mb-4">
        🤖 Agent Workflow
      </h2>


      <div className="space-y-3">

        {progress.length === 0 ? (
          <p className="text-gray-400">
            Waiting for agents...
          </p>
        ) : (
          progress.map((item, index) => (
            <div
              key={index}
              className="
                p-4
                rounded-lg
                bg-slate-800
                border
                border-slate-700
              "
            >
              <p className="font-semibold">
                {item.agent}
              </p>

              <p className="text-gray-400">
                {item.status}
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default AgentStatus;
import { useState } from "react";

const ReportForm = ({ location, onSubmit, onCancel }) => {
  const [severity, setSeverity] = useState(3);
  const [description, setDescription] = useState("");

  return (
    <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-4 space-y-3">
      <h3 className="font-semibold text-lg">Report Waterlogging</h3>

      <div>
        <label className="text-sm font-medium">Severity</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(Number(e.target.value))}
          className="w-full border rounded p-2 mt-1"
        >
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2 mt-1"
          placeholder="e.g. Road flooded near metro exit"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() =>
            onSubmit({
              ...location,
              severity,
              description,
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>

        <button
          onClick={onCancel}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReportForm;


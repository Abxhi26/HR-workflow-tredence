import { useState } from "react";
import { useWorkflowStore } from "../../../store/workflowStore";
import { useSimulation } from "../../../hooks/useSimulation";

export default function SimulationPanel() {
    const nodes = useWorkflowStore((state) => state.nodes);
    const edges = useWorkflowStore((state) => state.edges);
    const setNodes = useWorkflowStore((state) => state.setNodes);
    const setEdges = useWorkflowStore((state) => state.setEdges);

    const { logs, loading, runSimulation } = useSimulation(nodes, edges);

    const [jsonInput, setJsonInput] = useState("");

    const getNodeStyle = (type: string) => {
        switch (type) {
            case "start":
                return { background: "#22c55e", color: "#fff" };
            case "task":
                return { background: "#3b82f6", color: "#fff" };
            case "approval":
                return { background: "#f59e0b", color: "#fff" };
            case "automation":
                return { background: "#a855f7", color: "#fff" };
            case "end":
                return { background: "#ef4444", color: "#fff" };
            default:
                return { background: "#6b7280", color: "#fff" };
        }
    };

    
    const handleImport = () => {
        try {
            const parsed = JSON.parse(jsonInput);

            const formattedNodes = (parsed.nodes || []).map((node: any) => {
                const d = node.data || {};

                let data: any = {
                    label: d.title || `${node.type} node`,
                    title: d.title || "",
                };

                if (node.type === "task") {
                    data = {
                        ...data,
                        description: d.description || "",
                        assignee: d.assignee || "",
                        dueDate: d.dueDate || "",
                    };
                }

                if (node.type === "approval") {
                    data = {
                        ...data,
                        approverRole: d.approverRole || "",
                        threshold: d.threshold || "",
                    };
                }

                if (node.type === "automation") {
                    data = {
                        ...data,
                        action: d.actionId || "",
                        ...(d.params || {}),
                    };
                }

                if (node.type === "end") {
                    data = {
                        ...data,
                        message: d.message || "",
                        summary: d.summary || false,
                    };
                }

                return {
                    ...node,
                    data,
                    style: {
                        ...getNodeStyle(node.type),
                        borderRadius: "10px",
                        padding: "10px",
                    },
                };
            });

            setNodes(formattedNodes);
            setEdges(parsed.edges || []);

            alert("Workflow imported successfully!");
        } catch (err) {
            console.error(err);
            alert("Invalid JSON");
        }
    };

    return (
        <div className="bg-[#0f172a] border border-gray-700 rounded-lg shadow p-4">

            <h2 className="text-white text-lg mb-3">Simulation</h2>

            <button
                onClick={runSimulation}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded"
            >
                {loading ? "Running..." : "Run Simulation"}
            </button>

            <div className="mt-3 max-h-40 overflow-auto text-sm text-gray-300 space-y-1">
                {logs.length === 0
                    ? "No simulation yet"
                    : logs.map((log, i) => (
                        <div key={i} className="bg-gray-800 p-2 rounded">
                            {log}
                        </div>
                    ))}
            </div>

            <button
                onClick={() => {
                    const data = JSON.stringify({ nodes, edges }, null, 2);
                    navigator.clipboard.writeText(data);
                    alert("Copied!");
                }}
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded"
            >
                Export JSON
            </button>

            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste JSON here"
                className="w-full mt-3 p-2 bg-gray-800 text-white rounded border border-gray-600"
            />

            <button
                onClick={handleImport}
                className="w-full mt-2 bg-green-500 text-white py-2 rounded"
            >
                Import JSON
            </button>
        </div>
    );
}
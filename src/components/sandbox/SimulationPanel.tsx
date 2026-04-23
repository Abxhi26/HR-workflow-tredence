import { useWorkflowStore } from "../../../store/workflowStore";
import { useState } from "react";

export default function SimulationPanel() {
    const nodes = useWorkflowStore((state) => state.nodes);
    const edges = useWorkflowStore((state) => state.edges);

    const [logs, setLogs] = useState<string[]>([]);

    const handleRunSimulation = () => {
        const result: string[] = [];

        if (nodes.length === 0) {
            result.push("No nodes in workflow");
            setLogs(result);
            return;
        }

        // simple simulation (sequential for now)
        nodes.forEach((node: any) => {
            result.push(`${node.type} node executed`);
        });

        result.push("Workflow completed");

        setLogs(result);
    };

    return (
        <div className="bg-[#0f172a] border border-gray-700 rounded-lg shadow p-4">

            {/* Header */}
            <h2 className="text-lg font-semibold mb-4 text-white">
                Simulation
            </h2>

            {/* Run Button */}
            <button
                onClick={handleRunSimulation}
                className="
                    w-full 
                    py-2 
                    rounded-lg 
                    text-white 
                    font-medium
                    bg-gradient-to-r from-purple-500 to-purple-700
                    hover:from-purple-600 hover:to-purple-800
                    transition 
                    shadow-md
                "
            >
                Run Simulation
            </button>

            {/* Logs */}
            <div className="mt-4 bg-gray-800 rounded p-3 text-sm text-gray-300 space-y-1 max-h-40 overflow-y-auto">
                {logs.length === 0 ? (
                    <div className="text-gray-500">
                        No simulation run yet
                    </div>
                ) : (
                    logs.map((log, index) => (
                        <div key={index}>{log}</div>
                    ))
                )}
            </div>
        </div>
    );
}
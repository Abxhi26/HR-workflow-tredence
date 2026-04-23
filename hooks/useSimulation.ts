import { useState } from "react";
import { simulateWorkflow } from "../services/api";

export function useSimulation(nodes: any[], edges: any[]) {
    const [logs, setLogs] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const runSimulation = async () => {
        if (!nodes.length) {
            alert("No nodes in workflow");
            return;
        }

        const hasStart = nodes.some((n) => n.type === "start");
        const hasEnd = nodes.some((n) => n.type === "end");

        if (!hasStart) return alert("Add Start Node");
        if (!hasEnd) return alert("Add End Node");
        if (!edges.length) return alert("Connect nodes");

        setLoading(true);
        setLogs([]);

        try {
            const result = await simulateWorkflow({ nodes, edges });

            for (let step of result) {
                await new Promise((res) => setTimeout(res, 400));
                setLogs((prev) => [...prev, step]);
            }
        } catch {
            alert("Simulation failed");
        }

        setLoading(false);
    };

    return {
        logs,
        loading,
        runSimulation,
    };
}
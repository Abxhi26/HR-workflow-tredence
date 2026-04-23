// 🔹 Mock Automation Actions API
export const getAutomations = async () => {
    return [
        {
            id: "send_email",
            label: "Send Email",
            params: ["to", "subject"],
        },
        {
            id: "generate_doc",
            label: "Generate Document",
            params: ["template", "recipient"],
        },
    ];
};

// 🔥 Smart Workflow Simulation API
export const simulateWorkflow = async (workflow: any) => {
    const { nodes, edges } = workflow;

    const logs: string[] = [];

    // 🔹 Find Start Node
    const startNode = nodes.find((n: any) => n.type === "start");

    if (!startNode) {
        return ["❌ No Start Node found"];
    }

    let currentNode = startNode;
    const visited = new Set();

    while (currentNode && !visited.has(currentNode.id)) {
        visited.add(currentNode.id);

        // 🔥 Dynamic Execution Logs
        switch (currentNode.type) {
            case "start":
                logs.push(
                    `🚀 Start: ${currentNode.data?.title || "Workflow started"}`
                );
                break;

            case "task":
                logs.push(
                    `📝 Task: ${currentNode.data?.title || "Task"} → Assigned to ${currentNode.data?.assignee || "N/A"
                    }`
                );
                break;

            case "approval":
                logs.push(
                    `✅ Approval: ${currentNode.data?.approverRole || "Manager"
                    }`
                );
                break;

            case "automation":
                logs.push(
                    `⚙️ Automation: ${currentNode.data?.action || "Action executed"
                    }`
                );

                // Optional: show parameters
                const params = Object.entries(currentNode.data || {})
                    .filter(
                        ([k]) =>
                            !["label", "title", "action"].includes(k)
                    )
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(", ");

                if (params) {
                    logs.push(`   ↳ ${params}`);
                }

                break;

            case "end":
                logs.push("🏁 Workflow completed");
                return logs;
        }

        // 🔹 Move to next node
        const nextEdge = edges.find(
            (e: any) => e.source === currentNode.id
        );

        if (!nextEdge) break;

        currentNode = nodes.find(
            (n: any) => n.id === nextEdge.target
        );
    }

    logs.push("⚠️ Workflow ended unexpectedly");
    return logs;
};
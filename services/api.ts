export const getAutomations = async () => {
    return [
        { id: "send_email", label: "Send Email", params: ["to", "subject"] },
        { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
    ];
};

export const simulateWorkflow = async (workflow: any) => {
    console.log("Simulating:", workflow);

    return [
        "Start Node executed",
        "Task Node executed",
        "Approval Node checked",
        "Workflow completed",
    ];
};
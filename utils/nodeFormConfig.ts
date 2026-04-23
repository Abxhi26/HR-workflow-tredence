export const nodeFormConfig: any = {
    start: [
        { key: "title", label: "Start Title", type: "text" },
    ],
    task: [
        { key: "title", label: "Title", type: "text", required: true },
        { key: "description", label: "Description", type: "text" },
        { key: "assignee", label: "Assignee", type: "text" },
        { key: "dueDate", label: "Due Date", type: "date" },
    ],
    approval: [
        { key: "title", label: "Title", type: "text" },
        { key: "approverRole", label: "Approver Role", type: "text" },
        { key: "threshold", label: "Auto Approve Threshold", type: "number" },
    ],
    automation: [
        { key: "title", label: "Title", type: "text" },
        { key: "action", label: "Action", type: "select" },
    ],
    end: [
        { key: "message", label: "End Message", type: "text" },
        { key: "summary", label: "Summary", type: "checkbox" },
    ],
};
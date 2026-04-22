const nodeTypes = [
    { type: "start", label: "Start Node" },
    { type: "task", label: "Task Node" },
    { type: "approval", label: "Approval Node" },
    { type: "automation", label: "Automation Node" },
    { type: "end", label: "End Node" },
];

export default function Sidebar() {
    const onDragStart = (event: any, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-3">Nodes</h2>
            {nodeTypes.map((node) => (
                <div
                    key={node.type}
                    draggable
                    onDragStart={(e) => onDragStart(e, node.type)}
                    className="p-2 mb-2 bg-white border rounded cursor-pointer hover:bg-gray-100"
                >
                    {node.label}
                </div>
            ))}
        </div>
    );
}
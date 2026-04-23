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
        <div className="h-full flex flex-col">

            {/* Header */}
            <h2 className="text-lg font-semibold mb-4 text-white">
                Nodes
            </h2>

            {/* Node List */}
            <div className="space-y-3">
                {nodeTypes.map((node) => (
                    <div
                        key={node.type}
                        draggable
                        onDragStart={(e) => onDragStart(e, node.type)}
                        className="
                            p-3 
                            rounded-lg 
                            bg-gray-700 
                            text-white 
                            cursor-pointer 
                            hover:bg-purple-600 
                            transition 
                            text-center 
                            shadow-sm
                        "
                    >
                        {node.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
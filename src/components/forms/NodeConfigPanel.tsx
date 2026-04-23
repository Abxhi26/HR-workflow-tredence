import { useWorkflowStore } from "../../../store/workflowStore";
import { nodeFormConfig } from "../../../utils/nodeFormConfig";

export default function NodeConfigPanel() {
    const nodes = useWorkflowStore((state) => state.nodes);
    const edges = useWorkflowStore((state) => state.edges); // ✅ FIX
    const selectedNodeId = useWorkflowStore(
        (state) => state.selectedNodeId
    );
    const setNodes = useWorkflowStore((state) => state.setNodes);
    const setEdges = useWorkflowStore((state) => state.setEdges); // ✅ FIX

    const selectedNode = nodes.find(
        (n: any) => n.id === selectedNodeId
    );

    if (!selectedNode) {
        return (
            <div className="bg-[#0f172a] border border-gray-700 rounded-lg shadow p-4 text-sm text-gray-400">
                Select a node to edit
            </div>
        );
    }

    const config = nodeFormConfig[selectedNode.type] || [];

    const handleChange = (key: string, value: any) => {
        const updatedNodes = nodes.map((node: any) => {
            if (node.id === selectedNodeId) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        [key]: value,
                    },
                };
            }
            return node;
        });

        setNodes(updatedNodes);
    };

    const handleDelete = () => {
        if (!confirm("Delete this node?")) return;

        const updatedNodes = nodes.filter(
            (node: any) => node.id !== selectedNodeId
        );

        const updatedEdges = edges.filter(
            (edge: any) =>
                edge.source !== selectedNodeId &&
                edge.target !== selectedNodeId
        );

        setNodes(updatedNodes);
        setEdges(updatedEdges);
    };

    return (
        <div className="bg-[#0f172a] border border-gray-700 rounded-lg shadow p-4 mb-4">

            {/* Header */}
            <h2 className="text-lg font-semibold mb-4 capitalize text-white">
                {selectedNode.type} Config
            </h2>

            {/* Form Fields */}
            <div className="space-y-3">
                {config.map((field: any) => (
                    <div key={field.key}>
                        <label className="block text-sm mb-1 text-gray-300">
                            {field.label}
                        </label>

                        {field.type === "checkbox" ? (
                            <input
                                type="checkbox"
                                checked={selectedNode.data?.[field.key] || false}
                                onChange={(e) =>
                                    handleChange(field.key, e.target.checked)
                                }
                                className="w-4 h-4"
                            />
                        ) : (
                            <input
                                type={field.type}
                                value={selectedNode.data?.[field.key] || ""}
                                onChange={(e) =>
                                    handleChange(field.key, e.target.value)
                                }
                                placeholder={`Enter ${field.label}`}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        )}
                    </div>
                ))}
            </div>

            {config.length === 0 && (
                <div className="text-sm text-gray-400 mt-2">
                    No configuration available
                </div>
            )}

            {/* 🔥 DELETE BUTTON */}
            <button
                onClick={handleDelete}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
            >
                Delete Node
            </button>
        </div>
    );
}
import { useWorkflowStore } from "../../../store/workflowStore";
import { nodeFormConfig } from "../../../utils/nodeFormConfig";

export default function NodeConfigPanel() {
    const { nodes, selectedNodeId, setNodes } = useWorkflowStore();

    const selectedNode = nodes.find((n: any) => n.id === selectedNodeId);

    if (!selectedNode) {
        return <div>Select a node to edit</div>;
    }

    const config = nodeFormConfig[selectedNode.type];

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

    return (
        <div>
            <h2 className="text-lg font-semibold mb-3">
                {selectedNode.type.toUpperCase()} CONFIG
            </h2>

            {config.map((field: any) => (
                <div key={field.key} className="mb-3">
                    <label className="block text-sm mb-1">{field.label}</label>

                    {field.type === "checkbox" ? (
                        <input
                            type="checkbox"
                            checked={selectedNode.data[field.key] || false}
                            onChange={(e) =>
                                handleChange(field.key, e.target.checked)
                            }
                        />
                    ) : (
                        <input
                            type={field.type}
                            value={selectedNode.data[field.key] || ""}
                            onChange={(e) =>
                                handleChange(field.key, e.target.value)
                            }
                            className="w-full p-2 border rounded"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
import { useWorkflowStore } from "../store/workflowStore";

export const useWorkflowActions = () => {
    const nodes = useWorkflowStore((s) => s.nodes);
    const edges = useWorkflowStore((s) => s.edges);
    const setNodes = useWorkflowStore((s) => s.setNodes);
    const setEdges = useWorkflowStore((s) => s.setEdges);
    const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId);

    const updateNode = (key: string, value: any) => {
        const updated = nodes.map((node: any) =>
            node.id === selectedNodeId
                ? {
                    ...node,
                    data: {
                        ...node.data,
                        [key]: value,
                    },
                }
                : node
        );

        setNodes(updated);
    };

    const deleteNode = () => {
        const filteredNodes = nodes.filter(
            (n: any) => n.id !== selectedNodeId
        );

        const filteredEdges = edges.filter(
            (e: any) =>
                e.source !== selectedNodeId &&
                e.target !== selectedNodeId
        );

        setNodes(filteredNodes);
        setEdges(filteredEdges);
    };

    return {
        nodes,
        edges,
        updateNode,
        deleteNode,
    };
};
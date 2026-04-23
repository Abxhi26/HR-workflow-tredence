import ReactFlow, {
    Background,
    Controls,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
} from "reactflow";

import type {
    Connection,
    NodeChange,
    EdgeChange,
} from "reactflow";

import "reactflow/dist/style.css";

import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { useWorkflowStore } from "../../../store/workflowStore";

export default function WorkflowCanvas() {
    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        setSelectedNodeId,
    } = useWorkflowStore();

    // 🎨 Node Colors
    const getNodeStyle = (type: string) => {
        switch (type) {
            case "start":
                return { background: "#22c55e", color: "#fff" };
            case "task":
                return { background: "#3b82f6", color: "#fff" };
            case "approval":
                return { background: "#f59e0b", color: "#fff" };
            case "automation":
                return { background: "#a855f7", color: "#fff" };
            case "end":
                return { background: "#ef4444", color: "#fff" };
            default:
                return { background: "#6b7280", color: "#fff" };
        }
    };

    // 🔥 Format node label dynamically
    const formatNodeLabel = (data: any) => {
        const title = data.title || data.label;

        const extra = Object.entries(data)
            .filter(([k]) => k !== "label" && k !== "title")
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n");

        return extra ? `${title}\n${extra}` : title;
    };

    // ✅ Node updates
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            setNodes(applyNodeChanges(changes, nodes));
        },
        [nodes, setNodes]
    );

    // ✅ Edge updates
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            setEdges(applyEdgeChanges(changes, edges));
        },
        [edges, setEdges]
    );

    // 🔗 Connect
    const onConnect = useCallback(
        (params: Connection) => {
            setEdges(addEdge(params, edges));
        },
        [edges, setEdges]
    );

    // ✅ Drag over
    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    // 🔥 Drop node with style + label
    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");
            if (!type) return;

            const position = {
                x: event.clientX - 250,
                y: event.clientY - 100,
            };

            const newNode = {
                id: uuidv4(),
                type,
                position,
                data: {
                    label: `${type} node`,
                },
                style: {
                    ...getNodeStyle(type),
                    borderRadius: "10px",
                    padding: "10px",
                    fontWeight: "500",
                    border: "1px solid rgba(255,255,255,0.2)",
                    whiteSpace: "pre-line", // 🔥 multiline support
                },
            };

            setNodes([...nodes, newNode]);
        },
        [nodes, setNodes]
    );

    // 🎯 Node click
    const onNodeClick = useCallback(
        (_: any, node: any) => {
            console.log("Selected Node:", node.id);
            setSelectedNodeId(node.id);
        },
        [setSelectedNodeId]
    );

    // 🔥 Inject dynamic labels (IMPORTANT)
    const updatedNodes = nodes.map((node: any) => ({
        ...node,
        data: {
            ...node.data,
            label: formatNodeLabel(node.data),
        },
    }));

    return (
        <div className="h-full bg-[#0f172a]">
            <ReactFlow
                nodes={updatedNodes} // ✅ IMPORTANT CHANGE
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                fitView
            >
                <Background color="#444" gap={20} />
                <Controls />
            </ReactFlow>
        </div>
    );
}
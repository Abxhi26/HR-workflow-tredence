import ReactFlow, {
    Background,
    Controls,
    MiniMap,
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
                return { background: "#22c55e", color: "#fff" }; // green
            case "task":
                return { background: "#3b82f6", color: "#fff" }; // blue
            case "approval":
                return { background: "#f59e0b", color: "#fff" }; // yellow
            case "automation":
                return { background: "#a855f7", color: "#fff" }; // purple
            case "end":
                return { background: "#ef4444", color: "#fff" }; // red
            default:
                return { background: "#6b7280", color: "#fff" };
        }
    };

    // ✅ Handle node updates
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            setNodes(applyNodeChanges(changes, nodes));
        },
        [nodes, setNodes]
    );

    // ✅ Handle edge updates
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            setEdges(applyEdgeChanges(changes, edges));
        },
        [edges, setEdges]
    );

    // 🔗 Styled + Animated Edges
    const onConnect = useCallback(
        (params: Connection) => {
            const newEdge = {
                ...params,
                animated: true,
                style: {
                    stroke: "#a855f7",
                    strokeWidth: 2,
                },
            };

            setEdges(addEdge(newEdge, edges));
        },
        [edges, setEdges]
    );

    // ✅ Drag over
    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    // 📍 Drop node
    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");

            if (!type) return;

            // Better positioning (relative to canvas)
            const bounds = event.currentTarget.getBoundingClientRect();

            const position = {
                x: event.clientX - bounds.left,
                y: event.clientY - bounds.top,
            };

            const newNode = {
                id: uuidv4(),
                type,
                position,
                data: { label: `${type} node` },
                style: {
                    ...getNodeStyle(type),
                    borderRadius: "10px",
                    padding: "10px",
                    fontWeight: "500",
                    border: "1px solid rgba(255,255,255,0.2)",
                },
            };

            setNodes([...nodes, newNode]);
        },
        [nodes, setNodes]
    );

    // 🎯 Node selection
    const onNodeClick = useCallback(
        (_: any, node: any) => {
            setSelectedNodeId(node.id);
        },
        [setSelectedNodeId]
    );

    return (
        <div className="w-full h-full bg-gray-900">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                fitView
            >
                {/* Grid */}
                <Background color="#555" gap={20} />

                {/* Controls */}
                <Controls />

                {/* MiniMap (🔥 looks impressive) */}
                <MiniMap
                    nodeColor={(node) => {
                        switch (node.type) {
                            case "start":
                                return "#22c55e";
                            case "task":
                                return "#3b82f6";
                            case "approval":
                                return "#f59e0b";
                            case "automation":
                                return "#a855f7";
                            case "end":
                                return "#ef4444";
                            default:
                                return "#999";
                        }
                    }}
                />
            </ReactFlow>
        </div>
    );
}
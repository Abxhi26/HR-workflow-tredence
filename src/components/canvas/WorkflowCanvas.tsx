import ReactFlow, {
    Background,
    Controls,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
} from "reactflow";

import type {
    Connection,
    Edge,
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

    // ✅ FIXED: Proper node changes handling
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            setNodes(applyNodeChanges(changes, nodes));
        },
        [nodes, setNodes]
    );

    // ✅ FIXED: Proper edge changes handling
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            setEdges(applyEdgeChanges(changes, edges));
        },
        [edges, setEdges]
    );

    // ✅ Connect nodes
    const onConnect = useCallback(
        (params: Connection) => {
            setEdges(addEdge(params, edges));
        },
        [edges, setEdges]
    );

    // ✅ Drag over (must prevent default)
    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    // ✅ Drop node on canvas
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
                data: { label: `${type} node` },
            };

            setNodes([...nodes, newNode]);
        },
        [nodes, setNodes]
    );

    // ✅ Node selection
    const onNodeClick = useCallback(
        (_: any, node: any) => {
            console.log("Selected Node:", node.id);
            setSelectedNodeId(node.id);
        },
        [setSelectedNodeId]
    );

    return (
        <div className="h-full">
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
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
export type NodeType =
    | "start"
    | "task"
    | "approval"
    | "automation"
    | "end";

export interface WorkflowNode {
    id: string;
    type: NodeType;
    position: { x: number; y: number };
    data: any;
}

export interface WorkflowState {
    nodes: WorkflowNode[];
    edges: any[];
    selectedNodeId: string | null;
}
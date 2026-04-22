import { create } from "zustand";

type WorkflowState = {
    nodes: any[];
    edges: any[];
    selectedNodeId: string | null;

    setNodes: (nodes: any[]) => void;
    setEdges: (edges: any[]) => void;
    setSelectedNodeId: (id: string) => void;
};

export const useWorkflowStore = create<WorkflowState>((set) => ({
    nodes: [],
    edges: [],
    selectedNodeId: null,

    setNodes: (nodes: any) => set({ nodes }),
    setEdges: (edges: any) => set({ edges }),
    setSelectedNodeId: (id: any) => set({ selectedNodeId: id }),
}));
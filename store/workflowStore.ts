import { create } from "zustand";

export const useWorkflowStore = create((set) => ({
    nodes: [],
    edges: [],
    selectedNodeId: null,

    setNodes: (nodes: any) => set({ nodes }),
    setEdges: (edges: any) => set({ edges }),
    setSelectedNodeId: (id: any) => set({ selectedNodeId: id }),
}));
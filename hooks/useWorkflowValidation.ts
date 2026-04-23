export function useWorkflowValidation(nodes: any[], edges: any[]) {
    const validate = () => {
        const errors: string[] = [];

        if (!nodes.some(n => n.type === "start")) {
            errors.push("Missing Start Node");
        }

        if (!nodes.some(n => n.type === "end")) {
            errors.push("Missing End Node");
        }

        if (nodes.length > 1 && edges.length === 0) {
            errors.push("Nodes are not connected");
        }

        return errors;
    };

    return { validate };
}
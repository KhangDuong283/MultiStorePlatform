import { useMutation } from "@tanstack/react-query";
import { callGetToolByToolId } from "../../../services/ToolService";

export function useGetToolByToolId() {
    const { mutateAsync: getToolByToolId, isLoading: isLoadingTool, error } = useMutation({
        queryKey: ["tools"],
        mutationFn: (toolId) => {
            if (toolId) {
                return callGetToolByToolId(toolId);
            }
        },
    });

    return { getToolByToolId, isLoadingTool, error };
}
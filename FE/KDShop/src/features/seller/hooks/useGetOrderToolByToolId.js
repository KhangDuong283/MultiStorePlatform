import { useMutation } from "@tanstack/react-query";
import { callGetOrderToolByToolId } from "../../../services/OrderToolService";

export function useGetOrderToolByToolId() {
    const { mutateAsync: getOrderToolByToolId, isLoading, error } = useMutation({
        queryKey: ["order-tools"],
        mutationFn: (toolId) => {
            if (toolId) {
                return callGetOrderToolByToolId(toolId);
            }
        },
    });

    return { getOrderToolByToolId, isLoading, error };
}

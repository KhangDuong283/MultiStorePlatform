package com.dlk.ct466.domain.mapper;

import com.dlk.ct466.domain.entity.OrderTool;
import com.dlk.ct466.domain.response.orderTool.ResCreateOrderToolDTO;
import com.dlk.ct466.domain.response.orderTool.ResOrderToolDTO;
import com.dlk.ct466.domain.response.orderTool.ResUpdateOrderToolDTO;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class OrderToolMapper {

    public static ResCreateOrderToolDTO mapToCreateOrderToolDTO(OrderTool orderTool) {
        ResCreateOrderToolDTO.ToolInOrderTool tool = new ResCreateOrderToolDTO.ToolInOrderTool();
        tool.setToolId(orderTool.getTool().getToolId());
        tool.setName(orderTool.getTool().getName());

        ResCreateOrderToolDTO.OrderInOrderTool order = new ResCreateOrderToolDTO.OrderInOrderTool();
        order.setOrderId(orderTool.getOrder().getOrderId());
        order.setShippingCost(orderTool.getOrder().getShippingCost());

        return ResCreateOrderToolDTO.builder()
                .orderToolId(orderTool.getOrderToolId())
                .quantity(orderTool.getQuantity())
                .tool(tool)
                .order(order)
                .createdAt(orderTool.getCreatedAt())
                .createdBy(orderTool.getCreatedBy())
                .build();
    }

    public static ResUpdateOrderToolDTO mapToUpdateOrderToolDTO(OrderTool orderTool) {
        ResUpdateOrderToolDTO.ToolInOrderTool tool = new ResUpdateOrderToolDTO.ToolInOrderTool();
        tool.setToolId(orderTool.getTool().getToolId());
        tool.setName(orderTool.getTool().getName());

        ResUpdateOrderToolDTO.OrderInOrderTool order = new ResUpdateOrderToolDTO.OrderInOrderTool();
        order.setOrderId(orderTool.getOrder().getOrderId());
        order.setShippingCost(orderTool.getOrder().getShippingCost());

        return ResUpdateOrderToolDTO.builder()
                .orderToolId(orderTool.getOrderToolId())
                .quantity(orderTool.getQuantity())
                .tool(tool)
                .order(order)
                .updatedAt(orderTool.getUpdatedAt())
                .updatedBy(orderTool.getUpdatedBy())
                .build();
    }

    public static ResOrderToolDTO mapToOrderToolDTO(OrderTool orderTool) {
        ResOrderToolDTO.ToolInOrderTool tool = new ResOrderToolDTO.ToolInOrderTool();
        tool.setToolId(orderTool.getTool().getToolId());
        tool.setName(orderTool.getTool().getName());

        ResOrderToolDTO.OrderInOrderTool order = new ResOrderToolDTO.OrderInOrderTool();
        order.setOrderId(orderTool.getOrder().getOrderId());
        order.setShippingCost(orderTool.getOrder().getShippingCost());

        return ResOrderToolDTO.builder()
                .orderToolId(orderTool.getOrderToolId())
                .quantity(orderTool.getQuantity())
                .tool(tool)
                .order(order)
                .createdAt(orderTool.getCreatedAt())
                .createdBy(orderTool.getCreatedBy())
                .updatedAt(orderTool.getUpdatedAt())
                .updatedBy(orderTool.getUpdatedBy())
                .build();
    }
}

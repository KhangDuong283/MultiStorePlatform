package com.dlk.ct466.service;

import com.dlk.ct466.domain.entity.Tool;
import com.dlk.ct466.domain.entity.ToolType;
import com.dlk.ct466.domain.entity.User;
import com.dlk.ct466.domain.response.ResPaginationDTO;
import com.dlk.ct466.repository.ToolRepository;
import com.dlk.ct466.repository.ToolTypeRepository;
import com.dlk.ct466.repository.UserRepository;
import com.dlk.ct466.util.PaginationUtil;
import com.dlk.ct466.util.error.IdInvalidException;
import com.turkraft.springfilter.converter.FilterSpecification;
import com.turkraft.springfilter.converter.FilterSpecificationConverter;
import com.turkraft.springfilter.parser.FilterParser;
import com.turkraft.springfilter.parser.node.FilterNode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ToolService {
    private final ToolRepository toolRepository;
    private final ToolTypeRepository toolTypeRepository;

    private final FilterParser filterParser;
    private final FilterSpecificationConverter filterSpecificationConverter;
    private final UserRepository userRepository;
    private final UserService userService;
    private final ToolTypeService toolTypeService;

    public Tool getToolById(long toolId) throws IdInvalidException {
        return toolRepository.findByIdIfNotDeleted(toolId).orElseThrow(
                () -> new IdInvalidException("Tool with id: " + toolId + " not found")
        );
    }

    public Tool getToolByIdAdmin(long toolId) throws IdInvalidException {
        return toolRepository.findById(toolId).orElseThrow(
                () -> new IdInvalidException("Tool with id: " + toolId + " not found")
        );
    }

    public Tool createTool(Tool tool) throws IdInvalidException {
        if (tool.getToolType() != null) {
            long toolTypeId = tool.getToolType().getToolTypeId();
            ToolType toolType = toolTypeRepository.findById(toolTypeId).orElseThrow(
                    () -> new IdInvalidException("Tool type with id: " + toolTypeId + " not found")
            );
            tool.setToolType(toolType);
        }
        return toolRepository.save(tool);
    }

    public Tool updateTool(Tool tool, long id) throws IdInvalidException {
        Tool dbTool = getToolById(id);
        dbTool.setName(tool.getName());
        dbTool.setDescription(tool.getDescription());
        dbTool.setPrice(tool.getPrice());
        dbTool.setDiscountedPrice(tool.getDiscountedPrice());
        dbTool.setStockQuantity(tool.getStockQuantity());
        dbTool.setImageUrl(tool.getImageUrl());
        return toolRepository.save(dbTool);
    }

    public Void deleteTool(Long toolId) throws IdInvalidException {
        Tool dbTool = getToolById(toolId);
        toolRepository.delete(dbTool); // đây là xóa mềm do đã thiết lập SQL ở model
        return null;
    }

    public Void restoreTool(Long toolId) throws IdInvalidException {
        Tool dbTool = toolRepository.getToolDeletedById(toolId).orElseThrow(
                () -> new IdInvalidException("Tool with id: " + toolId + " not found or haven't deleted yet")
        );
        dbTool.setDeleted(false);
        toolRepository.save(dbTool);
        return null;
    }

    public ResPaginationDTO getAllTool(Pageable pageable) {
        FilterNode node = filterParser.parse("deleted=false");
        FilterSpecification<Tool> spec = filterSpecificationConverter.convert(node);

        Page<Tool> pageTools = toolRepository.findAll(spec, pageable);
        return PaginationUtil.getPaginatedResult(pageTools, pageable);
    }

    public ResPaginationDTO getAllToolAdmin(Pageable pageable) {
        Page<Tool> pageTools = toolRepository.findAll(pageable);
        return PaginationUtil.getPaginatedResult(pageTools, pageable);
    }

    public ResPaginationDTO getToolByUserId(Pageable pageable, String id) throws IdInvalidException {
        userService.fetchUserById(id);
        FilterNode node = filterParser.parse("deleted=false and user.id='" + id + "'");
        FilterSpecification<Tool> spec = filterSpecificationConverter.convert(node);

        Page<Tool> pageTools = toolRepository.findAll(spec, pageable);
        return PaginationUtil.getPaginatedResult(pageTools, pageable);
    }

    public ResPaginationDTO getToolByTypeId(Pageable pageable, long id) throws IdInvalidException {
        toolTypeService.getToolTypeById(id);
        FilterNode node = filterParser.parse("deleted=false and toolType.id='" + id + "'");
        FilterSpecification<Tool> spec = filterSpecificationConverter.convert(node);

        Page<Tool> pageTools = toolRepository.findAll(spec, pageable);
        return PaginationUtil.getPaginatedResult(pageTools, pageable);
    }
}

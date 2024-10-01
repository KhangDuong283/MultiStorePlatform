package com.dlk.ct466.service;

import com.dlk.ct466.domain.entity.Tool;
import com.dlk.ct466.repository.ToolRepository;
import com.dlk.ct466.repository.ToolTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ToolTypeService {
    private final ToolTypeRepository toolTypeRepository;


}


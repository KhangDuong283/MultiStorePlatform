package com.dlk.ct466.repository;

import com.dlk.ct466.domain.entity.ToolType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ToolTypeRepository extends JpaRepository<ToolType, Long>,
        JpaSpecificationExecutor<ToolType> {
}

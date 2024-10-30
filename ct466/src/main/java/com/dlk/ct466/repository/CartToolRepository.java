package com.dlk.ct466.repository;

import com.dlk.ct466.domain.entity.CartTool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartToolRepository extends JpaRepository<CartTool, Long> {
}

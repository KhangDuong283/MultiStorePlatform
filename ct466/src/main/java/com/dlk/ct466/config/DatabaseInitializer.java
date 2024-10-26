package com.dlk.ct466.config;

import com.dlk.ct466.domain.entity.Permission;
import com.dlk.ct466.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {
    private final PermissionRepository permissionRepository;

    @Override
    public void run(String... args) throws Exception {

    }
}

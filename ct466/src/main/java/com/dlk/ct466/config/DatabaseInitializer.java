package com.dlk.ct466.config;

import com.dlk.ct466.domain.entity.Permission;
import com.dlk.ct466.domain.entity.Role;
import com.dlk.ct466.domain.entity.RolePermission;
import com.dlk.ct466.domain.entity.User;
import com.dlk.ct466.repository.PermissionRepository;
import com.dlk.ct466.repository.RolePermissionRepository;
import com.dlk.ct466.repository.RoleRepository;
import com.dlk.ct466.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {
    private final PermissionRepository permissionRepository;
    private final RolePermissionRepository rolePermissionRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println(">>> START INIT DATABASE");
        long countPermissions = permissionRepository.count();
        long countRoles = roleRepository.count();
        long countUsers = userRepository.count();


        if (countPermissions == 0) {
            ArrayList<Permission> arr = new ArrayList<>();
            arr.add(new Permission("Create a tool", "/api/v1/tools", "POST", "tools"));
            arr.add(new Permission("Get a tool by id", "/api/v1/tools/{id}", "GET", "tools"));
            arr.add(new Permission("Get tools with pagination", "/api/v1/tools", "GET", "tools"));
            arr.add(new Permission("Get tools owner by user id", "/api/v1/tools/{id}", "GET", "tools"));
            arr.add(new Permission("Get tools by type id", "/api/v1/tools/type-tools/{id}", "GET", "tools"));
            arr.add(new Permission("Update a tool", "/api/v1/tools/{id}", "PUT", "tools"));
            arr.add(new Permission("Delete a tool", "/api/v1/tools/{id}", "DELETE", "tools"));
            arr.add(new Permission("Restore a tool", "/api/v1/tools/{id}", "PATCH", "tools"));

            arr.add(new Permission("Create a tooltypes", "/api/v1/tooltypes", "POST", "tooltypes"));
            arr.add(new Permission("Update a tooltypes", "/api/v1/tooltypes/{id}", "PUT", "tooltypes"));
            arr.add(new Permission("Delete a tooltypes", "/api/v1/tooltypes/{id}", "DELETE", "tooltypes"));
            arr.add(new Permission("Get a tooltypes by id", "/api/v1/tooltypes/{id}", "GET", "tooltypes"));
            arr.add(new Permission("Restore tooltypes by id", "/api/v1/tooltypes/{id}", "PATCH", "tooltypes"));
            arr.add(new Permission("Get tooltypes with pagination", "/api/v1/tooltypes", "GET", "tooltypes"));

            arr.add(new Permission("Create a permission", "/api/v1/permissions", "POST", "PERMISSIONS"));
            arr.add(new Permission("Get a permission by id", "/api/v1/permissions/{id}", "GET", "PERMISSIONS"));
            arr.add(new Permission("Get permissions with pagination", "/api/v1/permissions", "GET", "PERMISSIONS"));
            arr.add(new Permission("Update a permission", "/api/v1/permissions/{id}", "PUT", "PERMISSIONS"));
            arr.add(new Permission("Delete a permission", "/api/v1/permissions/{id}", "DELETE", "PERMISSIONS"));
            arr.add(new Permission("Restore a permission", "/api/v1/permissions/{id}", "PATCH", "PERMISSIONS"));

            arr.add(new Permission("Create a role", "/api/v1/roles", "POST", "ROLES"));
            arr.add(new Permission("Get a role by id", "/api/v1/roles/{id}", "GET", "ROLES"));
            arr.add(new Permission("Get roles with pagination", "/api/v1/roles", "GET", "ROLES"));
            arr.add(new Permission("Update a role", "/api/v1/roles/{id}", "PUT", "ROLES"));
            arr.add(new Permission("Delete a role", "/api/v1/roles/{id}", "DELETE", "ROLES"));
            arr.add(new Permission("Restore a role", "/api/v1/roles/{id}", "PATCH", "ROLES"));

            arr.add(new Permission("Create a role-permission", "/api/v1/roles-permissions", "POST", "ROLESPERMISSION"));
            arr.add(new Permission("Get a roles-permissions by id", "/api/v1/roles-permissions/{id}", "GET", "ROLESPERMISSION"));
            arr.add(new Permission("Get roles-permissions with pagination", "/api/v1/roles-permissions", "GET", "ROLESPERMISSION"));
            arr.add(new Permission("Get roles-permissions by roleID", "/api/v1/roles-permissions/role-owner/{id}",
                    "GET",
                    "ROLESPERMISSION"));
            arr.add(new Permission("Update a roles-permissions", "/api/v1/roles-permissions/{id}", "PUT", "ROLESPERMISSION"));
            arr.add(new Permission("Delete a roles-permissions", "/api/v1/roles-permissions/{id}", "DELETE", "ROLESPERMISSION"));
            arr.add(new Permission("Restore a roles-permissions", "/api/v1/roles-permissions/{id}", "PATCH", "ROLESPERMISSION"));


            arr.add(new Permission("Create a user", "/api/v1/users", "POST", "USERS"));
            arr.add(new Permission("Update a user", "/api/v1/users/{id}", "PUT", "USERS"));
            arr.add(new Permission("Delete a user", "/api/v1/users/{id}", "DELETE", "USERS"));
            arr.add(new Permission("Restore a user", "/api/v1/users/{id}", "PATCH", "USERS"));
            arr.add(new Permission("Get a user by id", "/api/v1/users/{id}", "GET", "USERS"));
            arr.add(new Permission("Get users with pagination", "/api/v1/users", "GET", "USERS"));

            arr.add(new Permission("Create a payment method", "/api/v1/paymentmethods", "POST", "PAYMENT_METHODS"));
            arr.add(new Permission("Update a payment method", "/api/v1/paymentmethods/{id}", "PUT", "PAYMENT_METHODS"));
            arr.add(new Permission("Delete a payment method", "/api/v1/paymentmethods/{id}", "DELETE", "PAYMENT_METHODS"));
            arr.add(new Permission("Restore a payment method", "/api/v1/paymentmethods/{id}", "PATCH", "PAYMENT_METHODS"));
            arr.add(new Permission("Get a payment method by id", "/api/v1/paymentmethods/{id}", "GET", "PAYMENT_METHODS"));
            arr.add(new Permission("Get all payment methods with pagination", "/api/v1/paymentmethods", "GET", "PAYMENT_METHODS"));

            arr.add(new Permission("Create an order", "/api/v1/orders", "POST", "ORDERS"));
            arr.add(new Permission("Update an order", "/api/v1/orders/{id}", "PUT", "ORDERS"));
            arr.add(new Permission("Get an order by ID", "/api/v1/orders/{id}", "GET", "ORDERS"));
            arr.add(new Permission("Get all orders with pagination", "/api/v1/orders", "GET", "ORDERS"));
            arr.add(new Permission("Get orders by user ID", "/api/v1/orders/user-order/{userId}", "GET", "ORDERS"));
            arr.add(new Permission("Get orders by address ID", "/api/v1/orders/address-order/{addressId}", "GET", "ORDERS"));
            arr.add(new Permission("Get orders by payment method ID", "/api/v1/orders/payment-method-order/{paymentMethodId}", "GET", "ORDERS"));
            arr.add(new Permission("Get orders by status", "/api/v1/orders/status-order", "POST", "ORDERS"));

            arr.add(new Permission("Create an address", "/api/v1/addresses", "POST", "ADDRESSES"));
            arr.add(new Permission("Update an address", "/api/v1/addresses/{id}", "PUT", "ADDRESSES"));
            arr.add(new Permission("Delete an address", "/api/v1/addresses/{id}", "DELETE", "ADDRESSES"));
            arr.add(new Permission("Restore an address", "/api/v1/addresses/{id}", "PATCH", "ADDRESSES"));
            arr.add(new Permission("Get an address by ID", "/api/v1/addresses/{id}", "GET", "ADDRESSES"));
            arr.add(new Permission("Get all addresses with pagination", "/api/v1/addresses", "GET", "ADDRESSES"));
            arr.add(new Permission("Get addresses by user ID with pagination", "/api/v1/addresses/user-address/{userId}", "GET", "ADDRESSES"));

            arr.add(new Permission("Get order tool by ID", "/api/v1/ordertools/{id}", "GET", "ORDER_TOOL"));
            arr.add(new Permission("Create an order tool", "/api/v1/ordertools", "POST", "ORDER_TOOL"));
            arr.add(new Permission("Update an order tool", "/api/v1/ordertools/{orderToolId}", "PUT", "ORDER_TOOL"));
            arr.add(new Permission("Get all order tools", "/api/v1/ordertools", "GET", "ORDER_TOOL"));
            arr.add(new Permission("Get order tools by order ID", "/api/v1/ordertools/order/{orderId}", "GET", "ORDER_TOOL"));

            arr.add(new Permission("Login", "/api/v1/auth/login", "POST", "AUTH"));
            arr.add(new Permission("Logout", "/api/v1/auth/logout", "POST", "AUTH"));
            arr.add(new Permission("Register a new user", "/api/v1/auth/register", "POST", "AUTH"));
            arr.add(new Permission("Get account", "/api/v1/auth/account", "GET", "AUTH"));
            arr.add(new Permission("Refresh token", "/api/v1/auth/refresh", "GET", "AUTH"));

            arr.add(new Permission("Download a file", "/api/v1/files", "POST", "FILES"));
            arr.add(new Permission("Upload a file", "/api/v1/files", "GET", "FILES"));

            this.permissionRepository.saveAll(arr);
        }

        if (countRoles == 0) {
            List<Permission> allPermissions = this.permissionRepository.findAll();

            Role adminRole = new Role();
            adminRole.setName("SUPER_ADMIN");
            adminRole.setDescription("Super Admin có tất cả permissions");
            adminRole.setActive(true);

            Role savedRole = roleRepository.save(adminRole);

            List<RolePermission> rolePermissions = new ArrayList<>();
            for (Permission permission : allPermissions) {
                RolePermission rolePermission = new RolePermission();
                rolePermission.setRole(savedRole);
                rolePermission.setPermission(permission);
                rolePermissions.add(rolePermission);
            }

            this.rolePermissionRepository.saveAll(rolePermissions);
        }

        if (countUsers == 0) {
            User adminUser = new User();
            adminUser.setEmail("admin@gmail.com");
            adminUser.setFullName("I'm super admin");
            adminUser.setPassword(this.passwordEncoder.encode("123456"));

            Role adminRole = this.roleRepository.findByName("SUPER_ADMIN");
            if (adminRole != null) {
                adminUser.setRole(adminRole);
            }

            this.userRepository.save(adminUser);
        }

        if (countPermissions > 0 && countRoles > 0 && countUsers > 0) {
            System.out.println(">>> SKIP INIT DATABASE ~ ALREADY HAVE DATA...");
        } else
            System.out.println(">>> END INIT DATABASE");

    }
}

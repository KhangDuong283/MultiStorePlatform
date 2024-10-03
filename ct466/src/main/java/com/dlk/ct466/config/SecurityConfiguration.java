package com.dlk.ct466.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfiguration {
    @Bean  // Khai báo một bean PasswordEncoder để Spring có thể sử dụng nó để mã hóa mật khẩu.
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Sử dụng BCrypt để băm (hash) mật khẩu.
    }
}

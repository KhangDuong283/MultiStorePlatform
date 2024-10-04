package com.dlk.ct466.config;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.nimbusds.jose.util.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfiguration {
    @Bean  // Khai báo một bean PasswordEncoder để Spring có thể sử dụng nó để mã hóa mật khẩu.
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Sử dụng BCrypt để băm (hash) mật khẩu.
    }

    private static final String[] PUBLIC_ENDPOINTS = {
            "/",
            "/api/v1/auth/login",
            "/api/v1/auth/register",
            "/api/v1/auth/refresh",
    };

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http,
            CustomAuthenticationEntryPoint customAuthenticationEntryPoint
            ) throws Exception {
        http
                .csrf(c -> c.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(Customizer.withDefaults())
                        .authenticationEntryPoint(customAuthenticationEntryPoint)
                )
                .formLogin(form -> form.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        return http.build();
    }

    @Value("${dlk.jwt.base64-secret}")
    private String jwtKey;

    // Dùng thuật toán HMAC-SHA512 (HS512)
    public static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;

    // Tạo secretKey từ jwtKey
    public SecretKey getSecretKey() {
        byte[] keyBytes = Base64.from(jwtKey).decode();
        return new SecretKeySpec(
                keyBytes,
                0,
                keyBytes.length,
                JWT_ALGORITHM.getName()
        );
    }

    @Bean  // Mã hóa JWT
    public JwtEncoder jwtEncoder() {
        return new NimbusJwtEncoder(new ImmutableSecret<>(getSecretKey()));
    }

    @Bean  // Giải mã JWT
    public JwtDecoder jwtDecoder() {
        // lấy ra chìa khóa để thực hiện giải mã (gồm secretKey và thuật toán)
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder
                .withSecretKey(getSecretKey())
                .macAlgorithm(JWT_ALGORITHM).build();

        return (token) -> {
            try {
                return jwtDecoder.decode(token);  // Giải mã và xác thực tính đúng đắn JWT
            } catch (Exception e) {
                System.out.println(">>> JWT Error: " + e.getMessage());
                throw e;
            }
        };
    }

}

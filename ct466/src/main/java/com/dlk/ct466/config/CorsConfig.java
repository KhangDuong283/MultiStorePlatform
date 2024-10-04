package com.dlk.ct466.config;

import org.springframework.boot.actuate.autoconfigure.metrics.CompositeMeterRegistryAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource configurationSource(CompositeMeterRegistryAutoConfiguration compositeMeterRegistryAutoConfiguration) {
        // Cho phép các URL có thể kết nối với backend
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000",
                "http://localhost:4173",
                "http://localhost:5173"
        ));

        // Cho phép các method được kết nối
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        // Cho phép các header được gửi
        configuration.setAllowedHeaders(Arrays.asList(
                "Authorization",
                "Content-Type",
                "Accept",
                "x-no-retry"
        ));

        // Cho phép gửi kèm cookie
        configuration.setAllowCredentials(true);

        // Khi một trình duyệt muốn gửi request A đến server
        // Trình duyệt trước tiên sẽ gửi một Pre-flight request đến server
        // để xác nhận xem request A có được cấp quyền để truy cập đến server không
        // nếu có sẽ nhớ quyền truy cập của request A khoảng thời gian
        // để tránh phải gửi lại Pre-flight nhiều lần
        // setMaxAge(3600L) sẽ giúp ghi nhớ request A đã được cấp quyền trong 3600 giây
        configuration.setMaxAge(3600L);
        // Nên nhập thêm chữ L thì hàm sẽ tiết kiệm được thời gian convert từ int sang long

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // cấu hình cors cho tất cả api
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

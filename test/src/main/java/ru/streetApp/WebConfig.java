package ru.streetApp;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // APIのパス
                .allowedOrigins("http://localhost:8080/test") // 許可するオリジン（フロントエンドのURL）
                .allowedMethods("GET") // 許可するHTTPメソッド
                .allowedHeaders("*"); // 許可するヘッダー
    }
}
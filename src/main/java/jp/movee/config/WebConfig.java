package jp.movee.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
    	//TODO ベタ書のため、他の方法を検討する
        // Reactのindex.htmlを提供するための設定
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/report").setViewName("forward:/index.html");
        registry.addViewController("/report/bs").setViewName("forward:/index.html");
        registry.addViewController("/report/pl").setViewName("forward:/index.html");
        // 必要に応じて他のルートを追加
    }
}

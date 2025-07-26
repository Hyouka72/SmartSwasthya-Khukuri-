package com.backend.SmartSwasthya.Config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class ProjectConfig {

    @Bean
    public Cloudinary getCloudinary() {
        Map map = new HashMap();
        map.put("cloud_name", "db3a4d1wm");
        map.put("api_key", "247755735654453");
        map.put("api_secret", "cerADVkiwpCeWg7uiBlVN7vo7l8");
        map.put("secure", "true");
        return new Cloudinary(map);
    }







}

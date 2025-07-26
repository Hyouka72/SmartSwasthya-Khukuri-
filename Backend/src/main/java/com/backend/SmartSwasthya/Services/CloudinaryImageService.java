package com.backend.SmartSwasthya.Services;

import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

// This interface is good practice to define the contract for Cloudinary operations
public interface CloudinaryImageService {
    Map<String, Object> upload(MultipartFile file);
    // You might add methods for deleting files, etc.
}
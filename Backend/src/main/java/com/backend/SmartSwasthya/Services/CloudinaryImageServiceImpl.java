package com.backend.SmartSwasthya.Services;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryImageServiceImpl implements CloudinaryImageService {

    private final Cloudinary cloudinary; // Use final and constructor injection

    @Autowired
    public CloudinaryImageServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public Map<String, Object> upload(MultipartFile file) { // Use Map<String, Object> for return type
        try {
            // Map.of() is for additional options, leave empty if not needed
            // You might want to add folder names, resource types etc. here:
            // e.g., Map.of("folder", "patient_reports", "resource_type", "auto")
            return cloudinary.uploader().upload(file.getBytes(), Map.of());
        } catch (IOException e) {
            // Log the exception properly in a real application
            // LoggerFactory.getLogger(CloudinaryImageServiceImpl.class).error("Cloudinary upload failed", e);
            throw new RuntimeException("Error while uploading image to Cloudinary: " + e.getMessage(), e);
        }
    }
}
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;

@RestController
public class DemoController {
    @GetMapping("/api/data")
    public java.util.List<String> getAll() {
        return java.util.Arrays.asList("alpha","beta","gamma");
    }

    @GetMapping("/api/details")
    public java.util.Map<String,String> getDetail(@org.springframework.web.bind.annotation.RequestParam("value") String value) {
        java.util.Map<String,String> map = java.util.Map.of(
            "alpha", "First letter of the Greek alphabet",
            "beta", "Second letter of the Greek alphabet",
            "gamma", "Third letter of the Greek alphabet"
        );
        String detail = map.getOrDefault(value, "No details available");
        return java.util.Collections.singletonMap("detail", detail);
    }
}

package com.kpit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kpit.model.SearchResponse;
import com.kpit.service.SearchService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // allow Angular app to call the API
public class SearchController {

    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/search")
    public ResponseEntity<SearchResponse> search(@RequestParam("q") String query) {
        SearchResponse response = searchService.search(query);
        return ResponseEntity.ok(response);
    }
}

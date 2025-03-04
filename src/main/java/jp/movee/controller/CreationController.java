package jp.movee.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jp.movee.repository.CreateReportHistoryRepository;
import lombok.RequiredArgsConstructor;


@RestController
@CrossOrigin(origins = "*") 
@RequiredArgsConstructor
@ResponseBody
public class CreationController {
	
	private final CreateReportHistoryRepository createReportHistoryRepository;
    @GetMapping("/api/v1")
    public Map<String, Object> home() {
        long count = createReportHistoryRepository.count();
        Map<String, Object> creationResponse = new HashMap<>();
        creationResponse.put("message", "選択してください");
        creationResponse.put("notice", "継続作成、閲覧はログイン後に利用可能です");
        creationResponse.put("historyCount", count);
        return creationResponse;
    }
}

package jp.movee.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jp.movee.service.BsService;
import jp.movee.service.CreateReportHistoryService;

@RestController
@CrossOrigin(origins = "*")
public class ReportController {
    private final BsService bsService;
    private final CreateReportHistoryService historyService;

    public ReportController(BsService bsService, CreateReportHistoryService historyService) {
        this.bsService = bsService;
        this.historyService = historyService;
    }

    @GetMapping("/api/v1/report")
    public Map<String, String> handleMenu(@RequestParam(defaultValue = "") String option) {
        Map<String, String> reportResponse = new HashMap<>();
        reportResponse.put("message", "メニューを選択してください");
        reportResponse.put("notice", "PL、CSは作成予定です");

        if ("onetime".equals(option)) {
            reportResponse.put("redirect", "/report"); // Reactでのリダイレクト先
        } else {
        	reportResponse.put("redirect", "/"); // Reactでのリダイレクト先
        }

        return reportResponse;
    }
    
    @PostMapping("/api/v1/report/register")
    public Map<String, String> createHistory(@RequestBody Map<String, String> formData) {
        String creationType = formData.get("creationType");
        String reportType = formData.get("reportType");
        String title = formData.get("title");
        //String frequency = formData.get("frequency");
        
        long bsId = bsService.saveHistory(title, creationType, reportType);
        // `create_report_history` にデータ登録
        historyService.saveHistory(creationType, reportType, bsId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "データが正常に登録されました");

        if ("1".equals(reportType)) {
            response.put("redirect", "/report/bs");
        } else if ("2".equals(reportType)) {
            response.put("redirect", "/report/pl");
        } else {
            response.put("redirect", "/report");
        }

        return response;
    }
}

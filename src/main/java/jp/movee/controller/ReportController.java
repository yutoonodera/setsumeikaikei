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

    @GetMapping("/api/report")
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
    
    @PostMapping("/api/report/register")
    public Map<String, String> createHistory(@RequestBody Map<String, String> formData) {
        String reportOption = formData.get("reportOption");
        String reportType = formData.get("reportType");
        String title = formData.get("title");
        String frequency = formData.get("frequency");

        // メニューIDを決定（例: BS=1, PL=2, CS=3）
        int menuId;
        switch (reportType) {
            case "1":
                menuId = 1;
                break;
            case "2":
                menuId = 2;
                break;
            case "3":
                menuId = 3;
                break;
            default:
                menuId = 0;
        }

        // 諸表IDを決定（頻度ごとに割り振る例）
        int reportId = switch (frequency) {
            case "onetime" -> 10;
            case "weekly" -> 20;
            case "monthly" -> 30;
            default -> 0;
        };
        long bsId = bsService.saveHistory(title, menuId, reportId);
        // `create_report_history` にデータ登録
        historyService.saveHistory(menuId, reportId, bsId);

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

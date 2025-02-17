package jp.movee.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jp.movee.service.BsService;
import jp.movee.service.CreateReportHistoryService;

@Controller
public class ReportController {
	private final BsService bsService;
    private final CreateReportHistoryService historyService;

    public ReportController(BsService bsService, CreateReportHistoryService historyService) {
        this.bsService = bsService;
        this.historyService = historyService;
    }
	
    @GetMapping("/report")
    public String handleMenu(@RequestParam(defaultValue = "") String option, Model model) {
        model.addAttribute("message", "メニューを選択してください");
        model.addAttribute("notice", "PL、CSは作成予定です");
        if ("onetime".equals(option)) {
            return "report"; // report.html に遷移
        }
        return "menu"; // menu.html に戻る
    }
    
    @GetMapping("/report/judge")
    public String createHistory(
            @RequestParam(defaultValue = "") String option,
            @RequestParam(defaultValue = "") String title,
            @RequestParam(defaultValue = "onetime") String frequency,
            Model model) {

        // メニューIDを決定（例: BS=1, PL=2, CS=3）
        int menuId;
        switch (option) {
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
        if ("1".equals(option)) {
            return "redirect:/report/BS"; // create.html に遷移
        }
        return "report"; // report.html に戻る
    }
}

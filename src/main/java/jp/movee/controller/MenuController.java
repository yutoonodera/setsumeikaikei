package jp.movee.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import jp.movee.repository.CreateReportHistoryRepository;
import jp.movee.util.Constants;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MenuController {
	
	private final CreateReportHistoryRepository createReportHistoryRepository;
    @GetMapping(name = Constants.TOP_URL)
    public String home(Model model) {
    	long count = createReportHistoryRepository.count();
    	model.addAttribute("message", "選択してください");
    	model.addAttribute("notice", "継続作成、閲覧はログイン後に利用可能です");
        model.addAttribute("historyCount", count);
        return "menu"; // menu.html テンプレートを返す
    }
}

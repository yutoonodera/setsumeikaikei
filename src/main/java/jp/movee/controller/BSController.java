package jp.movee.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jp.movee.dto.BSDto;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BSController {
	
    @GetMapping("/report/BS")
    public String index(@RequestParam(defaultValue = "") String option, Model model) {
    	model.addAttribute("bsDto", new BSDto());
        return "bs/one/create"; // index.html に戻る
    }
    
    
    @PostMapping("/report/BS")
    public String handleForm(@ModelAttribute BSDto bsDto,  Model model) {
        int totalAssets = bsDto.getTotalAssets();
        int totalLiabilities = bsDto.getTotalLiabilities();
        int totalCapital = bsDto.getTotalCapital();

        // 資産、負債、資本がすべて0のチェック
        if (totalAssets == 0 && totalLiabilities == 0 && totalCapital == 0) {
            model.addAttribute("error", "資産、負債、資本がすべて0です");
            model.addAttribute("bsDto", bsDto);  // 入力値を維持
            return "bs/one/create";  // エラー時に再度フォーム画面へ
        }

        // 合計が一致しない場合のチェック
        if (totalAssets != totalLiabilities + totalCapital) {
            model.addAttribute("error", "資産の合計（負債 + 資本）と一致しません");
            model.addAttribute("errorDetail", "資産：" + totalAssets + "円、"  + "負債：" + totalLiabilities + "円、" + "資本：" + totalCapital + "円");
            model.addAttribute("bsDto", bsDto);  // 入力値を維持
            return "bs/one/create";
        }

        model.addAttribute("assets", totalAssets);
        model.addAttribute("capital", totalCapital);
        model.addAttribute("liabilities", totalLiabilities);

        return "bs/one/graph";  // 成功時のページ
    }
}

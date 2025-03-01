package jp.movee.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.movee.dto.BSDto;

@RestController
@RequestMapping("/api/bs")
public class BSController {

    @PostMapping
    public ResponseEntity<?> validateAndCalculate(@RequestBody BSDto bsDto) {
        int totalAssets = bsDto.getTotalAssets();
        int totalLiabilities = bsDto.getTotalLiabilities();
        int totalCapital = bsDto.getTotalCapital();

        //エラーチェック
        //API公開する予定はないが、curlでポストされた場合にDB登録を防ぐため
        if (totalAssets != totalLiabilities + totalCapital) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "エラー: 資産合計が負債合計と資本合計の合計と一致しません。");
            return ResponseEntity.badRequest().body(errorResponse);
        }else if(totalAssets == 0 && totalLiabilities == 0 && totalCapital == 0) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "エラー: すべて金額が0です。");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // 正常処理: 必要な計算やレスポンスを作成
        Map<String, Object> response = new HashMap<>();
        response.put("totalAssets", totalAssets);
        response.put("totalLiabilities", totalLiabilities);
        response.put("totalCapital", totalCapital);
        return ResponseEntity.ok(response);
    }
}


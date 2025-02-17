package jp.movee.dto;

import lombok.Data;

@Data
public class BSDto {
	//流動資産
    private int cash;
    private int notesReceivable;
    private int accountsReceivable;
    private int securities;
    private int inventory;
    private int allowanceForDoubtfulAccounts;
    private int otherCurrentAssets;
    //流動資産合計
    private int totalCurrentAssets; 
    //固定資産
    private int land;
    private int building;
    private int equipment;
    private int otherFixedAssets;
    //流動資産合計
    private int totalFixedAssets;
    //資産合計
    private int totalAssets;
    //流動負債
    private int shortTermDebt;
    private int accountsPayable;
    private int otherCurrentLiabilities;
    //流動負債合計
    private int totalCurrentLiabilities;
    //固定負債
    private int longTermDebt;
    private int otherFixedLiabilities;
    //固定負債合計
    private int totalFixedLiabilities;
    //負債合計
    private int totalLiabilities;
    //資本
    private int capital;
    private int retainedEarnings;
    //資本号合計
    private int totalCapital;
}
	
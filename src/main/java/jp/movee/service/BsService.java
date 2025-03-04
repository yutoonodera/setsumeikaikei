
package jp.movee.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import jp.movee.entity.Bs;
import jp.movee.repository.BsRepository;

@Service
public class BsService {

    private final BsRepository repository;

    public BsService(BsRepository repository) {
        this.repository = repository;
    }

    public long saveHistory(String title, String creationType, String reportType) {
        Bs bs = new Bs();
        bs.setTitle(title);
        bs.setCreationType(creationType);
        bs.setReportType(reportType);
        bs.setCreatedAt(Timestamp.valueOf(LocalDateTime.now())); // 現在時刻をセット

        Bs bsHistory = repository.save(bs);
        return bsHistory.getId();
    }
}

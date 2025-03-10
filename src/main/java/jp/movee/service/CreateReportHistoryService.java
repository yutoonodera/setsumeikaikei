
package jp.movee.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import jp.movee.entity.CreateReportHistory;
import jp.movee.repository.CreateReportHistoryRepository;

@Service
public class CreateReportHistoryService {

    private final CreateReportHistoryRepository repository;

    public CreateReportHistoryService(CreateReportHistoryRepository repository) {
        this.repository = repository;
    }

    public void saveHistory( String creationType, String reportType, long reportOrgId) {
        CreateReportHistory history = new CreateReportHistory();
        history.setCreationType(creationType);
        history.setReportType(reportType);
        history.setReportOrgId(reportOrgId);
        history.setCreatedAt(Timestamp.valueOf(LocalDateTime.now())); // 現在時刻をセット

        repository.save(history);
    }
}

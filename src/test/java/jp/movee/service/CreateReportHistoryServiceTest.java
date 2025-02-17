package jp.movee.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import jp.movee.entity.CreateReportHistory;
import jp.movee.repository.CreateReportHistoryRepository;

@ExtendWith(MockitoExtension.class)
class CreateReportHistoryServiceTest {

    @Mock
    private CreateReportHistoryRepository repository;

    @InjectMocks
    private CreateReportHistoryService service;

    @Test
    void saveHistory_Success() {
        // Arrange（準備）
        int menuId = 1;
        int reportId = 100;
        long reportOrgId = 200L;

        // Act（実行）
        service.saveHistory(menuId, reportId, reportOrgId);

        // Assert（検証）
        // 保存されたエンティティをキャプチャ
        ArgumentCaptor<CreateReportHistory> captor = ArgumentCaptor.forClass(CreateReportHistory.class);
        verify(repository, times(1)).save(captor.capture());

        CreateReportHistory savedEntity = captor.getValue();
        assertEquals(menuId, savedEntity.getMenuId());
        assertEquals(reportId, savedEntity.getReportId());
        assertEquals(reportOrgId, savedEntity.getReportOrgId());
        assertNotNull(savedEntity.getCreatedAt());
        assertTrue(savedEntity.getCreatedAt().before(Timestamp.valueOf(LocalDateTime.now().plusSeconds(1))));
    }
}

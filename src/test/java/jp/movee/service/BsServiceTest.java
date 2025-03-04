package jp.movee.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import jp.movee.entity.Bs;
import jp.movee.repository.BsRepository;

class BsServiceTest {

    @Mock
    private BsRepository repository;

    @InjectMocks
    private BsService bsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveHistory_ShouldReturnSavedId() {
        // モックのデータを作成
        Bs mockBs = new Bs();
        mockBs.setId(100L); // モックのID
        mockBs.setTitle("Test Title");
        mockBs.setCreationType("1");
        mockBs.setReportType("2");
        mockBs.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));

        // repository.save() の戻り値をモック
        when(repository.save(any(Bs.class))).thenReturn(mockBs);

        // メソッドを実行
        long savedId = bsService.saveHistory("Test Title", "1", "2");

        // 結果を検証
        assertEquals(100L, savedId);
        
        // repository.save() が1回呼ばれたことを確認
        verify(repository, times(1)).save(any(Bs.class));
    }
}


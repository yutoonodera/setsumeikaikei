package jp.movee.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import jp.movee.repository.CreateReportHistoryRepository;

@SpringBootTest
class MenuControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CreateReportHistoryRepository createReportHistoryRepository;

    private MenuController menuController;

    @BeforeEach
    void setUp() {
        // モックを注入したControllerを作成
        menuController = new MenuController(createReportHistoryRepository);
        mockMvc = MockMvcBuilders.standaloneSetup(menuController).build(); // 手動でMockMvcを設定
    }

    @Test
    void testRootPageRendering() throws Exception {
        // モックの設定
        when(createReportHistoryRepository.count()).thenReturn(10L);

        // リクエストの実行と検証
        mockMvc.perform(get("/"))
                .andExpect(status().isOk()) // ステータスコード200を確認
                .andExpect(view().name("menu")) // 正しいビューが返されるか確認
                .andExpect(model().attribute("historyCount", 10L)); // モデル属性の検証
    }
}


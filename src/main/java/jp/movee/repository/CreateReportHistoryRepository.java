package jp.movee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jp.movee.entity.CreateReportHistory;

@Repository
public interface CreateReportHistoryRepository extends JpaRepository<CreateReportHistory, Long> {
    @Override
	long count(); // データ件数を取得
}
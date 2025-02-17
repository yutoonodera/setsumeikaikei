package jp.movee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jp.movee.entity.Bs;

@Repository
public interface BsRepository extends JpaRepository<Bs, Long> {
    @Override
	long count(); // データ件数を取得
}
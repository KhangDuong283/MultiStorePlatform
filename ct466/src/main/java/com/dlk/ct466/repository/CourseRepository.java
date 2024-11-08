package com.dlk.ct466.repository;

import com.dlk.ct466.domain.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, String>, JpaSpecificationExecutor<Course> {

    Optional<Course> findByCourseUrl(String courseUrl);

    Optional<Course> findByCourseUrlAndDeletedFalse(String courseUrl);

}

package com.dlk.ct466.service;

import com.dlk.ct466.domain.entity.Course;
import com.dlk.ct466.domain.entity.Tool;
import com.dlk.ct466.domain.entity.User;
import com.dlk.ct466.domain.mapper.ToolMapper;
import com.dlk.ct466.domain.request.course.ReqCourseDTO;
import com.dlk.ct466.domain.response.ResPaginationDTO;
import com.dlk.ct466.repository.CourseRepository;
import com.dlk.ct466.util.PaginationUtil;
import com.dlk.ct466.util.error.IdInvalidException;
import com.turkraft.springfilter.converter.FilterSpecification;
import com.turkraft.springfilter.converter.FilterSpecificationConverter;
import com.turkraft.springfilter.parser.FilterParser;
import com.turkraft.springfilter.parser.node.FilterNode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserService userService;
    private final FilterParser filterParser;
    private final FilterSpecificationConverter filterSpecificationConverter;

    public Course getCourseById(String courseId) throws IdInvalidException {
        return courseRepository.findById(courseId).orElseThrow(
                () -> new IdInvalidException("Course with id: " + courseId + " not exist")
        );
    }

    public Course getCourseByCourseUrl(String courseUrl) throws IdInvalidException {
        return courseRepository.findByCourseUrl(courseUrl).orElse(null);
    }

    public Course createCourse(ReqCourseDTO course) throws IdInvalidException {
        Course dbCourse = getCourseByCourseUrl(course.getCourseUrl());
        if (dbCourse != null) {
             throw new IdInvalidException("Course already exist");
        }
        User user = userService.fetchUserById(course.getUserId());
        Course newCourse = new Course()
                .toBuilder()
                .courseUrl(course.getCourseUrl())
                .price(course.getPrice())
                .discountedPrice(course.getDiscountedPrice())
                .user(user)
                .build();
        return courseRepository.save(newCourse);
    }


    public ResPaginationDTO getAllCourse(Pageable pageable) {
        FilterNode node = filterParser.parse("deleted=false");
        FilterSpecification<Course> spec = filterSpecificationConverter.convert(node);

        Page<Course> pageCourse = courseRepository.findAll(spec, pageable);
        return PaginationUtil.getPaginatedResult(pageCourse, pageable);
    }


}

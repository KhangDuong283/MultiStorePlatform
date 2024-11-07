import { usePlaylistsDetails } from "../hooks/usePlaylistsDetails";
import { useGetAllCourse } from "../hooks/useGetAllCourse";
import CourseItem from "./CourseItem";

const CourseList = () => {
    const { courses, isLoadingCourses } = useGetAllCourse()
    const courseData = courses?.result;
    // console.log(courseData);
    const { playlistsDetails, isLoading, error } = usePlaylistsDetails(courseData);

    if (isLoading || isLoadingCourses) {
        return (
            <div className="text-center py-6">
                <span>Đang tải dữ liệu khóa học...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-6 text-red-500">
                <span>Error: {error}</span>
            </div>
        );
    }

    console.log(playlistsDetails);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {playlistsDetails?.map((course) => (
                <CourseItem key={course.courseId} course={course} />
            ))}
        </div>
    );
};

export default CourseList;

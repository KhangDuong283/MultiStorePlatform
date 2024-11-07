import { Button } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
import CourseTable from "./CourseTable";
import CourseForm from "./CourseForm";

const CourseManagement = () => {
    const userId = useSelector(state => state?.account?.user?.id);

    // Dữ liệu ảo để test giao diện
    const mockCourses = [
        {
            courseId: "1",
            courseUrl: "https://www.youtube.com/playlist?list=123",
            price: 123000,
            discountedPrice: 100000,
            userId: userId,
        },
        // Thêm các khóa học khác nếu cần
    ];

    const [courses, setCourses] = useState(mockCourses);
    const [editingCourse, setEditingCourse] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCreateCourse = (newCourse) => {
        setCourses([...courses, { ...newCourse, courseId: `${Date.now()}` }]);
    };

    const handleUpdateCourse = (updatedCourse) => {
        setCourses(courses.map(course =>
            course.courseId === updatedCourse.courseId ? updatedCourse : course
        ));
    };

    const handleDeleteCourse = (courseId) => {
        setCourses(courses.filter(course => course.courseId !== courseId));
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setIsModalVisible(true);
    };

    const openCreateModal = () => {
        setEditingCourse(null);
        setIsModalVisible(true);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4 text-center">Quản lý khóa học</h1>
            <Button onClick={openCreateModal} type="primary" className="mb-3">
                Thêm khóa học
            </Button>
            <CourseTable
                courses={courses}
                onEdit={handleEdit}
                onDelete={handleDeleteCourse}
            />
            <CourseForm
                userId={userId}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSubmit={editingCourse ? handleUpdateCourse : handleCreateCourse}
                editingCourse={editingCourse}
            />
        </div>
    );
};

export default CourseManagement;

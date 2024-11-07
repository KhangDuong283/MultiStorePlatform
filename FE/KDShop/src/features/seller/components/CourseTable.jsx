import { Table, Button } from "antd";

const CourseTable = ({ courses, onEdit, onDelete }) => {
    const columns = [
        {
            title: "URL Khóa học",
            dataIndex: "courseUrl",
            key: "courseUrl",
            align: "center",
            render: (text) => (
                <a href={text} target="_blank" rel="noopener noreferrer">
                    {text}
                </a>
            ),
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            align: "center",
            render: (text) => `${text.toLocaleString()}đ`
        },
        {
            title: "Giá khuyến mãi",
            dataIndex: "discountedPrice",
            key: "discountedPrice",
            align: "center",
            render: (text) => text ? `${text.toLocaleString()}đ` : "Không có"
        },
        {
            title: "Thao tác",
            key: "action",
            align: "center",
            render: (text, course) => (
                <div className="flex justify-center items-center space-x-2">
                    <Button onClick={() => onEdit(course)} className="bg-green-500 hover:bg-green-600 text-white">
                        Sửa
                    </Button>
                    <Button onClick={() => onDelete(course.courseId)} className="bg-red-500 hover:bg-red-600 text-white">
                        Xóa
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Table
            className="shadow-lg"
            dataSource={courses}
            rowKey="courseId"
            columns={columns}
            pagination={{ pageSize: 5 }}
        />
    );
};

export default CourseTable;

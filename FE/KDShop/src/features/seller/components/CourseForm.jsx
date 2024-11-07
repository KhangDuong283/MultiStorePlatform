import { Modal, Form, Input, InputNumber, Button } from "antd";
import { useEffect } from "react";

const CourseForm = ({ userId, visible, onCancel, onSubmit, editingCourse }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (editingCourse) {
                form.setFieldsValue(editingCourse);
            } else {
                form.resetFields();
            }
        }
    }, [editingCourse, form, visible]);

    const handleCreateOrUpdate = async (values) => {
        const courseData = {
            ...values,
            userId: userId,
        };
        await onSubmit(courseData);
        form.resetFields();
    };

    return (
        <Modal
            title={editingCourse ? "Cập nhật khóa học" : "Thêm khóa học"}
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                onFinish={handleCreateOrUpdate}
                layout="vertical"
            >
                <Form.Item
                    label="URL Khóa học"
                    name="courseUrl"
                    rules={[{ required: true, message: "Vui lòng nhập URL khóa học!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: "Vui lòng nhập giá khóa học!" }]}
                >
                    <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label="Giá khuyến mãi"
                    name="discountedPrice"
                >
                    <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        {editingCourse ? "Cập nhật" : "Thêm"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CourseForm;

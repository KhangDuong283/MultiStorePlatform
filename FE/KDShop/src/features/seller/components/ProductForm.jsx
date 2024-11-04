import { Modal, Form, Input, InputNumber, Select, Switch, Button } from "antd";
import { useCreateToolType } from "../hooks/useCreateToolType";
import { useState } from "react";

const ProductForm = ({ userId, visible, onCancel, onSubmit, editingTool, toolTypes, isToolTypesLoading }) => {
    const [form] = Form.useForm();
    const { createToolType, isLoading: isCreatingToolType } = useCreateToolType();
    const [isCreatingNewType, setIsCreatingNewType] = useState(false);

    const handleCreateOrUpdate = async (values) => {
        let toolTypeId = values.toolTypeId;

        if (isCreatingNewType && values.newToolType) {
            const response = await createToolType({ name: values.newToolType });
            toolTypeId = response?.toolTypeId;
        }

        const toolData = {
            ...values,
            toolType: { toolTypeId },
            user: { userId }
        };

        await onSubmit(toolData);
        form.resetFields();
        setIsCreatingNewType(false);
    };

    const toggleToolTypeInput = (checked) => {
        setIsCreatingNewType(checked);
        form.setFieldsValue({ newToolType: "" });
    };

    return (
        <Modal
            title={editingTool ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                onFinish={handleCreateOrUpdate}
                layout="vertical"
                className="space-y-4"
                initialValues={editingTool}
            >
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Giá giảm"
                    name="discountedPrice"
                >
                    <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
                >
                    <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="Số lượng"
                    name="stockQuantity"
                >
                    <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="URL Ảnh"
                    name="imageUrl"
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Loại sản phẩm">
                    <Switch
                        checkedChildren="Tạo mới"
                        unCheckedChildren="Chọn có sẵn"
                        onChange={toggleToolTypeInput}
                    />
                    {isCreatingNewType ? (
                        <Form.Item
                            name="newToolType"
                            rules={[{ required: true, message: "Vui lòng nhập tên loại sản phẩm!" }]}
                        >
                            <Input placeholder="Nhập tên loại sản phẩm mới" />
                        </Form.Item>
                    ) : (
                        <Form.Item name="toolTypeId" rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm!" }]}>
                            <Select loading={isToolTypesLoading} placeholder="Chọn loại sản phẩm">
                                {toolTypes?.map(type => (
                                    <Select.Option key={type.toolTypeId} value={type.toolTypeId}>
                                        {type.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isCreatingToolType}
                        className="w-full"
                    >
                        {editingTool ? "Cập nhật" : "Thêm"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProductForm;

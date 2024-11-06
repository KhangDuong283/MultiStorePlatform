import { Modal } from "antd";

const LoginModal = ({ isModalVisible, handleLogin, handleCancel }) => (
    <Modal
        title="Thông báo"
        open={isModalVisible}
        onOk={handleLogin}
        onCancel={handleCancel}
        okText="Đăng nhập"
        cancelText="Hủy"
    >
        <p>Bạn cần đăng nhập để thêm khóa học vào giỏ hàng.</p>
    </Modal>
);

export default LoginModal;

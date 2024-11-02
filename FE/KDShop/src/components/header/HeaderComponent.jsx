import { Layout, Menu, Input, Avatar, Badge, Button, Dropdown } from 'antd';
import { UserOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { store } from "../../redux/store"
import { setLogoutUser } from '../../redux/slices/accountSlice';
import { toast } from 'react-toastify';
import { useCartContext } from '../CartProvider';
const { Header } = Layout;

const menuItems = [
    { key: '1', label: 'Trang chủ', path: '/' },
    { key: '2', label: 'Dụng cụ', path: '/products' },
    { key: '3', label: 'Khóa học', path: '/courses' },
];


const HeaderComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(setLogoutUser({}));
        toast.success("Đăng xuất thành công!")
        navigate('/auth/login');
    }

    const menu = {
        items: [
            {
                key: '1',
                label: <span className="block text-base px-1 py-1">Thông tin tài khoản</span>,
            },
            {
                key: '2',
                label: <span className="block text-base px-1 py-1">Đơn hàng của bạn</span>,
                onClick: () => navigate('/order-history'),
            },
            {
                type: 'divider',
            },
            {
                key: '3',
                label: <span className="block text-base px-1 py-1">Đăng xuất</span>,
                onClick: handleLogout,
            },
        ],
    };


    const handleMenuClick = ({ key }) => {
        const item = menuItems.find((nav) => nav.key === key);
        if (item && item.path) {
            navigate(item.path);
        }
    };

    const { cartQuantity } = useCartContext();

    return (
        <Header className="flex items-center px-8 h-[70px] shadow-md fixed-header" style={{ backgroundColor: "#8294C4" }}>
            <div className="flex items-center flex-none">
                <div className="text-white text-2xl font-bold cursor-pointer hover:scale-105">
                    KD SHOP
                </div>
            </div>

            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                onClick={handleMenuClick}
                items={menuItems.map((item) => ({
                    key: item.key,
                    label: item.label,
                    onClick: () => navigate(item.path),
                }))}
                className="flex-1 justify-center text-lg"
                style={{ backgroundColor: 'transparent' }}
            />

            <Input
                placeholder="Tìm kiếm sản phẩm"
                prefix={<SearchOutlined className="text-gray-400 px-2 cursor-pointer" />}
                className="w-80 mr-4 rounded-lg border-transparent shadow-sm p-2"
            />

            <Button
                type="text"
                className="relative flex items-center justify-center p-0 mr-4"
            >
                <Badge
                    count={cartQuantity}
                    offset={[0, 4]}
                    className="text-white text-xs font-bold rounded-full hover:scale-105"
                >
                    <div className="flex items-center justify-center w-10 h-10 bg-cyan-50 rounded-full transition-transform duration-300 hover:scale-105" onClick={() => navigate("/cart")} >
                        <ShoppingCartOutlined className="text-black text-xl" />
                    </div>
                </Badge>
            </Button>

            <Dropdown menu={menu} placement="bottomRight" trigger={['click']}>
                <Avatar icon={<UserOutlined />} size={38} className="cursor-pointer hover:scale-110" />
            </Dropdown>

        </Header>
    );
};

export default HeaderComponent;

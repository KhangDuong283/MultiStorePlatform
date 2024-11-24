/* eslint-disable no-unused-vars */
import { Layout, Menu, Input, Avatar, Badge, Button, Dropdown } from 'antd';
import { UserOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { store } from "../../redux/store"
import { useDispatch, useSelector } from 'react-redux';
import { setLogoutUser } from '../../redux/slices/accountSlice';
import { toast } from 'react-toastify';
import { useCartContext } from '../CartProvider';
import { useUpdateUserRoleByUserId } from '../../features/auth/hooks/useUpdateUserRoleByUserId';
import { useEffect, useState } from 'react';

const { Header } = Layout;
const menuItems = [
    { key: '1', label: 'Trang chủ', path: '/' },
    { key: '2', label: 'Sản phẩm', path: '/products' },
    { key: '3', label: 'Khóa học', path: '/courses' },
];

const HeaderComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { cartQuantity } = useCartContext();
    const user = useSelector(state => state.account?.user);
    const permissions = user?.role?.permissions;
    let role = user?.role?.name;
    // const userName = user?.fullName;

    const handleLogout = () => {
        dispatch(setLogoutUser({}));
        toast.success("Đăng xuất thành công!");
        navigate('/');
    };

    const { updateUserRole } = useUpdateUserRoleByUserId();
    const handleBecomeSeller = () => {
        updateUserRole({ userId: user?.id, role: { roleId: 2 } });
        handleLogout();
        navigate('/auth/login');
        toast.success("Bạn đã trở thành người bán hãy đăng nhập lại");
    }


    const menuItemsForDropdown = [
        {
            key: '1',
            label: <span className="block text-base px-1 py-1">Thông tin tài khoản</span>,
        },
        {
            key: '2',
            label: <span className="block text-base px-1 py-1">Đơn hàng của bạn</span>,
            onClick: () => navigate('/order-history'),
        },
        ...(role === 'SELLER' ? [{
            key: '5',
            label: <span className="block text-base px-1 py-1">Quản lý bán hàng</span>,
            onClick: () => navigate('/seller'),
        }] : [{
            key: '4',
            label: <span className="block text-base px-1 py-1">Trở thành người bán</span>,
            onClick: handleBecomeSeller,
        }]),
        {
            type: 'divider',
        },
        {
            key: '3',
            label: <span className="block text-base px-1 py-1">Đăng xuất</span>,
            onClick: handleLogout,
        },
    ];

    const menu = { items: menuItemsForDropdown };

    const handleMenuClick = ({ key }) => {
        const item = menuItems.find((nav) => nav.key === key);
        if (item && item.path) {
            navigate(item.path);
        }
    };

    return (
        <Header className="flex items-center px-8 h-[70px] shadow-md fixed-header" style={{ backgroundColor: "#8294C4" }}>
            <div className="flex items-center flex-none">
                <div className="text-white text-2xl font-bold cursor-pointer hover:scale-105" onClick={() => navigate('/')}>
                    KD STORE
                </div>
            </div>

            <Menu
                theme="light"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                defaultSelectedKeys={['1']}
                onClick={handleMenuClick}
                items={menuItems.map((item) => ({
                    key: item.path,
                    label: item.label,
                    onClick: () => navigate(item.path),
                }))}
                className="flex-1 justify-center text-lg"
                style={{ backgroundColor: 'transparent' }}
            />

            <Input
                placeholder="Tìm kiếm sản phẩm"
                prefix={<SearchOutlined className="text-gray-400 px-2 cursor-pointer" />}
                className="w-60 mr-4 rounded-lg border-transparent shadow-sm p-2"
            />

            {permissions?.length === 0 ? (
                <>
                    <button
                        onClick={() => navigate('/auth/login')}
                        type="button"
                        className="text-white-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                        Đăng nhập
                    </button>

                    <button
                        onClick={() => navigate('/auth/register')}
                        type="button"
                        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                        Đăng ký
                    </button>


                </>
            ) : (
                <>
                    <Button
                        type="text"
                        className="relative flex items-center justify-center p-0 mr-4"
                        onClick={() => navigate("/cart")}
                    >
                        <Badge
                            count={cartQuantity}
                            offset={[0, 4]}
                            className="text-white text-xs font-bold rounded-full hover:scale-105"
                        >
                            <div className="flex items-center justify-center w-10 h-10 bg-cyan-50 rounded-full transition-transform duration-300 hover:scale-105">
                                <ShoppingCartOutlined className="text-black text-xl" />
                            </div>
                        </Badge>
                    </Button>

                    <Dropdown menu={menu} placement="bottomLeft" trigger={['click']}>
                        <Avatar icon={<UserOutlined />} size={38} className="cursor-pointer hover:scale-110" />
                    </Dropdown>

                    {/* <span className="text-white ml-3 text-base">{userName}</span> */}
                </>
            )}
        </Header >
    );
};

export default HeaderComponent;

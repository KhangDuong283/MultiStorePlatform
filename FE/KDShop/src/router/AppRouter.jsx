import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BuyerLayout from "../layouts/BuyerLayout";
import AdminLayout from "../layouts/AdminLayout";
import SellerLayout from "../layouts/SellerLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import ToolList from "../features/tools/components/ToolList";
import LoginForm from "../features/auth/components/LoginForm";
import RegisterForm from "../features/auth/components/RegisterForm";
import ForgotPasswordForm from "../features/auth/components/ForgotPasswordForm";
import CourseList from "../features/courses/components/CourseList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAccount } from "../redux/slices/accountSlice";
import AdminHome from "../pages/AdminHome";
import SellerHome from "../pages/SellerHome";
import ProtectedRoute from "../utils/ProtectRoute";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/Checkout";
import OrderHistoryPage from "../pages/OrderHistoryPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BuyerLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                path: "",
                element: <Home />,
            },
            {
                path: "products",
                element: <ToolList />,
            },
            {
                path: "courses",
                element: <CourseList />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "checkout",
                element: <CheckoutPage />,
            },
            {
                path: "order-history",
                element: <OrderHistoryPage />,
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                path: "admin-home",
                element:
                    <ProtectedRoute role="SUPER_ADMIN">
                        <AdminHome />,
                    </ProtectedRoute>
            }
        ]
    },
    {
        path: "/seller",
        element: <SellerLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                path: "seller-home",
                element:
                    <ProtectedRoute role="SELLER">
                        <SellerHome />,
                    </ProtectedRoute>
            }
        ]
    },
    {
        path: "/auth",
        element: <Auth />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                path: "login",
                element: <LoginForm />,
            },
            {
                path: "register",
                element: <RegisterForm />,
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordForm />,
            }
        ]
    }

])

const AppRouter = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (
            window.location.pathname === '/auth/login'
            || window.location.pathname === '/auth/register'
            || window.location.pathname === '/auth/forgot-password'
        ) return;

        dispatch(fetchAccount())
    }, [dispatch])

    return <RouterProvider router={router} />;
}
export default AppRouter;
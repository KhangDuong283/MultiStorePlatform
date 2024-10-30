import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/header/HeaderComponent";
import { Layout } from "antd";

const BuyerLayout = () => {
    return (
        <Layout >
            <HeaderComponent />
            <Outlet />
        </Layout>
    );
}

export default BuyerLayout;

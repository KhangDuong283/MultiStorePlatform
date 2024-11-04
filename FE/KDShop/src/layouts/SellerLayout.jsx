import { Outlet } from "react-router-dom";
import SellerNavbar from "../components/SellerNavbar";
import { Layout } from "antd";
import { useState } from "react";
import CardContainer from "../components/CardContainer";

const SellerLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SellerNavbar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout style={{ marginLeft: collapsed ? 80 : 200, marginTop: "1.2rem" }}>
                <CardContainer>
                    <Outlet />
                </CardContainer>
            </Layout>
        </Layout >
    );
};

export default SellerLayout;

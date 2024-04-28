"use client"
import {
    BulbOutlined,
    FundOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoneyCollectOutlined
} from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import Link from "next/link";
import React, { useState } from 'react';

import { useContext } from "react";

import { ThemeContext } from "@/context/toggle-theme-provider";

const { Sider, Content } = Layout;

type ThemeProvider = {
    theme: String
}
export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode,

}) {
    const [collapsed, setCollapsed] = useState(false);


    const themeMode = useContext(ThemeContext)
    
    const darkModeConfig = {
        theme: {
            color: '#fff', // Example: change text color to white in dark mode
        },
    };

    const lightModeConfig = {
        theme: {
            color: '#000', // Example: change text color to black in light mode
        },
    };

    return (
        <section style={{marginTop: 94}}>
            <ConfigProvider
                 theme={{
                    // 1. Use dark algorithm
                    algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
              
                    // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
                  }}
            >
            <Layout
            
            >
                <Sider trigger={null} collapsible collapsed={collapsed} width={300} theme={themeMode as any}>
                    <div className="demo-logo-vertical" />
                    <Menu  theme={themeMode as any}>
                        <Menu.Item icon={<HomeOutlined />}>
                            <Link href="/dashboard">Home</Link>
                        </Menu.Item>
                        <Menu.Item icon={<FundOutlined />}>
                            <Link href="/dashboard/cryptocurrencies">Cryptocurrencies</Link>
                        </Menu.Item>
                        <Menu.Item icon={<MoneyCollectOutlined />}>
                            <Link href="/dashboard/exchanges">Exchanges</Link>
                        </Menu.Item>
                        <Menu.Item icon={<BulbOutlined />}>
                            <Link href="/news">News</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    {/* <Header style={{ padding: 0 }}> */}
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    {/* </Header> */}
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                        
                    >
                        {children}

                    </Content>
                </Layout>
                
            </Layout>
            </ConfigProvider>
        </section>
    )
}
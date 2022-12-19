import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import './invoice-main-layout.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  EyeOutlined,
  PoweroffOutlined
} from '@ant-design/icons';
import { Layout, Menu , Button} from 'antd';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const { Header, Sider, Content } = Layout;

const InvoiceMainLayout = ({ children, ...rest }) => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token || token.trim().toLowerCase() === 'null' || token.trim().toLowerCase() === 'undefined'){
     history.push('/invoice/sign-in');
    }
  });

  const onSignOutClick = () =>{
    localStorage.clear();
    history.push('/invoice/sign-in');
  }

  return (
    <Layout id="invoiceMainLayoutContainer">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={location.pathname.includes('view') ? ['1'] : ['2']}>
          <Menu.Item key={'1'} icon={<EyeOutlined />}>
            <Link to={'/invoice/view-patient-details'}>
              View Patient Details
            </Link>
          </Menu.Item>
          <Menu.Item key={'2'} icon={<PlusOutlined />}>
            <Link to={'/invoice/add-patient-details'}>
              Add Patient Details
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}

          <Button id='signOutBtn' type='link' icon={<PoweroffOutlined />} onClick={onSignOutClick} >
            Sign Out
          </Button>
        </Header>
        <Content
          className="site-layout-background"
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
  );
};

const InvoiceMainLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <InvoiceMainLayout>
        <Component {...matchProps} />
      </InvoiceMainLayout>
    )} />
  )
}

export default InvoiceMainLayoutRoute;


import React from 'react';
import { Route } from 'react-router-dom';
import { Col, Layout, Menu, Row, Tag, theme } from 'antd';
import './public-web-layout.css';
import { PublicWebConst } from '../../constants/public-web-const';
const { Header, Content, Footer } = Layout;


const PublicWebLayout = ({ children, ...rest }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onMenuItemClick = (type) => {
        switch (type) {
            case 1: {
                const section = document.querySelector('#home');
                return section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            case 2: {
                const section = document.querySelector('#services');
                return section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            case 3: {
                const section = document.querySelector('#about');
                return section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            case 4: {
                const section = document.querySelector('#contact');
                return section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
    return (
        <Layout id="publicWebLayout" className="layout" breakpoint={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Header
          id='logoHead'
          >
          <Row>
              <Col>
              <img className='imgLogo' src={window.location.origin+'/logo.png'} />
              </Col>
              <Col span={18}>
                  <label className='lblHead'>Ghinsi Devi Pushpanjali Dental Hospital</label><br/>
                  <label className='lblSubHead'>(A Unit Of Ghinsi Devi Pushpanjali Healthcare Pvt Ltd)</label>
              </Col>
              <Col span={4}>
              {/* <Tag className='headerTag' color="gold">Call: 01423 - 299266, 91 - 9602304200</Tag> */}
              </Col>
          </Row>
          </Header>
            <Header
            id='menuHead'
               className='menuHeader'
            >
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    >

                    <Menu.Item key={'1'} onClick={() => onMenuItemClick(1)}>
                        Home
                    </Menu.Item>

                    <Menu.Item key={'2'} onClick={() => onMenuItemClick(2)}>
                        Services
                    </Menu.Item>

                    <Menu.Item key={'3'} onClick={() => onMenuItemClick(3)}>
                        About
                    </Menu.Item>

                    <Menu.Item key={'4'} onClick={() => onMenuItemClick(4)}>
                        Contact
                    </Menu.Item>
  
                    
                </Menu>
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ghinsi Devi Pushpanjali Dental Hospital
            </Footer>
        </Layout>
    );
};

const PublicWebLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <PublicWebLayout>
                <Component {...matchProps} />
            </PublicWebLayout>
        )} />
    )
}

export default PublicWebLayoutRoute;
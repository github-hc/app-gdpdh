import React from 'react';
import { Carousel } from 'antd';
import { Card } from 'antd';
import './home.css';
import { CalendarOutlined, ClockCircleOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';

const gridStyle1 = {
  width: '25%',
  textAlign: 'center',
  height: '100px',
  background: '#DCDCDC'
};

const gridStyle2 = {
    width: '25%',
    textAlign: 'center',
    height: '100px',
    background: '#18AFD3'
  };

const gridStyle3 = {
    width: '25%',
    textAlign: 'center',
    height: '100px',
    background: '#DCDCDC'
  };  

const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Home = () => (
    <>
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>

<Card>
  <Card.Grid style={gridStyle1}>
      <label className="lblMainDetailsOth"><span><HomeOutlined /></span><span>505, Gangori Bazar, Jaipur - 302002</span></label>
  </Card.Grid>
    <Card.Grid style={gridStyle2}>
    <label className="lblMainDetailsMid"><span><CalendarOutlined /></span><span>Book Appointment</span></label><br/>
    <label className="lblMainDetailsMid"><span>( +91-7597513465 )</span></label><br/>
    </Card.Grid>
    <Card.Grid style={gridStyle3}>
    
    <label className="lblMainDetailsOth"><span><ClockCircleOutlined /></span> <span>Mon - Fri : 10:30 AM - 5PM</span></label><br/>
    </Card.Grid>
  </Card>
  </>
);
export default Home;
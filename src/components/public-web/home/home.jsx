import React from 'react';
import { Carousel } from 'antd';
import { Card } from 'antd';
import './home.css';
import { BookOutlined, CalendarOutlined, ClockCircleOutlined, HomeOutlined, MobileOutlined, PhoneOutlined } from '@ant-design/icons';

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
      <Card.Grid className='gridStyleLR'>
        <label className="lblMainDetailsOth">
          <span className='gridStyleSpanRowLR_Head'><PhoneOutlined /> 01423 - 299266</span><br />
          <span className='gridStyleSpanRowLR_Head'><MobileOutlined /> 91 - 9602304200</span><br />
        </label>
      </Card.Grid>
      <Card.Grid className='gridStyleCenter' onClick={()=>{
            const section = document.querySelector('#contact');
            return section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
      }}>
        <label className="lblMainDetailsMid">
          <span className='gridStyleSpanRowMid_Head'><CalendarOutlined /><br/> Book An Appointment</span><br/>
        </label>
      </Card.Grid>
      <Card.Grid className='gridStyleLR' onClick={()=>{
            const section = document.querySelector('#aboutFoundation');
            return section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
      }}>
        <label className="lblMainDetailsOth">
          <span className='gridStyleSpanRowLR_Head'><BookOutlined /><br/> About Pushpanjali NGO</span><br />
        </label><br />
      </Card.Grid>
    </Card>
  </>
);
export default Home;
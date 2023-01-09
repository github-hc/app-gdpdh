import React from 'react';
import { Carousel } from 'antd';
import { Card } from 'antd';
import './home.css';
import { BookOutlined, CalendarOutlined, ClockCircleOutlined, HomeOutlined, MobileOutlined, PhoneOutlined } from '@ant-design/icons';
import { PublicWebConst } from '../../../constants/public-web-const';

const contentStyle = {
  height: '430px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Home = () => (
  <>
    <Carousel autoplay>
      <div>
        <img style={contentStyle} width={'100%'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1L3XYd08iG2LmX_mPD7iDmIEu3j84i4u1"} />
      </div>
      <div>
        <img style={contentStyle} width={'100%'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1YVESj4vVgor_d-a81O0K4Lhd1p7yWuWc"} />
      </div>
      <div>
        <img style={contentStyle} width={'100%'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1CjtfyuetKrP8O74OleNPHpcujfFpPRgg"} />
      </div>
      <div>
        <img style={contentStyle} width={'100%'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1GdY26gbOslk16PM1VRBYxzQb5Ntvtnb_"} />
      </div>
    </Carousel>

    <Card style={{ padding: '3px' }}>
      <Card.Grid className='gridStyleLR'>
        <label className="lblMainDetailsOth">
          <span className='gridStyleSpanRowLR_Head'><PhoneOutlined /> 01423 - 299266</span><br />
          <span className='gridStyleSpanRowLR_Head'><MobileOutlined /> 91 - 9602304200</span><br />
        </label>
      </Card.Grid>
      <Card.Grid className='gridStyleCenter' onClick={() => {
        const section = document.querySelector('#contact');
        return section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}>
        <label className="lblMainDetailsMid">
          <span className='gridStyleSpanRowMid_Head'><CalendarOutlined /><br /> Book An Appointment</span><br />
        </label>
      </Card.Grid>
      <Card.Grid className='gridStyleLR' onClick={() => {
        const section = document.querySelector('#aboutFoundation');
        return section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}>
        <label className="lblMainDetailsOth">
          <span className='gridStyleSpanRowLR_Head'><BookOutlined /><br /> About Pushpanjali NGO</span><br />
        </label><br />
      </Card.Grid>
    </Card>
  </>
);
console.clear();
export default Home;
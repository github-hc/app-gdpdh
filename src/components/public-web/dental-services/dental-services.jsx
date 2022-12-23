import React from 'react';
import { Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import './dental-services.css';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
  height: '150px'
};

const DentalServices = () => (
  <Card>
    <Card.Grid className='serviceGridStyle'>
      <img className='imgDimensions' alt="Dental Filling" src={'' + window.location.origin + '/images/filling-icon.png'} />
      <Meta className='serviceDesc' title="" description="Dental Filling" />
    </Card.Grid>
    <Card.Grid className='serviceGridStyle'>
      <img className='imgDimensions' alt="Root Canal Treatment" src={'' + window.location.origin + '/images/root-canal-icon.png'} />
      <Meta className='serviceDesc' title="" description="Root Canal Treatment" />
    </Card.Grid>
    <Card.Grid className='serviceGridStyle'>
      <img className='imgDimensions' alt="Wisdom Teeth Removal" src={'' + window.location.origin + '/images/teeth-removal-icon.png'} />
      <Meta className='serviceDesc' title="" description="Wisdom Teeth Removal" />
    </Card.Grid>
    <Card.Grid className='serviceGridStyle'>
      <img className='imgDimensions' alt="Wisdom Teeth Removal" src={'' + window.location.origin + '/images/braces-align-icon.png'} />
      <Meta className='serviceDesc' title="" description="Braces & Aligners" />
    </Card.Grid>
    <Card.Grid className='serviceGridStyle'>
      <img className='imgDimensions' alt="Bridges & Crowns" src={'' + window.location.origin + '/images/crowns-bridges-icon.png'} />
      <Meta className='serviceDesc' title="" description="Bridges & Crowns" />
    </Card.Grid>
    <Card.Grid className='serviceGridStyle'>
      <img className='imgDimensions' alt="Kids Dentistry" src={'' + window.location.origin + '/images/childrens-dentistry-icon.png'} />
      <Meta className='serviceDesc' title="" description="Kids Dentistry" />
    </Card.Grid>
    <Card.Grid className='serviceGridStyle'>
      <img className='imgDimensions' alt="Smile Makeover" src={'' + window.location.origin + '/images/smile-makeover-icon.png'} />
      <Meta className='serviceDesc' title="" description="Smile Makeover" />
    </Card.Grid>
    <Card.Grid className='serviceGridStyle'>
      <img className='imgDimensions' alt="Teeth Whitening" src={'' + window.location.origin + '/images/teeth-whitening-icon.png'} />
      <Meta className='serviceDesc' title="" description="Teeth Whitening" />
    </Card.Grid>
  </Card>
);
export default DentalServices;
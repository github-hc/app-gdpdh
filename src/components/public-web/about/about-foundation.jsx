import { Card, Carousel, Col, Row, Space, Tag, Timeline } from 'antd';
import Meta from 'antd/es/card/Meta';
import { PublicWebConst } from '../../../constants/public-web-const';
import './about-foundation.css';

const contentStyle = {
  height: '430px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#097969 ',
  padding: '12px',
};

const AboutFoundation = () => {
  return (
    <div id="aboutFoundationContainer">
      <div id="aboutFoundation">
        <Card title="Ghinsi Devi  Pushpanjali  GDP Foundation Jaipur">
          <p>
            Ghinsi  Devi  Pushpanjali foundation was established in December 2020 to provide mainly dental health and education along with  basic health services in rural areas  at outskirts of Jaipur.
          </p>
          <p>
            The  Ghinsi  Devi Pushpanjali foundation is working to improve oral health in rular areas, where a significant proportion of population has a incidence of poor oral health.  We provide free dental services. Our volunteers participate in multiple outreach camp programs throughout the year- to educate diagnose and treat hundreds of people in need.
          </p>
          <p>
            A simple example of an awareness activity undertaken by our dentists is to demonstrate how to brush. They are told how to hold the brush, kind of toothpaste to be used and frequency of brushing. We often provide them with free toothpaste and brushes for regular use. We educate the elderly on how the constant consumption of tobacco and gutkha can ruin oral health.
          </p>

          <p>

            <h4>Why We ?</h4>
            <Timeline>
              <Timeline.Item color='green'>Provide much needed all round treatment</Timeline.Item>
              <Timeline.Item color='green'>Trusted and Reliable</Timeline.Item>
              <Timeline.Item color='green'>No cost treatment</Timeline.Item>
              <Timeline.Item color='green'>Clinical diagnosis and treatment is provided on spot</Timeline.Item>
              <Timeline.Item color='green'>No waiting period</Timeline.Item>
            </Timeline>

          </p>

          <p>

            <h4>Our Mission</h4>
            <Timeline>
              <Timeline.Item color='green'>To provide multiple treatment options and ensure quality of it.</Timeline.Item>
              <Timeline.Item color='green'>To educate our society about oral health and bring better results.</Timeline.Item>
            </Timeline>

          </p>

          <p>

            <h4>Our Vision</h4>
            <Timeline>
              <Timeline.Item color='green'>Trusted and renowned in oral healthcare.</Timeline.Item>
            </Timeline>

          </p>
          <p>

            <h4>Our Values</h4>
            <Timeline>
              <Timeline.Item color='green'>Respect</Timeline.Item>
              <Timeline.Item color='green'>Integrity</Timeline.Item>
              <Timeline.Item color='green'>Appreciation</Timeline.Item>
              <Timeline.Item color='green'>Empowering</Timeline.Item>
              <Timeline.Item color='green'>Compassion</Timeline.Item>
              <Timeline.Item color='green'>collaboration</Timeline.Item>
            </Timeline>

          </p>

          <Carousel>
            <div>
              <img style={contentStyle} width={'100%'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1rQDVS_u4T2BBIqBNy_mh5hqLr5o9_leB"} />
            </div>
            <div>
              <img style={contentStyle} width={'100%'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1Ilw8Nn8p9WXGheFfNKgVhH3KucI7TcxV"} />
            </div>
            <div>
              <img style={contentStyle} width={'100%'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1-UwDOFPMz1KxGzv1turpB_PHYleqshJ0"} />
            </div>
            <div>
              <img style={contentStyle} width={'100%'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1afhEPUHXV053ddpi_vKL-UjtjvReOB-z"} />
            </div>
          </Carousel>
        </Card>

      </div>
    </div>
  )
}

export default AboutFoundation;
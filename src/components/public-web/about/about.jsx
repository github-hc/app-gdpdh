import { Card, Carousel, Col, Divider, Progress, Row, Space, Tag, Timeline } from 'antd';
import Meta from 'antd/es/card/Meta';
import { PublicWebConst } from '../../../constants/public-web-const';
import './about.css';

const contentStyle = {
  height: '430px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#097969 ',
  padding: '12px',
};

const About = () => {
  return (
    <div id="aboutDetailsContainer">
      <div id="aboutHospital">
        <Card>
          <p>
            Ghinsi  Devi  Pushpanjali Dental Hospital was established in December 2020 to provide mainly dental health and education along with  basic health services in rural areas  at outskirts of Jaipur.
          </p>
          <p>
            We are working to improve oral health in rular areas, where a significant proportion of population has a incidence of poor oral health.
          </p>
          <p>
            We offer a full renge of options when it comes to dental health. We are available at two main locations Daulatpura(NH-48) and Gangauri Bazar in Jaipur.
          </p>

          <p>
            Whether you need urgent dental care, or just a convenient appointment around your schedule, nothing makes us happier than seeing a smile return after a painful dental emergency.
          </p>

          <p>
            Your visits with us are all about you, your comfort, happiness and complete satisfaction with your care. Our mission is to establish a lifelong bond with our patients and we treat everyone like a member of our family. It is our belief, that the more you know about dental health, the better prepared you are to make wise decisions about your health care. We always stay informed of the latest advancements in dental technology and we will take the time to discuss different options with our patients, to arrive at the best personalized plan for each individual.
          </p>
          <p>
            A smile is worth a thousand words. It speaks volume about a person and we are always happy to bring a smile on your face.
          </p>

          <Carousel>
            <div>
              <img style={contentStyle} width={'100%'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=110-O6Fi2V8uUPG8OcIEkR5v4DwDzEnn2"} />
            </div>
            <div>
              <img style={contentStyle} width={'100%'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1IFA4h4UBSWUqR5OdNjJQ2SimW01i8xap"} />
            </div>
            <div>
              <img style={contentStyle} width={'100%'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1YjyYxmHP--gGAebPlA-RPHIPu9-PimwW"} />
            </div>
            <div>
              <img style={contentStyle} width={'100%'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1swdFzZ7RnRNOCDYmJAHLJ2u2LgEFZgpC"} />
            </div>
          </Carousel>
        </Card>
      </div>
      <div id="aboutFounders">
        <Card title="Our Founders">
          <Row>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <img alt="example" width={'100%'} height={'350px'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1p5HtAqSpRTLj-rU8v5Hl_P9C92YjHhLI"} />
                </Col>
                <Col span={12}>
                  <Card className='profile'>
                    <h4>Dr Lokesh Sod- Dental Surgeon</h4>
                    <p>JDC Jaipur- Batch 2007</p>
                    <p>9602304200</p>
                    <Divider />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <img alt="example" width={'100%'} height={'350px'} src={PublicWebConst.GoogleDriveImagePath + "?export=view&id=1pCCDllxdcF-IjbVgHO79BSXwQj96S2Lu"} />
                </Col>
                <Col span={12}>
                  <Card className='profile'>
                    <h4>Mrs. Pushpanjali- MSc Nursing- Medical Surgical Nursing</h4>
                    <p>S.N. Medical College Jodhpur- Batch- 2013</p>
                    <p>9887060695</p>
                    <Divider />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}

export default About;
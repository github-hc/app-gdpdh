import { HomeTwoTone, MailTwoTone, PhoneTwoTone } from "@ant-design/icons";
import { Card, Col, Row } from "antd";

const Contact = () => {
  return (
    <div>
      <Row>
        <Col span={10} style={{padding:'10px'}}>
          <Card title="Contact" bordered={true} style={{ width: '99%', padding:'4px' }}>
            <Row>
              <Col span={5}><PhoneTwoTone /> Phone :</Col>
              <Col span={19}>+91-7597513465</Col>
            </Row>
            <Row>
              <Col span={5}><HomeTwoTone /> Address :</Col>
              <Col span={19}>505, Gangori Bazar, Jaipur - 302002</Col>
            </Row>
            <Row>
              <Col span={5}><MailTwoTone /> Email :</Col>
              <Col span={19}>gdphc@outlook.com</Col>
            </Row>
          </Card>
        </Col>
        <Col span={14}>
        <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.1908385337833!2d75.81762441501972!3d26.92916386586464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db1aff41bfa81%3A0xe3254c4f16a2443!2s505%2C%20Gangori%20Bazar%20Rd%2C%20Gangori%20Bazaar%2C%20Tripolia%20Bazar%2C%20Pink%20City%2C%20Jaipur%2C%20Rajasthan%20302001!5e0!3m2!1sen!2sin!4v1670618239697!5m2!1sen!2sin" width="100%" height="450" style={{border:'0px'}} allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </Col>
      </Row>
    </div>
  )
}

export default Contact;
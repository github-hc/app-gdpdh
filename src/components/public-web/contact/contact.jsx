import { HomeOutlined, HomeTwoTone, MailOutlined, MailTwoTone, MobileOutlined, PhoneOutlined, PhoneTwoTone } from "@ant-design/icons";
import { Card, Col, Row, Tag } from "antd";
import './contact.css';

const Contact = () => {
  return (
    <div>
      <Row>
        <Col span={24}>
          <div className="contactContainer">
          <Tag  color="red"><PhoneOutlined/> 01423 - 299266 <MobileOutlined/> 91 - 9602304200</Tag>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className="mapLocationContainer">
            <Tag  color="gold"><b>Our Location -  1:</b> <br />
Pushpanjali NH-48, Service Road,<br/>Daulatpura, Rajasthan 303805</Tag>
            <br />
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3552.4877968872784!2d75.8312748150223!3d27.077911159477416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396daf48d02b1b35%3A0x37bcb452b5c3bf3f!2sGhinsi%20Devi%20Pushpanjali%20Dental%20Hospital!5e0!3m2!1sen!2sin!4v1671748275164!5m2!1sen!2sin" className="mapLocation" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

        </Col>
        <Col span={12}>
          <div className="mapLocationContainer"> 
          <Tag  color="gold"><b>Our Location -  2:</b> <br />505, Gangori Bazar Rd, Gangori Bazaar <br/> Jaipur, Rajasthan 302002</Tag>
            <br />
            <br />
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.1908385337833!2d75.81762441501972!3d26.92916386586464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db1aff41bfa81%3A0xe3254c4f16a2443!2s505%2C%20Gangori%20Bazar%20Rd%2C%20Gangori%20Bazaar%2C%20Tripolia%20Bazar%2C%20Pink%20City%2C%20Jaipur%2C%20Rajasthan%20302001!5e0!3m2!1sen!2sin!4v1670618239697!5m2!1sen!2sin" className="mapLocation" allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Contact;
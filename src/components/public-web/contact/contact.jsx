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
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14228.763955341426!2d75.8198131!3d26.9291591!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb210019015fa9fcb!2sDr%20Lokesh%20sod!5e0!3m2!1sen!2sin!4v1672586147184!5m2!1sen!2sin" className="mapLocation" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Contact;
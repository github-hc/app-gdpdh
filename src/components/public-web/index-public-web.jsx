import { Divider } from "antd";
import About from "./about/about";
import AboutFoundation from "./about/about-foundation";
import Contact from "./contact/contact";
import DentalServices from "./dental-services/dental-services";
import Home from "./home/home";
import './index-public-web.css';

const IndexPublicWeb = () => {

    return (
        <div id="mainContainer">
            <div id="home">
                <Home />
            </div>

            <Divider>Our Services</Divider>

            <div id="services">
                <DentalServices />
            </div>

            <Divider>About Us</Divider>

            <div id="about">
                <About />
            </div>

            <Divider>About Our NGO</Divider>
            <div id="aboutFoundation">
                <AboutFoundation />
            </div>

            <Divider>Contact Us</Divider>

            <div id="contact">
                <Contact />
            </div>
        </div>
    );
}
export default IndexPublicWeb;
import React from 'react';
import { Card, Divider } from 'antd';
import './patient-card-template.css';
import moment from 'moment';

const PatientCardTemplate = ({ patientDetails }) => (
    <div className="site-card-border-less-wrapper">
        <Card
            bordered={true}
            style={{
                width: 280,
                backgroundColor: '#bfd8d9'
            }}
        >
            <table id="cardDetails">
                <tbody>
                    <tr id="headerCard">
                        <td id="headerLeft">
                            <label><span id="lblTop">Ghinsi Devi</span><span id="lblMid">Pushpanjali</span><span id="lblLast">Dental Hospital</span></label>
                        </td>
                        <td id="headerRight">
                            <label><span>505, Gangori Bazar</span><span>Jaipur- 302002</span><span>Dental Hospital</span></label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Divider style={{ margin: '1px' }} />
                        </td>
                    </tr>
                    <tr className="lineHeight">
                        <th>Dentist Name:</th>
                        <td>Dr. Lokesh Sod</td>
                    </tr>
                    <tr className="lineHeight">
                        <th>Patient Name:</th>
                        <td>{patientDetails.fullName}</td>
                    </tr>
                    <tr className="lineHeight">
                        <th>Reg. No:</th>
                        <td>{patientDetails.registrationNo}</td>
                    </tr>
                    <tr className="lineHeight">
                        <th>Reg. Date:</th>
                        <td>{moment(patientDetails.created).format('DD-MM-YYYY').toString()}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Divider style={{ margin: '1px' }} />
                        </td>
                    </tr>
                    <tr >
                        <td colSpan={2}>
                            <table id="cardFooter">
                                <tbody>
                                    <tr>
                                        <td>
                                            <label id="lblAddress">
                                                gdphc@outlook.com
                                            </label>
                                        </td>
                                        <td>
                                            <label id="lblMobile">
                                                +91-7597513465
                                            </label>
                                        </td>
                                        <td>
                                            <label id="lblWeb">
                                                ghinsidevipushpanjali.in
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
    </div>
);
export default PatientCardTemplate;
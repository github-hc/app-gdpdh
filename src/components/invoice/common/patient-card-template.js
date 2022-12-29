import React from 'react';
import { Card, Divider } from 'antd';
import './patient-card-template.css';

const PatientCardTemplate = ({ patientDetails }) => {
    return (<>
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
                                <label><span>Pushpanjali NH-48, Service Road,</span><span>Daulatpura, Rajasthan 303805</span></label>
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
                            <td>{patientDetails.created}</td>
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
                                                    01423-299266
                                                </label>
                                            </td>
                                            <td>
                                                <label id="lblMobile">
                                                    91-9602304200
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
    </>)
};
export default PatientCardTemplate;
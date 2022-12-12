import { Col, Divider, Row, Table } from 'antd';
import { useState } from 'react';
import './invoice-template.css';
import moment, { Moment } from 'moment';
const InvoiceTemplate = ({ patientBasicDetails, paricularsList, particularsTotal }) => {
    console.log(patientBasicDetails);
    return (
        <div style={{ padding: '10px', fontSize: '6px' }}>
            <table id="mainInvoiceTable" style={{ width: '380px' }}>
                <tbody>
                    <tr>
                        <td>
                            <h3>Invoice</h3>
                            <p>Date: {moment().format('DD-MM-YYYY')}</p>
                        </td>
                        <td>
                            <table cellSpacing={'0'} cellPadding={'0'} style={{ textAlign: 'right', float: 'right', padding: '2px' }}>
                                <tr>
                                    <td>Ghinsi Devi</td>
                                </tr>
                                <tr>
                                    <td><strong>Pushpanjali</strong></td>
                                </tr>
                                <tr>
                                    <td><strong>Dental Hospital</strong></td>
                                </tr>
                                <tr>
                                    <td>505, Gangori Bazar, <br /> Jaipur - 302002</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Divider style={{ margin: '4px' }} />
                        </td>
                    </tr>
                    <tr id="patientDetailsRow">
                        <td>
                            <table id="patientDetailsCol1" cellSpacing={'0'} cellPadding={'0'}>
                                <tbody>
                                    <tr>
                                        <th>Patient Name:</th>
                                        <td>{patientBasicDetails.fullName}</td>
                                    </tr>
                                    <tr>
                                        <th>Gender: </th>
                                        <td>{patientBasicDetails.gender}</td>
                                    </tr>
                                    <tr>
                                        <th>Age: </th>
                                        <td>{patientBasicDetails.age}</td>
                                    </tr>
                                    <tr>
                                        <th>Conatct: </th>
                                        <td>{patientBasicDetails.contactNo}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table id="patientDetailsCol2" cellSpacing={'0'} cellPadding={'0'}>
                                <tbody>
                                    <tr>
                                        <th>Reg. No: </th>
                                        <td>{patientBasicDetails.registrationNo}</td>
                                    </tr>
                                    <tr>
                                        <th>Appointment Date: </th>
                                        <td>{typeof (patientBasicDetails.appointmentDate) === 'object' ? patientBasicDetails.appointmentDate.format('DD-MM-YYYY') : moment(patientBasicDetails.appointmentDate).format('DD-MM-YYYY')}</td>
                                    </tr>
                                    <tr>
                                        <th>Consultant: </th>
                                        <td>Dr. Lokesh SOD</td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <td>(Dental Surgeon)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Divider style={{ margin: '4px' }} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <table id="partcularsTable" border={'1'} cellSpacing={'0'} cellPadding={'0'} width={'380px'}>
                                <tr>
                                    <th>Sr No</th>
                                    <th>Particulars</th>
                                    <th>Amount (₹)</th>
                                </tr>
                                {
                                    paricularsList.length > 0 ?
                                        paricularsList.map((row, index) => {
                                            return <tr>
                                                <td width={'50px'} height={'10px'}>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {row.particular}
                                                </td>
                                                <td width={'100px'}>
                                                    {row.amount}
                                                </td>
                                            </tr>
                                        })
                                        :
                                        <><td height={'10px'}></td> <td></td> <td></td></>
                                }
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <table width={'380px'} id="particularsSummary">
                                <tr>
                                    <td colSpan={3}><strong>Total (₹)</strong>: {particularsTotal}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceTemplate;

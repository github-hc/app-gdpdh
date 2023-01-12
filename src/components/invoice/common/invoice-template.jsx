import { Divider } from 'antd';
import './invoice-template.css';

const InvoiceTemplate = ({ patientBasicDetails, paricularsList, particularsTotal, invoiceNo }) => {
    return (
        <div style={{ padding: '2px', fontSize: '6px' }}>
            <table id="mainInvoiceTable" width={'100%'}>
                <tbody>
                    <tr>
                        <td>
                            <h3>Invoice: {invoiceNo}</h3>
                            (Call: 01423-299266, 91-9602304200)
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
                                    <td>Address-1: Pushpanjali NH-48, Service Road, <br /> Daulatpura, Rajasthan 303805</td>
                                </tr>
                                <tr>
                                    <td>Address-2: 505, Gangori Bazar, <br /> Jaipur - 302002</td>
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
                                        <td>{typeof (patientBasicDetails.appointmentDate) === 'object' ? patientBasicDetails.appointmentDate.format('DD-MM-YYYY HH:mm') :  patientBasicDetails.appointmentDate}</td>
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
                            <table id="partcularsTable" border={'1'} cellSpacing={'0'} cellPadding={'0'}>
                                <thead>
                                <tr>
                                    <th width={'12%'}>Sr No</th>
                                    <th width={'68%'}>Particulars</th>
                                    <th width={'20%'}>Amount (₹)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    paricularsList.length > 0 ?
                                        paricularsList.map((row, index) => {
                                            return <tr>
                                                <td>
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
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <table id="particularsSummary" width={'100%'}>
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

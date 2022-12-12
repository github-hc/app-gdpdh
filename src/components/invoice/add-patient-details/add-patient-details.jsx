import { Button, Col, DatePicker, Form, Input, Row, Select, Table, Space, Drawer, InputNumber } from 'antd';
import {
    PlusOutlined,
    MinusOutlined,
    PrinterOutlined,
    IdcardOutlined
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Preview, print } from 'react-html2pdf';
import './add-patient-details.css';
import InvoiceTemplate from '../common/invoice-template';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { PatientDetailService } from '../../../services/patient-detail-service';
import { useLocation } from 'react-router-dom';
import PatientCardTemplate from '../common/patient-card-template';

dayjs.extend(customParseFormat);

const AddPatientDetails = () => {
    //#region local var declare
    const { Option } = Select;
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 16 },
    };
    const [form] = Form.useForm();
    const particularsColumns = [
        {
            dataIndex: 'key',
            title: "Sr. No.",
            width: '80px'
        },
        {
            dataIndex: 'particular',
            title: 'Particulars',
            render: (text, record, index) => <Input type="text" onChange={(e) => onParticularRowInputChange(e, index)} />
        },
        {
            dataIndex: 'amount',
            title: "Amount (₹)",
            render: (text, record, index) => <InputNumber
                formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\₹\s?|(,*)/g, '')}
                onChange={(e) => onAmountRowInputChange(e, index)} />
        }
    ]
    //#endregion

    //#region state var declare
    const [particularsTableData, setparticularsTableData] = useState([]);
    const [openInvoiceDrawer, setOpenInvoiceDrawer] = useState(false);
    const [openCardDrawer, setOpenCardDrawer] = useState(false);
    const [patientBasicDetails, setPatientBasicDetails] = useState(null);
    const [patientParticularsDetails, setPatientParticularsDetails] = useState([]);
    const [particularsTotal, setParticularsTotal] = useState(0);
    const [idQueryParameter, setIdQueryParameter] = useState(0);
    const location = useLocation();
    //#endregion

    //#region useEffect
    useEffect(() => {
        const idQueryParam = new URLSearchParams(location.search).get('id');
        if (idQueryParam) {
            const existingPatientRowSelected = JSON.parse(localStorage.getItem('ExistingPatientRowSelected'));
            console.log(idQueryParam);
            console.log(existingPatientRowSelected);
            if (existingPatientRowSelected && existingPatientRowSelected.id === parseInt(idQueryParam)) {
                setIdQueryParameter(idQueryParam);
                console.log('match')
                console.log(form);
                form.setFieldsValue(
                    {
                        regNo: existingPatientRowSelected.registrationNo,
                        fullName: existingPatientRowSelected.fullName,
                        age: existingPatientRowSelected.age,
                        gender: existingPatientRowSelected.gender,
                        contactNo: existingPatientRowSelected.contactNo
                    }
                );

                const createPatientDetailsReq = {
                    registrationNo: existingPatientRowSelected.registrationNo,
                    fullName: existingPatientRowSelected.fullName,
                    age: existingPatientRowSelected.age,
                    gender: existingPatientRowSelected.gender,
                    contactNo: existingPatientRowSelected.contactNo,
                    particularsList: []
                };

                setPatientBasicDetails(createPatientDetailsReq);
            }
        }

        if (particularsTableData.length === 0) {
            let initServiceTableData =
                [
                    {
                        key: 1,
                    }
                ]

            setparticularsTableData(initServiceTableData);
        }
    }, []);
    //#endregion

    //#region events
    const onAddParticular = () => {
        const newKeyIndex = particularsTableData.length + 1;
        setparticularsTableData([...particularsTableData, { key: newKeyIndex }]);
    }

    const onRemoveParticular = () => {
        const particularsTableDataLen = particularsTableData.length;

        if (particularsTableDataLen > 1) {
            setparticularsTableData((current) => current.filter((row) => row.key !== particularsTableDataLen));
        }
        else {
            alert('Can not remove first row');
        }
    }

    const onParticularRowInputChange = (e, i) => {
        console.log(e)
        const particularsTableDataLen = particularsTableData.length + 1;
        let copyServiceTableData = [...particularsTableData];


        if (particularsTableDataLen < i) {
            copyServiceTableData.push({ key: particularsTableDataLen, particular: e.target.value });
        }
        else {
            copyServiceTableData[i].particular = e.target.value;
        }

        setparticularsTableData(copyServiceTableData);
    }

    const onAmountRowInputChange = (val, i) => {
        console.log(val)
        const particularsTableDataLen = particularsTableData.length + 1;
        let copyServiceTableData = [...particularsTableData];


        if (particularsTableDataLen < i) {
            copyServiceTableData.push({ key: particularsTableDataLen, amount: val });
        }
        else {
            copyServiceTableData[i].amount = val;
        }

        setparticularsTableData(copyServiceTableData);
    }

    const onFinish = async (values) => {
        console.log(values)
        console.log(particularsTableData);
        console.log(values);

        let particularsArr = [];

        for (let i = 0; i < particularsTableData.length; i++) {
            if (particularsTableData[i].particular && particularsTableData[i].amount) {
                particularsArr.push({
                    particular: particularsTableData[i].particular,
                    amount: parseFloat(particularsTableData[i].amount)
                })
            }
        }

        const idQueryParam = new URLSearchParams(location.search).get('id');
        const createPatientDetailsReq = {
            id: idQueryParam ? parseInt(idQueryParam) : 0,
            registrationNo: values.regNo,
            fullName: values.fullName,
            age: values.age,
            gender: values.gender,
            appointmentDate: values.date,
            contactNo: values.contactNo,
            particularsList: particularsArr
        };

        console.log(createPatientDetailsReq);
        const response = await PatientDetailService.createPatientDetail(createPatientDetailsReq);
        console.log(response);
        if (response && response.status === 200 && response.data) {
            setPatientBasicDetails(createPatientDetailsReq);

            let existingPatientRowSelected = JSON.parse(localStorage.getItem('ExistingPatientRowSelected'));

            if (existingPatientRowSelected) {
                existingPatientRowSelected.fullName = createPatientDetailsReq.fullName;
                existingPatientRowSelected.age = createPatientDetailsReq.age;
                existingPatientRowSelected.gender = createPatientDetailsReq.gender;
                existingPatientRowSelected.contactNo = createPatientDetailsReq.contactNo;

                localStorage.setItem('ExistingPatientRowSelected', JSON.stringify(existingPatientRowSelected));
            }
            alert('Saved Successfully');
        }
        else {
            setPatientBasicDetails(null);
            alert(response.data ? response.data : 'Could not save details');
        }
    };

    const onPrintInvoiceClick = () => {
        console.log(patientBasicDetails);
        if (!patientBasicDetails || !patientBasicDetails.appointmentDate) {
            alert('No Details Found To Print Invoice');
            return;
        }

        let totalAmt = 0;
        for (let i = 0; i < patientBasicDetails.particularsList.length; i++) {
            totalAmt += parseFloat(patientBasicDetails.particularsList[i].amount);
        }

        setParticularsTotal(totalAmt);
        setPatientParticularsDetails(patientBasicDetails.particularsList);
        setOpenInvoiceDrawer(true);
    }

    const onPrintCardClick = () => {
        console.log(patientBasicDetails);
        if (!patientBasicDetails) {
            alert('No Details Found To Print Invoice');
            return;
        }

        setOpenCardDrawer(true);
    }

    const onInvoiceDrawerClose = () => {
        setOpenInvoiceDrawer(false);
    };

    const onCardDrawerClose = () => {
        setOpenCardDrawer(false);
    };
    //#endregion

    //#region Helper Functions
    function allowNumbersOnly(e) {
        var code = (e.which) ? e.which : e.keyCode;
        if (code > 31 && (code < 48 || code > 57)) {
            e.preventDefault();
        }
    }
    //#endregion
    return (
        <Form
            form={form}
            {...layout}
            id='addPatientDetailsForm'
            onFinish={onFinish}
        >
            <Drawer
                title={''}
                placement="right"
                size={'large'}
                width={'500px'}
                onClose={onInvoiceDrawerClose}
                open={openInvoiceDrawer}
                extra={
                    <Space>
                        <Button onClick={onInvoiceDrawerClose}>Cancel</Button>
                        <Button type="primary" onClick={() =>
                            print('a', 'preview-invoice-template')}>
                            Download PDF
                        </Button>
                    </Space>
                }
            >
                {openInvoiceDrawer ?
                    <Preview id={'preview-invoice-template'}>
                        <InvoiceTemplate patientBasicDetails={patientBasicDetails} paricularsList={patientParticularsDetails} particularsTotal={particularsTotal} />
                    </Preview>
                    : <></>
                }
            </Drawer>

            <Drawer
                title={''}

                placement="right"
                size={'large'}
                width={'500px'}
                onClose={onCardDrawerClose}
                open={openCardDrawer}
                extra={
                    <Space>
                        <Button onClick={onCardDrawerClose}>Cancel</Button>
                        <Button type="primary" onClick={() =>
                            print('b', 'preview-card-template')}>
                            Download PDF
                        </Button>
                    </Space>
                }
            >
                {openCardDrawer ?
                    <Preview id={'preview-card-template'}>
                        <PatientCardTemplate patientDetails={patientBasicDetails} />
                    </Preview>
                    : <></>
                }
            </Drawer>

            <Row>
                <Col span={24} id="regNoDetails">
                    <Form.Item
                        name="regNo"
                        label="Reg. No."
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input disabled={idQueryParameter > 0 ? true : false} />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Form.Item
                        name="age"
                        label="Age"
                    >
                        <Input onKeyPress={allowNumbersOnly} maxLength="3" />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Form.Item name="gender" label="Gender">
                        <Select
                            allowClear
                        >
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Form.Item
                        name="contactNo"
                        label="ContactNo"
                    >
                        <Input onKeyPress={allowNumbersOnly} maxLength="20" />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Form.Item
                        name="date"
                        label="Appointment"
                    >

                        <DatePicker showTime format={'DD-MM-YYYY HH:mm'} />
                    </Form.Item>
                </Col>
            </Row>

            <Row id="particularsTable">
                <Col span={24}>
                    <Form.Item
                        label="Particulars"
                    >
                        <Table
                            columns={particularsColumns}
                            dataSource={particularsTableData}
                            pagination={false}
                            scroll={{ y: 200 }}
                        />
                        <Space style={{ float: 'right' }}>
                            <Button type='primary' ghost onClick={onAddParticular} icon={<PlusOutlined />}></Button>
                            <Button danger onClick={onRemoveParticular} icon={<MinusOutlined />}></Button>
                        </Space>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Form.Item
                    >
                        <Space>
                            <Button id="saveBtn" type="primary" htmlType="submit" >Save</Button>
                            <Button type="default" icon={<IdcardOutlined />} onClick={onPrintCardClick}>Print Card</Button>
                            <Button type="default" icon={<PrinterOutlined />} onClick={onPrintInvoiceClick}>Print Invoice</Button>
                        </Space>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default AddPatientDetails;
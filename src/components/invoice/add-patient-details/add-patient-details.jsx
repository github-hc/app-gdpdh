import { Button, Col, DatePicker, Form, Input, Row, Select, Table, Space, Drawer, InputNumber, Spin, Tooltip, Tag } from 'antd';
import {
    PlusOutlined,
    MinusOutlined,
    PrinterOutlined,
    IdcardOutlined,
    FileAddOutlined
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
import moment from 'moment';
import BlankPageTemplate from '../common/blank-page';

dayjs.extend(customParseFormat);

const AddPatientDetails = () => {
    //#region local var declare
    const { Option } = Select;
    const layout = window.innerWidth < 1025 ? {} : {
        labelCol: { span: 2 },
        wrapperCol: { span: 16 },
    };
    const [form] = Form.useForm();
    const cghsServices = [' Flap Operation per quadrant ', ' Gingivectomy per quadrant ', ' Reduction & immobilization of fracture‐ Maxilla Under LA ', ' Reduction & immobilization of fracture‐Mandible Under LA ', ' Splints/Circummandibular wiring under LA ', ' splints/Circummandibular wiring under GA ', ' Internal wire fixation/plate fixation of Maxilla under LA ', ' Internal wire fixation/plate fixation of Maxilla under GA ', ' Internal wire fixation/plate fixation of Mandible under LA ', ' Internal wire fixation/plate fixation of Mandible under GA ', ' Extraction per tooth under LA ', ' Complicated Extraction per Tooth under LA ', ' Extraction of impacted tooth under LA ', ' Extraction in mentally retarded/patients with systemicdiseases/patient with special needs under short term GA ', ' Cyst & tumour of Maxilla /mandible by enucleation/excision/ marsupialisation upto 4 cms under LA ', ' Cyst & tumour of Maxilla / mandible by enucleation / excision / marsupialisation size more than 4 cms ', 'Cyst & tumour of Maxilla/mandible by enucleation/excision/marsupialisation size more than 4 cms under GA ', 'TM joint ankylosis‐ under GA ', 'Biopsy Intraoral‐Soft tissue ', 'Biopsy Intraoral‐Bone ', 'Hemi‐mandibulectomy with graft ', 'Hemi‐mandibulectomy without graft ', 'Segmental‐mandibulectomy with graft ', 'Segmental‐mandibulectomy without graft ', 'Maxillectomy‐ Total with graft ', 'Maxillectomy‐ Total without graft ', ' Maxillectomy‐ partial with graft  ', 'Maxillectomy‐ partial without graft ', 'Release of fibrous bands & grafting ‐in (OSMF) treatment under GA ', 'Pre‐prosthetic surgery‐ Alveoloplasty ', 'Pre‐prosthetic surgery ‐ ridge augmentation ', 'Root canal Treatment(RCT) Anterior teeth(per tooth) ', 'Root canal Treatment(RCT) Posterior teeth (per tooth) ', 'Apicoectomy‐ Single root ', 'Apicoectomy‐Multiple roots ', 'Metal Crown‐per unit ', 'Metal Crown with Acrylic facing per unit ', 'Complete single denture‐metal based', 'Complete denture‐ acrylic based per arch ', 'Removable partial denture‐Metal based‐upto 3 teeth ', 'Removable partial denture‐Metal based‐more than 3 teeth ', 'Removable partial denture‐Acrylic based‐upto 3 teeth ', 'Removable partial denture‐Acrylic based‐more than 3 teeth / Per tooth ', 'Amalgam restoration‐per tooth ', 'Composite Restoration‐per tooth‐anterior tooth ', 'Glass Ionomer filling‐per tooth ', 'Scaling & polishing ', 'Removable Orthodontics appliance‐ per Arch ', 'Fixed Orthodontics‐per Arch ', 'Space maintainers‐Fixed ', 'Habit breaking appliances‐removable ', 'Habit breaking appliances‐Fixed ', 'Expansion plate ', 'Feeding appliance for cleft palate ', 'Functional orthodontic appliances ', 'Obturator (Maxillo‐facial) ', 'Occlusal night guard(splint) '];
    const proceduralServices = ['Consultation', 'Anterior tooth extraction', 'Posterior tooth extraction', 'Complicated tooth extraction', 'Root Stump Extraction', 'Extraction of Impacted tooth', 'Single visit  Scaling and polishing', 'Two visit scaling and polising', 'Three visit scaling and polishing', 'polishing', 'Anterior Root canal treatment', 'Posterior Root Canal Treatment', 'Metal Crown per unit', 'PFM crown per unit', 'CAD/ CAM  PFM Crown', 'Removable Partial Denture- less then 3 teeth', 'Removable partial denture- above 3 teeth', 'Maxillary Complete Denture', 'Mandibular complete denture', 'Mandibular Orthodontic Treatment', 'Maxillary Orthodontic treatment', 'BOTH ARCH ORTHODONTIC TREATMENT', 'Single tooth Dental Implant', 'Full mouth dental implant', 'Anterior Composite filling', 'Posterior composite filling', 'Normal Glass Ionomer Filling- per tooth', 'Standard glass ionomer filling- per tooth', 'Flap Operation per quadrant', 'Gingivectomy per quadrant', 'Reduction and Immobilization of fracture- maxilla under LA', 'Reduction and Immobilization of fracture- mandible under LA', 'Maxillary Splinting', 'Mandibular splinting', 'Internal wire fixation/ Plate fixation', 'Enucleation of Cyst and tumor upto 4 cm under LA', 'Enucleation of Cyst and tumor above 4 cm under LA', 'Apicoectomy‐ Single root', 'Apicoectomy‐Multiple roots', 'Ankylosis', 'Biopsy', 'Mandibulectomy', 'Maxillectomy', 'Alveloplasty', 'Mandibular Apicoectomy', 'Maxillary Apicoectomy', 'Amalgam Restoration', 'Space Maintainers', 'Habit breaking appliances', 'Expansion plate', 'Maxillo-facial Prosthesis', 'Obturator', 'Occlusal night Guard', 'Feeding appliances for cleft palate', 'X- Ray', 'Bleaching per quadrant', 'Minor surgery'];

    const serviceOptions = [
        {
            label: 'Procedure Dental List',
            options: proceduralServices.map((row) => { return { label: row, value: row } })
        },
        {
            label: 'CGHS Dental List',
            options: cghsServices.map((row) => { return { label: row, value: row } }),
        },
    ]
    const particularsColumns = [
        {
            dataIndex: 'key',
            title: "Sr. No.",
            width: '80px'
        },
        {
            dataIndex: 'particular',
            title: 'Particulars',
            //render: (text, record, index) => <Input type="text" onChange={(e) => onParticularRowInputChange(e, index)} />
            render: (text, record, index) => <Select
                showSearch={true}
                onChange={(e) => onParticularRowInputChange(e, index)}
                options={serviceOptions}
            />
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
    const [openBlankPageDrawer, setOpenBlankPageDrawer] = useState(false);
    const [openCardDrawer, setOpenCardDrawer] = useState(false);
    const [patientBasicDetails, setPatientBasicDetails] = useState(null);
    const [patientParticularsDetails, setPatientParticularsDetails] = useState([]);
    const [particularsTotal, setParticularsTotal] = useState(0);
    const [idQueryParameter, setIdQueryParameter] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [invoiceNo, setInvoiceNo] = useState('');
    const location = useLocation();
    //#endregion

    //#region useEffect
    useEffect(() => {
        const idQueryParam = new URLSearchParams(location.search).get('id');
        if (idQueryParam) {
            const existingPatientRowSelected = JSON.parse(localStorage.getItem('ExistingPatientRowSelected'));
            if (existingPatientRowSelected && existingPatientRowSelected.id === parseInt(idQueryParam)) {
                setIdQueryParameter(idQueryParam);
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
        const particularsTableDataLen = particularsTableData.length + 1;
        let copyServiceTableData = [...particularsTableData];


        if (particularsTableDataLen < i) {
            copyServiceTableData.push({ key: particularsTableDataLen, particular: e });
        }
        else {
            copyServiceTableData[i].particular = e;
        }

        setparticularsTableData(copyServiceTableData);
    }

    const onAmountRowInputChange = (val, i) => {
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
        setIsLoading(true);
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
            appointmentDate: moment(values.date.toDate()).utcOffset(+330).toISOString(true),
            contactNo: values.contactNo,
            particularsList: particularsArr
        };

        const response = await PatientDetailService.createPatientDetail(createPatientDetailsReq);

        if (response && response.status === 200 && response.data) {
            createPatientDetailsReq.appointmentDate = moment(createPatientDetailsReq.appointmentDate).format("DD-MM-YYYY HH:mm");
            createPatientDetailsReq.created = moment().format("DD-MM-YYYY");
            setPatientBasicDetails(createPatientDetailsReq);

            let existingPatientRowSelected = JSON.parse(localStorage.getItem('ExistingPatientRowSelected'));

            if (existingPatientRowSelected) {
                existingPatientRowSelected.fullName = createPatientDetailsReq.fullName;
                existingPatientRowSelected.age = createPatientDetailsReq.age;
                existingPatientRowSelected.gender = createPatientDetailsReq.gender;
                existingPatientRowSelected.contactNo = createPatientDetailsReq.contactNo;

                localStorage.setItem('ExistingPatientRowSelected', JSON.stringify(existingPatientRowSelected));
            }
            setInvoiceNo(response.data);
            setIsLoading(false);
            alert('Saved Successfully');
        }
        else {
            setPatientBasicDetails(null);
            setIsLoading(false);
            alert(response.data ? response.data : 'Could not save details');
        }
    };

    const onPrintInvoiceClick = () => {
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
        if (!patientBasicDetails) {
            alert('No Details Found To Print Invoice');
            return;
        }

        setOpenCardDrawer(true);
    }

    const onPrintBlankPageClick = () => {
        if (!patientBasicDetails) {
            alert('No Details Found To Print Invoice');
            return;
        }

        setOpenBlankPageDrawer(true);
    }

    const onInvoiceDrawerClose = () => {
        setOpenInvoiceDrawer(false);
    };

    const onCardDrawerClose = () => {
        setOpenCardDrawer(false);
    };

    const onBlankPageDrawerClose = () => {
        setOpenBlankPageDrawer(false);
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
        <>
            <Space size={'large'} style={{ padding: '5px', margin: '5px' }}>
                <Tag color="gold">New Appointment: </Tag>
            </Space>
            <Spin tip="Please wait..." spinning={isLoading}>
                <Form
                    form={form}
                    {...layout}
                    id='addPatientDetailsForm'
                    onFinish={onFinish}
                    layout={window.innerWidth < 1025 ? 'vertical' : 'horizontal'}
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
                                    print('invoice-' + moment().format('DD/MM/YYYY HH:mm:ss') + '', 'preview-invoice-template')}>
                                    Download
                                </Button>
                            </Space>
                        }
                    >
                        {openInvoiceDrawer ?
                            <Preview id={'preview-invoice-template'}>
                                <InvoiceTemplate patientBasicDetails={patientBasicDetails} paricularsList={patientParticularsDetails} particularsTotal={particularsTotal} invoiceNo={invoiceNo} />
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
                                    print('card-' + moment().format('DD/MM/YYYY HH:mm:ss') + '', 'preview-card-template')}>
                                    Download
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

                    <Drawer
                        title={''}

                        placement="right"
                        size={'large'}
                        width={'500px'}
                        onClose={onBlankPageDrawerClose}
                        open={openBlankPageDrawer}
                        extra={
                            <Space>
                                <Button onClick={onBlankPageDrawerClose}>Cancel</Button>
                                <Button type="primary" onClick={() =>
                                    print('blank-page-' + moment().format('DD/MM/YYYY HH:mm:ss') + '', 'blank-page-template')}>
                                    Download
                                </Button>
                            </Space>
                        }
                    >
                        {openBlankPageDrawer ?
                            <Preview id={'blank-page-template'}>
                                <BlankPageTemplate patientBasicDetails={patientBasicDetails} />
                            </Preview>
                            : <></>
                        }
                    </Drawer>
                    <Row>
                        <Col span={24} id="regNoDetails">
                            <Form.Item
                                name="regNo"
                                label="Reg. No."
                                className="form-control-item"
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
                                className="form-control-item"
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
                                className="form-control-item"
                            >
                                <Input onKeyPress={allowNumbersOnly} maxLength="3" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item name="gender" label="Gender" className="form-control-item">

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
                                className="form-control-item"
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
                                className='form-control-item'
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
                                    <Tooltip title={'Save Patient Details'}><Button id="saveBtn" type="primary" htmlType="submit" >Save</Button></Tooltip>
                                    <Tooltip title={'View Card'}><Button type="default" icon={<IdcardOutlined />} onClick={onPrintCardClick}></Button></Tooltip>
                                    <Tooltip title={'View Invoice'}><Button type="default" icon={<PrinterOutlined />} onClick={onPrintInvoiceClick}></Button></Tooltip>
                                    <Tooltip title={'Download Blank Page'}><Button type="default" icon={<FileAddOutlined />} onClick={onPrintBlankPageClick}></Button></Tooltip>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </>
    );
};

export default AddPatientDetails;
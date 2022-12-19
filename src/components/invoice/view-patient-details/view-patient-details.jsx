import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IdcardOutlined, PrinterOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Row, Col, Drawer, Tooltip, Spin } from 'antd';
import Highlighter from 'react-highlight-words';
import { PatientDetailService } from '../../../services/patient-detail-service';
import { Preview, print } from 'react-html2pdf';
import InvoiceTemplate from '../common/invoice-template';
import PatientCardTemplate from '../common/patient-card-template';
import moment from 'moment';

const ViewPatientDetails = () => {
    //#region local var declare
    //#endregion

    //#region state var declare
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [dataset, setDataset] = useState([]);
    const searchInput = useRef(null);
    const [patientBasicDetails, setPatientBasicDetails] = useState(null);
    const [patientParticularsDetails, setPatientParticularsDetails] = useState([]);
    const [particularsTotal, setParticularsTotal] = useState(0);
    const [openCardDrawer, setOpenCardDrawer] = useState(false);
    const [openInvoiceDrawer, setOpenInvoiceDrawer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    //#endregion

    //#region useEffect
    useEffect(() => {
        async function init() {
            setIsLoading(true);
            const response = await PatientDetailService.getPatientDetail();
            if (response && response.data) {
                let data = [];

                response.data.forEach((row, index) => {
                    data.push({ key: index + 1, ...row });
                });

                setDataset(data);
                setIsLoading(false);
            }
            else {
                setIsLoading(false);
            }
        }

        init();
    }, [])
    //#endregion

    //#region table filters events
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    //#endregion

    //#region events
    const onPrintInvoice = (row) => {
        var values = dataset.find(x => x.id === row.patientID);

        const createPatientDetailsReq = {
            registrationNo: values.registrationNo,
            fullName: values.fullName,
            age: values.age,
            gender: values.gender,
            appointmentDate: row.appointmentDate,
            contactNo: values.contactNo,
            particularsList: row.particularsList
        };

        setPatientBasicDetails(createPatientDetailsReq);

        let totalAmt = 0;
        for (let i = 0; i < createPatientDetailsReq.particularsList.length; i++) {
            totalAmt += parseFloat(createPatientDetailsReq.particularsList[i].amount);
        }

        setParticularsTotal(totalAmt);
        setPatientParticularsDetails(createPatientDetailsReq.particularsList);

        setOpenInvoiceDrawer(true);
    }

    const onExistingNewAppointmentClick = (e) => {
        localStorage.setItem('ExistingPatientRowSelected', JSON.stringify(e));
        history.push('/invoice/add-patient-details?id=' + e.id);
    }

    const onPrintCardClick = (e) => {
        setPatientBasicDetails(e);

        setOpenCardDrawer(true);
    }

    const onCardDrawerClose = () => {
        setOpenCardDrawer(false);
    };
    //#endregion

    //#region helper functions
    const onInvoiceDrawerClose = () => {
        setOpenInvoiceDrawer(false);
    };

    const onAddNewClick = () => {
        localStorage.setItem('ExistingPatientRowSelected', null);
        history.push('/invoice/add-patient-details')
    }
    //#endregion

    //#region  table columns
    const mobColumns = [
        {
            title: 'Reg No',
            dataIndex: 'registrationNo',
            key: 'registrationNo',
            ...getColumnSearchProps('registrationNo'),
        },
        {
            title: '',
            dataIndex: '',
            render: (e) => <Button type='link' icon={<UserAddOutlined />} onClick={() => onExistingNewAppointmentClick(e)}></Button>,
        }]


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'RegistrationNo',
            dataIndex: 'registrationNo',
            key: 'registrationNo',
            ...getColumnSearchProps('registrationNo'),
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
            ...getColumnSearchProps('fullName'),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            ...getColumnSearchProps('age'),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            ...getColumnSearchProps('gender'),
        },
        {
            title: 'ContactNo',
            dataIndex: 'contactNo',
            key: 'contactNo',
            ...getColumnSearchProps('contactNo'),
        },
        {
            title: 'Created',
            dataIndex: 'created',
            key: 'created',
            ...getColumnSearchProps('created'),
        },
        {
            title: '',
            dataIndex: '',
            width: '50px',
            render: (e) => <Tooltip title={'View Card'}> <Button type='default' icon={<IdcardOutlined />} onClick={() => onPrintCardClick(e)}></Button></Tooltip>,
        },
        {
            title: '',
            dataIndex: '',
            width: '100px',
            render: (e) => <Tooltip title={'New Appointment'}> <Button type='default' icon={<UserAddOutlined />} onClick={() => onExistingNewAppointmentClick(e)}></Button></Tooltip>,
        }
    ];

    const apointmentColumns = [
        {
            title: '',
            dataIndex: 'key',
            key: 'key',
            width: '50px'
        },
        {
            title: 'Appointments',
            dataIndex: 'appointmentDate',
            ...getColumnSearchProps('appointmentDate'),
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.appointmentDate - b.appointmentDate,
        },
        {
            title: '',
            dataIndex: '',
            width: '100px',
            render: (row) => <Tooltip title={'View Invoice'}> <Button type='default' icon={<PrinterOutlined />} onClick={() => onPrintInvoice(row)}></Button></Tooltip>,
        }
    ];
    //#endregion

    return <>
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
        <Spin tip="Loading" spinning={isLoading}>
            {window.innerWidth < 781 ?
                <>
                    <Row>
                        <Col span={24}>
                            {/* <label>
                    Patients Records:
                </label> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <Button type='primary' icon={<UserAddOutlined />} onClick={onAddNewClick}>Add New Patient</Button>
                        </Col>
                    </Row>
                </>

                :
                <Row>
                    <Col span={20}>
                        <label>
                            Patients Records:
                        </label>
                    </Col>
                    <Col span={4}>
                        <Button type='primary' icon={<UserAddOutlined />} onClick={onAddNewClick}>Add New Patient</Button>
                    </Col>
                </Row>
            }

            <Table
                columns={window.innerWidth < 1025 ? mobColumns : columns}
                dataSource={dataset}
                pagination={{ pageSize: 12 }}
                expandable={{
                    expandedRowRender: (record) => {
                        let expandData = [];

                        record.patientAppointments.forEach((row, index) => {
                            expandData.push({ key: index + 1, ...row });
                        });

                        return <Table
                            columns={apointmentColumns}
                            dataSource={expandData}
                            style={{ width: '90%' }}
                            pagination={{ pageSize: 5 }}
                        />
                    },
                }} />
        </Spin>
    </>;
};
export default ViewPatientDetails;
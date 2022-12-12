import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Row, Col, Drawer } from 'antd';
import Highlighter from 'react-highlight-words';
import { PatientDetailService } from '../../../services/patient-detail-service';
import { Preview, print } from 'react-html2pdf';
import InvoiceTemplate from '../common/invoice-template';
import PatientCardTemplate from '../common/patient-card-template';

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
    const history = useHistory();
    //#endregion

    //#region useEffect
    useEffect(() => {
        async function init() {
            const response = await PatientDetailService.getPatientDetail();
            if (response && response.data) {
                let data = [];

                response.data.forEach((row, index) => {
                    data.push({ key: index + 1, ...row });
                });

                setDataset(data);
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
        console.log(row);

        var values = dataset.find(x => x.id === row.patientID);
        console.log(values);
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
        console.log(e);
        localStorage.setItem('ExistingPatientRowSelected', JSON.stringify(e));
        history.push('/invoice/add-patient-details?id=' + e.id);
    }

    const onPrintCardClick = (e) => {
        console.log(e);

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
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '70px'
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
            width: '100px',
            render: (e) => <Button type='link' onClick={() => onPrintCardClick(e)}>Print Card</Button>,
        },
        {
            title: '',
            dataIndex: '',
            width: '100px',
            render: (e) => <Button type='link' onClick={() => onExistingNewAppointmentClick(e)}>New Appointment</Button>,
        }
    ];

    const apointmentColumns = [
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
            render: (row) => <Button type='link' onClick={() => onPrintInvoice(row)}>Print Invoice</Button>,
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
            <Col span={20}>
                <label>
                    Patients Records:
                </label>
            </Col>
            <Col span={4}>
                <Button type='primary' onClick={onAddNewClick}>Add New Patient</Button>
            </Col>
        </Row>
        <Table
            columns={columns}
            dataSource={dataset}
            pagination={{ pageSize: 12 }}
            expandable={{
                expandedRowRender: (record) => {
                    console.log(record.patientAppointments)
                    let expandData = [];

                    record.patientAppointments.forEach((row, index) => {
                        expandData.push({ key: index + 1, ...row });
                    });

                    return <Table
                        columns={apointmentColumns}
                        dataSource={expandData}
                        style={{ width: '70%' }}
                    />
                },
            }} /></>;
};
export default ViewPatientDetails;
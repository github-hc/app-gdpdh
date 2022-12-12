import { ApiUrls } from "./config/api-urls"
import { AxiosProvider } from "./config/axios-provider"

const createPatientDetail = async(patientDetailRequest) => {
    const result =  await AxiosProvider.post(ApiUrls.CREATE_PATIENT_DETAILS, patientDetailRequest);
    return result;
}

const getPatientDetail = async() => {
    const result =  await AxiosProvider.post(ApiUrls.GET_PATIENT_DETAILS);
    return result;
}

export const PatientDetailService={
    createPatientDetail,
    getPatientDetail
}
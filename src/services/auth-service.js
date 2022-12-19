import { ApiUrls } from "./config/api-urls"
import { AxiosProvider } from "./config/axios-provider"

const SignInUser = async(req) => {
    const result =  await AxiosProvider.post(ApiUrls.SIGNIN_USER,{UserName: req.UserName, Password: req.Password});
    return result;
}

export const AuthService={
    SignInUser
}
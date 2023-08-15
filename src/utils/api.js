import axios from 'axios'
import { userBaseUrl, clubBaseUrl ,adminBaseUrl} from '../constants/constants'

export const userApi = axios.create({
    baseURL: userBaseUrl
})

export const clubApi = axios.create({
    baseURL: clubBaseUrl
})

export const adminApi = axios.create({
    baseURL: adminBaseUrl
})

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName)
    if (authToken) {
        req.headers.Authorization = `Bearer ${authToken}`
    }
    return req
}

userApi.interceptors.request.use(async (req) => {
    let AuthentToken = attachToken(req, "userToken")
    return AuthentToken;
})

clubApi.interceptors.request.use(async (req) => {
    let AuthentToken = attachToken(req, "clubToken")
    return AuthentToken;
})

adminApi.interceptors.request.use(async (req) => {
    let AuthentToken = attachToken(req, "adminToken")
    return AuthentToken;
})


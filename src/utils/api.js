import axios from 'axios'
import { userBaseUrl, clubBaseUrl ,adminBaseUrl} from '../constants/constants'

// import { useDispatch } from 'react-redux';
// import { setUserDetails } from '../redux/userDataSlice'
// import { setClubDetails } from '../redux/clubDataSlice'

// import { useNavigate} from 'react-router-dom';




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

// export const removeAuthToken = (isUser) => {
// console.log(isUser);
// //     const userdatas = useSelector((state) => (isUser === 'club' ? state.club : state.user));
// // console.log(userdatas, "koi")
// const dispatch = useDispatch()
// console.log('klklk');
// const navigate = useNavigate()

//     isUser === 'user' ?
//     dispatch(
//       setUserDetails({
//         id: '',
//         email: '',
//         isUser: '',
//         name: '',
//         phoneNumber: '',
//         isGoogle: ''
//       })
//     ) : dispatch(
//       setClubDetails({
//         id: '',
//         email: '',
//         isUser: '',
//         name: '',
//         location: '',
//         clubRegisterNo: '',
//       })
//     )
//   isUser === 'user' ? localStorage.removeItem('userToken') : localStorage.removeItem('clubToken')
//   console.log("lll");
//   navigate('/');
// };
   

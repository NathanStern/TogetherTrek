import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstants"
import axios from 'axios'
export const login = (email, password) => async (dispatch) => {
    console.log("object")
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        console.log("fetching")
        const users = await axios.get('http://localhost:3001/users')
        console.log(users.data.find(e => e.id ===1))

        const data = users.data.find(e=> e.email === email && e.password===password)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        if(!data){
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: "ERROR"
            })
        }else{
            localStorage.setItem('userInfo', JSON.stringify(data))
        }

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        })
    }
}
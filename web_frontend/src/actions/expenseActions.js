import { path } from '../constants/pathConstant'
import axios from 'axios'
import {
    ALLEXPENSES_GET_FAIL,
    ALLEXPENSES_GET_REQUEST,
    ALLEXPENSES_GET_SUCCESS,
  } from '../constants/expenseConstants'
  
export const getAllExpenses = (trip_id) => async (dispatch) => {
    try {
      dispatch({
        type: ALLEXPENSES_GET_REQUEST,
      })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      
      const allExpenses = await axios.get(`${path}/expenses`)
  
      dispatch({
        type: ALLEXPENSES_GET_SUCCESS,
        payload: allExpenses.data,
      })
      localStorage.setItem('allExpensess', JSON.stringify(allExpenses.data))
      console.log("dataaaa" + JSON.stringify(allExpenses.data))
    } catch (error) {
      dispatch({
        type: ALLEXPENSES_GET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      })
    }
  }
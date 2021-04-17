import {
    ALLEXPENSES_GET_FAIL,
    ALLEXPENSES_GET_REQUEST,
    ALLEXPENSES_GET_SUCCESS,
    
  } from '../constants/expenseConstants'
  
  
  export const getAllExpensesReducer = (state = {}, action) => {
    switch (action.type) {
      case ALLEXPENSES_GET_REQUEST:
        return { loading: true }
      case ALLEXPENSES_GET_SUCCESS:
        return { loading: false, allExpenses: action.payload }
      case ALLEXPENSES_GET_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
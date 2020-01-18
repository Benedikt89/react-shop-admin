const NETWORK_PROBLEM = 'error/NETWORK_PROBLEM';
const SERVER_PROBLEM = 'error/SERVER_PROBLEM';
const CLEAR_ERROR = 'error/CLEAR_ERROR';

export interface I_error {
    code: boolean,
    errorMessage: string
}
interface I_errorState {
    error: I_error | null
}

const initialState: I_errorState = {
    error: null
};

type errorHandlerReducerActions = I_networkError | I_serverError | I_clearError

interface I_networkError {
    type: typeof NETWORK_PROBLEM,
    errorMessage: string,
}
interface I_serverError {
    type: typeof SERVER_PROBLEM,
    errorMessage: string
}
interface I_clearError {
    type: typeof CLEAR_ERROR
}

const errorReducer = (state: I_errorState = initialState, action: errorHandlerReducerActions) => {
    switch (action.type) {
        //setting fetching status
        case NETWORK_PROBLEM:
            return {
                ...state,
                error: {
                    code: false,
                    errorMessage: ''
                }
            };
        case SERVER_PROBLEM:
            return {
                ...state,
                error: {
                    code: false,
                    errorMessage: ''
                }
            };
        case CLEAR_ERROR:
            return  {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const networkError = (message: string): I_networkError => ({type: NETWORK_PROBLEM, errorMessage: message});
export const serverError = (message: string): I_serverError => ({type: SERVER_PROBLEM, errorMessage: message});
export const clearError = (): I_clearError => ({type: CLEAR_ERROR});


export default errorReducer;
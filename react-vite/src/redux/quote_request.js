const CREATE_QUOTE_REQUEST = "createQuoteRequest/CREATE_QUOTE_REQUEST"

const GET_ALL_QUOTES_FROM_ALL_CUSTOMERS = "getAllQuotesFromAllCustomers/GET_ALL_QUOTES_FROM_CUSTOMERS"

const createQuote = (request) => ({

    type:CREATE_QUOTE_REQUEST,
    payload:request

})

const getAllQuotes = (request) => ({

    type:GET_ALL_QUOTES_FROM_ALL_CUSTOMERS,
    payload:request

})


export const thunkCreateQuote = (service_id, quote_request) => async (dispatch) =>{
    
    const res = await fetch(`/api/quote_request/${service_id}/new_quote`, {
            method: "POST",
            body: quote_request

        })
    if (res.ok) {
        const data = await res.json();
        // console.log("line  Fetched  qr:", data);
        if (data.errors) {
            return;
        }
        await dispatch(createQuote(data))
    }

}

export const thunkGetAllQuoteRequest = () => async (dispatch) =>{

    const res = await fetch(`/api/quote_request/`)
    if (res.ok) {
        const data = await res.json();
        // console.log("line 206 Fetched  services:", data);
        if (data.errors) {
            return;
        }
        await dispatch(GET_ALL_QUOTES_FROM_ALL_CUSTOMERS(data))
    }

}


function quoteRequestReducer(state = {}, action) {
    switch(action.type){

        case CREATE_QUOTE_REQUEST:{
            const newState = {...state};
            newState[action.payload.id] = action.payload
            return newState

        }

        default:
            return state;
    }

}

export default quoteRequestReducer;
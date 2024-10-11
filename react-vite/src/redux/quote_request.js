const CREATE_QUOTE_REQUEST = "createQuoteRequest/CREATE_QUOTE_REQUEST"

const GET_ALL_QUOTES_FROM_ALL_CUSTOMERS = "getAllQuotesFromAllCustomers/GET_ALL_QUOTES_FROM_CUSTOMERS"

const GET_CLIENT_QUOTES = "getClientQuotes/GET_CLIENT_QUOTES"

const createQuote = (request) => ({

    type:CREATE_QUOTE_REQUEST,
    payload:request

})

const getAllQuotes = (request) => ({

    type:GET_ALL_QUOTES_FROM_ALL_CUSTOMERS,
    payload:request

})

const getClientQuotes = (quotes) => ({

    type:GET_CLIENT_QUOTES,
    payload:quotes
})


export const thunkCreateQuote = (service_id, quote_request) => async (dispatch) => {
    try {
        const res = await fetch(`/api/quote_request/${service_id}/new_quote`, {
            method: "POST",
            body: quote_request,
        });
        
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                console.log("Validation errors:", data.errors);
                return;
            }
            await dispatch(createQuote(data));
            console.log("line34",data)
        } else {
            console.error("Request failed with status:", res.status);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

export const thunkGetClientQuotes = () => async (dispatch) =>{
    try {
        const res = await fetch(`/api/quote_request/my_quotes`)
        if (res.ok) {
            const data = await res.json()
            if(data.errors) {
                console.log(data.errors)
                return;
            }
            await dispatch(getClientQuotes(data))

        }
        
    } catch (error) {
        console.log(error)
    }



}

// export const thunkGetAllQuoteRequest = () => async (dispatch) =>{

//     const res = await fetch(`/api/quote_request/`)
//     if (res.ok) {
//         const data = await res.json();
//         // console.log("line 206 Fetched  services:", data);
//         if (data.errors) {
//             return;
//         }
//         await dispatch(GET_ALL_QUOTES_FROM_ALL_CUSTOMERS(data))
//     }

// }


function quoteRequestReducer(state = {}, action) {
    switch(action.type){

        case CREATE_QUOTE_REQUEST:{
            const newState = {...state};
            newState[action.payload.id] = action.payload
            return newState

        }
        case GET_CLIENT_QUOTES:{
            return{
                ...state,
                clientQuotes: action.payload


            }
        }

        default:
            return state;
    }

}

export default quoteRequestReducer;
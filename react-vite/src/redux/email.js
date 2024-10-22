const SUBMIT_QUOTE = "submitQuote/SUBMIT_QUOTE"

const submitQuote = (quote) => ({
    type:SUBMIT_QUOTE,
    payload:quote
})

export const thunkSubmitQuote = (quote) => async (dispatch) => {
    try {
    
    const res = await fetch(`/api/email/send-quote`, {

    method: "POST",
    body:quote
}) 
    if (res.ok){
        const data = await res.json()
        if (data.eerors){
            console.log("validation", data.erros);
            return
        }
        await dispatch(submitQuote(data))
        // console.log(data)
    } else {
    console.error("Request failed with status:", res.status);
    }
    
    } catch (error) {
        console.error("Fetch error:", error);
    } 

}

function emailQuoteReducer(state = {}, action) {
    switch(action.type){
        case SUBMIT_QUOTE:{
            const newState = {...state};
            newState[action.payload.id] = action.payload
            return newState
        }
        default:
            return state
    }
}

export default emailQuoteReducer
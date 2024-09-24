const GET_ALL_SERVICES = "getAllServices/GET_ALL_SERVICES"

const EDIT_SERVICE = "edit_service/EDIT_SERVICE"

const ADD_SERVICE = "add_service/ADD_SERVICE"


const getAllServices = (service) => ({
    type:GET_ALL_SERVICES,
    payload:service

})

const editService = (service) => ({
    type:EDIT_SERVICE,
    payload:service
})

const addService = (service) => ({
    type:ADD_SERVICE,
    payload:service
})

export const thunkGetAllServices = () => async (dispatch) =>{

    const res = await fetch(`/api/service/all_services`)
    if (res.ok) {
        const data = await res.json();
        // console.log("line 206 Fetched  services:", data);
        if (data.errors) {
            return;
        }
        await dispatch(getAllServices(data.services))
    }

}


function serviceReducer(state = {}, action) {

    switch(action.type){

        case GET_ALL_SERVICES:{
            return {
                ...state,
                allServices: action.payload
            }

        }
        default:
            return state

    }
}

export default serviceReducer
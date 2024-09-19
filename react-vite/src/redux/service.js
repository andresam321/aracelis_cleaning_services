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


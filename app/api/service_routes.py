from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Service
from app.forms import ServiceForm



service_routes = Blueprint("service", __name__)


#render all services
@service_routes.route("/all_services")
def all_services():
    services = Service.query.all()
    return {"services": [service.to_dict() for service in services]},200


#redner service by id
@service_routes.route("/<int:service_id>")
def service_by_id(service_id):
    service = Service.query.get(service_id)
    if not service:
        return {"message":"service  couldnt be found"},404
    return service.to_dict(),200

#create a service
@service_routes.route("/add_service", methods = ['POST'])
def add_service():
    
    form = ServiceForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        new_service = Service(
            name = form.data["name"],
            description = form.data['description'],
            price = form.data['price'],
            estimated_duration = form.data['estimated_duration'],
            service_type = form.data['service_type']
        )
        db.session.add(new_service)
        db.session.commit()
            # print(new_owner)
        return new_service.to_dict(), 201  
    else:
            # print("Form errors:", form.errors)
        return {"errors": form.errors}, 400       
    
#update_service
@service_routes.route("/<int:service_id>", methods=['PUT'])
def update_service(service_id):
    
    service = Service.query.get(service_id)
    if not service:
        return {"message": "service couldnt be found"},404

    form = ServiceForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        service.name = form.data["name"]
        service.description = form.data['description']
        service.price = form.data['price']
        service.estimated_duration = form.data['estimated_duration']
        service.service_type = form.data['service_type']
        
        db.session.commit()
            # print(new_owner)
        return service.to_dict(), 200  
    else:
        print("Form errors:", form.errors)
        return {"errors": form.errors}, 400      
    

#Delete an owner

@service_routes.route("<int:service_id>", methods = ["DELETE"])
def delete_service(service_id):
    individual_service = Service.query.get(service_id)
    

    if not individual_service:
        return {"message": "Service coulndt be found"}, 404
    else:
        db.session.delete(individual_service)
        db.session.commit()
        
    return {"message": "Successfully Deleted Service"}
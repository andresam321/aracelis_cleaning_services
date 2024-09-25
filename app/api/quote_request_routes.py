from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, QuoteRequest
from app.forms import QuoteRequestForm


quote_request_routes = Blueprint("quote_request", __name__)





#every client be able to see their own requests
@quote_request_routes.route("/my_quotes")
def quote_request_by_client():

    quotes = QuoteRequest.query.filter_by(client_id = current_user.id).all()
    
    quote_list = [quote.to_dict() for quote in quotes]
    
    return {"quote_list ==>>", quote_list}
    


#every client able to edit their own request
@quote_request_routes.route("/<int:quote_id>")
def quote_by_id(quote_id):
    quote = QuoteRequest.query.get(quote_id)
    
    if not quote:
        return {"message":"couldnt find quote request"},404
    return quote.to_dict()
    
    


#every client able to delete their own request
@quote_request_routes.route("/<int:quote_id>")
def delete_quote_request(quote_id):
    indiv_quote = QuoteRequest.query.get(quote_id)
    
    if not indiv_quote:
        return {"message": "quote request coulndt be found"}, 404
    else:
        db.session.delete(indiv_quote)
        db.session.commit()
        
    return {"message": "Successfully Deleted Service"}



#every client able to submit multiple quotes 
#from different services
@quote_request_routes.route("/<int:service_id>/new_quote")
def create_new_quote(service_id):
    form = QuoteRequestForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_quote = QuoteRequest(
            client_id=current_user.id,
            service_id=service_id,
            guest_email=form.data('guest_email'),
            first_name=form.data('first_name'),
            last_name=form.data('last_name'),
            phone=form.data('phone'),
            full_address=form.data('full_address'),
            apt_suite=form.data('apt_suite'),
            service_type=form.data('service_type'),
            description=form.data('description'),
            quoted_price=form.data('quoted_price'),
            status='pending',
            request_date = form.data("request_date"),
            bedrooms=form.data('bedrooms'),
            half_baths=form.data('half_baths'),
            full_baths=form.data('full_baths'),
            square_footage=form.data('square_footage'),
            levels=form.data('levels'),
            carpeted_rooms=form.data('carpeted_rooms'),
            number_of_people=form.data('number_of_people'),
            pets=form.data('pets'),
            number_of_pets=form.data('number_of_pets'),
            cleaning_frequency=form.data('cleaning_frequency')
        )

        db.session.add(new_quote)
        db.session.commit()

        return new_quote.to_dict(), 201
    else:
        return {"errors": form.errors}, 400 



#admin able to see all quote request from each specific service



#admin able to edit all quote request from any client 


#admin is able to hit complete on a quote request


#client will be able to see there own completed services


#a client doesnt need to log in to add a quote request
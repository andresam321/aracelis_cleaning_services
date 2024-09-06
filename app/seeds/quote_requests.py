from app.models import db, environment, SCHEMA, QuoteRequest
from sqlalchemy.sql import text
import datetime


def seed_quote_requests():
    quote_requests = [
        {
            "client_id": 1,  
            "guest_email": None,  
            "first_name": "John",
            "last_name": "Doe",
            "phone": "555-1234",
            "full_address": "123 Elm St",
            "apt_suite": "Apt 2B",
            "service_id": 1,  # Assuming Service with ID 1 exists (e.g., Property Cleaning)
            "service_type": "Property Cleaning",
            "description": "Deep cleaning needed for 2-bedroom apartment.",
            "quoted_price": 250.00,
            "status": "pending",
            "request_date": datetime.datetime.utcnow(),
            "bedrooms": 2,
            "half_baths": 0,
            "full_baths": 1,
            "square_footage": 1200,
            "levels": 1,
            "carpeted_rooms": 2,
            "number_of_people": 3,
            "pets": True,
            "number_of_pets": 1,
            "cleaning_frequency": "One-Time"
        },

        {
            "client_id": None,  
            "guest_email": "jane.doe@example.com",
            "first_name": "Jane",
            "last_name": "Doe",
            "phone": "555-5678",
            "full_address": "456 Oak St",
            "apt_suite": None,
            "service_id": 2, 
            "service_type": "Office Cleaning",
            "description": "Weekly office cleaning for a 5,000 sq ft space.",
            "quoted_price": 500.00,
            "status": "reviewed",
            "request_date": datetime.datetime.utcnow(),
            "bedrooms": 0,  # Not applicable for office cleaning
            "half_baths": 2,
            "full_baths": 0,
            "square_footage": 5000,
            "levels": 2,
            "carpeted_rooms": 5,
            "number_of_people": 20,
            "pets": False,
            "number_of_pets": 0,
            "cleaning_frequency": "Weekly"
        },
        {
            "client_id": 2,  
            "guest_email": None,
            "first_name": "Emily",
            "last_name": "Smith",
            "phone": "555-9999",
            "full_address": "789 Pine St",
            "apt_suite": None,
            "service_id": 3,  
            "service_type": "Business Building Cleaning",
            "description": "Cleaning for a 10,000 sq ft business building, 3 floors.",
            "quoted_price": 1000.00,
            "status": "confirmed",
            "request_date": datetime.datetime.utcnow(),
            "bedrooms": 0, 
            "half_baths": 0,
            "full_baths": 4,
            "square_footage": 10000,
            "levels": 3,
            "carpeted_rooms": 10,
            "number_of_people": 50,
            "pets": False,
            "number_of_pets": 0,
            "cleaning_frequency": "One-Time"
        }
    ]

    [db.session.add(QuoteRequest(**quote)) for quote in quote_requests]
    db.session.commit()

def undo_quote_requests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.quote_requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM quote_requests")
    
    db.session.commit()
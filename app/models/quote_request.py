from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class QuoteRequest(db.Model):
    __tablename__ = 'quote_requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True) 
    full_address = db.Column(db.String(50), nullable=False)
    guest_email = db.Column(db.String(255), nullable=True)  
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    apt_suite = db.Column(db.String(15), nullable=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=True)  
    service_type = db.Column(db.String(100), nullable=False)  
    description = db.Column(db.Text, nullable=True)  
    quoted_price = db.Column(db.Float, nullable=True)  
    status = db.Column(db.String(20), default='pending')  
    request_date = db.Column(db.String, default=datetime)

    # Additional fields for cleaning specifications
    bedrooms = db.Column(db.Integer, nullable=True, default=0)
    half_baths = db.Column(db.Integer, nullable=True, default=0)
    full_baths = db.Column(db.Integer, nullable=True, default=0)
    square_footage = db.Column(db.Integer, nullable=True)
    levels = db.Column(db.Integer, nullable=True, default=1)
    carpeted_rooms = db.Column(db.Integer, nullable=True, default=0)
    number_of_people = db.Column(db.Integer, nullable=True, default=0)
    pets = db.Column(db.Boolean, nullable=True, default=False)
    number_of_pets = db.Column(db.Integer, nullable=True, default=0)
    cleaning_frequency = db.Column(db.String(50), nullable=True)  


    # Relationships
    client = db.relationship('User', back_populates='quote_requests')  
    service = db.relationship('Service', back_populates='quote_requests')  

    def to_dict(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "guest_email": self.guest_email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone": self.phone,
            "full_address": self.full_address,
            "apt_suite": self.apt_suite,
            "service_id": self.service_id,
            "service_type": self.service_type,
            "description": self.description,
            "quoted_price": self.quoted_price,
            "status": self.status,
            "request_date": self.request_date,
            "bedrooms": self.bedrooms,
            "half_baths": self.half_baths,
            "full_baths": self.full_baths,
            "square_footage": self.square_footage,
            "levels": self.levels,
            "carpeted_rooms": self.carpeted_rooms,
            "number_of_people": self.number_of_people,
            "pets": self.pets,
            "number_of_pets": self.number_of_pets,
            "cleaning_frequency": self.cleaning_frequency
        }
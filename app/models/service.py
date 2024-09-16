from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash



class Service(db.Model):
    __tablename__ = 'services'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True) 
    name = db.Column(db.String(100), nullable=False)  # E.g., Property Cleaning
    description = db.Column(db.Text, nullable=True)   # Description of the service
    price = db.Column(db.Float, nullable=True)       # Price of the service
    estimated_duration = db.Column(db.String(50), nullable=True)  # Estimated duration of the service
    service_type = db.Column(db.String(50), nullable=True)  # Type of service (e.g., 'Property', 'Office')

    quote_requests = db.relationship('QuoteRequest', back_populates='service', lazy=True) 
    user = db.relationship('User', back_populates='service')

    def to_dict(self):
        return {
        "id":self.id,
        "name":self.name,
        "description":self.description,
        "price":self.price,
        "estimated_duration":self.estimated_duration,
        "service_type":self.service_type
            
        }
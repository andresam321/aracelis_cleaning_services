from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime



class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        

    id = db.Column(db.Integer, primary_key=True)
    # client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  
    # service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False) 
    # booking_date = db.Column(db.DateTime, nullable=False)  
    # status = db.Column(db.String(20), default='pending') 
    # total_cost = db.Column(db.Float, nullable=False)  
    # created_at = db.Column(db.DateTime, default=datetime)
    

    # service = db.relationship("Service", back_populates = "bookings",cascade='all, delete-orphan')
    # client = db.relationship("User", back_populates="bookings",cascade='all, delete-orphan')

    def to_dict(self):
        return {
        "id":self.id,
        # "client_id":self.client_id,
        # "service_id":self.service_id,
        # "booking_date":self.booking_date,
        # "status":self.status,
        # "total_cost":self.total_cost,
        # "created_at":self.created_at        


        }
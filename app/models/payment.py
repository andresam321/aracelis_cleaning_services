import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


class Payment(db.Model):
    __tablename__ = 'payments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=False)  # Links to booking
    amount = db.Column(db.Float, nullable=False)  # Payment amount
    payment_date = db.Column(db.DateTime, nullable=False)  # Date of payment
    payment_method = db.Column(db.String(50), nullable=False)  # Payment method (e.g., 'card', 'cash')
    status = db.Column(db.String(20), default='pending')

    

    def to_dict(self):
        return {
        "id":self.id,
        "booking_id":self.booking_id,
        "amount":self.amount,
        "payment_date":self.payment_date,
        "payment_method":self.payment_method,
        "status":self.status    

        }
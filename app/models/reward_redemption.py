from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class RewardRedemption(db.Model):
    __tablename__ = 'rewards_redemption'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        


    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Links to client
    points_redeemed = db.Column(db.Integer, nullable=False)  # Points redeemed
    redeemed_at = db.Column(db.DateTime, default=datetime)  # Date of redemption
    discount_applied = db.Column(db.Float, nullable=False)


    def to_dict(self):
        return {
        "id":self.id,
        "client_id":self.client_id,
        "points_redeemed":self.points_redeemed,
        "redeemd_at":self.redeemed_at,
        "discount_applied":self.discount_applied


        }
# from app.models import db, environment, SCHEMA, Booking
# from sqlalchemy.sql import text


# def seed_bookings():
#     bookings = [
#         {
#             "client_id": 1,  
#             "service_id": 1, 
#             "booking_date": "2024-09-10 10:00:00",
#             "status": "pending",
#             "total_cost": 120.00
#         },
#         {
#             "client_id": 2,  
#             "service_id": 2,  
#             "booking_date": "2024-09-15 14:00:00",
#             "status": "confirmed",
#             "total_cost": 180.00
#         },
#         {
#             "client_id": 1,  
#             "service_id": 3,  
#             "booking_date": "2024-09-20 09:00:00",
#             "status": "completed",
#             "total_cost": 200.00
#         },
#         {
#             "client_id": 3,  
#             "service_id": 4, 
#             "booking_date": "2024-09-22 13:00:00",
#             "status": "in discussion",
#             "total_cost": 350.00
#         }

#     ]

#     [db.session.add(Booking(**booking)) for booking in bookings]
#     db.session.commit()


# def undo_bookings():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM bookings"))

#     db.session.commit()
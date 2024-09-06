from app.models import db, environment, SCHEMA, Service
from sqlalchemy.sql import text


def seed_services():
    services = [
        {
            "id":1,
            "name": "Apartment Cleaning",
            "description": "Thorough cleaning services for apartments, including kitchens, bathrooms, bedrooms, and living spaces.",
            "price": 120.00,
            "estimated_duration": "2-3 hours",
            "service_type": "Apartment"
        },
        {
            "id":2,
            "name": "Residential Cleaning",
            "description": "Deep cleaning services for residential houses and properties, including all rooms, bathrooms, and exterior spaces.",
            "price": 180.00,
            "estimated_duration": "4-6 hours",
            "service_type": "Residential"
        },
        {
            "id":3,
            "name": "Office Space Cleaning",
            "description": "Cleaning services for office spaces, covering workstations, meeting rooms, common areas, and restrooms.",
            "price": 200.00,
            "estimated_duration": "2-4 hours",
            "service_type": "Office"
        },
        {
            "id":4,
            "name": "Business Building Cleaning",
            "description": "Comprehensive cleaning for large business buildings, including floors, windows, restrooms, and common areas.",
            "price": 350.00,
            "estimated_duration": "4-6 hours",
            "service_type": "Business"
        }

    ]

    [db.session.add(Service(**service)) for service in services]
    db.session.commit()


def undo_services():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM services"))

    db.session.commit()
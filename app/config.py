import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default_secret_key')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT', '5000')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Use a default database URL if DATABASE_URL is not set
    database_url = os.environ.get('DATABASE_URL', 'postgresql://user:password@localhost/dbname')
    SQLALCHEMY_DATABASE_URI = database_url.replace('postgres://', 'postgresql://', 1) if database_url else None
    SQLALCHEMY_ECHO = True

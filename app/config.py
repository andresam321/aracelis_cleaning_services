import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default_secret_key')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT', '5000')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True

    # Only set DATABASE_URI if DATABASE_URL environment variable is present
    database_url = os.environ.get('DATABASE_URL')
    if database_url:
        SQLALCHEMY_DATABASE_URI = database_url.replace('postgres://', 'postgresql://', 1)
    SQLALCHEMY_ECHO = True

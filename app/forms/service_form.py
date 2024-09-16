from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Service



class ServiceForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    price = StringField('price', validators=[DataRequired()])    
    estimated_duration = StringField('Estimated Duration', validators=[DataRequired()])
    service_type = StringField('Service Type', validators=[DataRequired()])
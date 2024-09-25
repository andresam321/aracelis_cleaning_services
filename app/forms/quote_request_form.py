from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, BooleanField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Optional, Length, NumberRange

class QuoteRequestForm(FlaskForm):
        guest_email = StringField('Guest Email', validators=[DataRequired()])
        first_name = StringField('First Name', validators=[DataRequired(), Length(max=50)])
        last_name = StringField('Last Name', validators=[DataRequired(), Length(max=50)])
        phone = StringField('Phone', validators=[DataRequired(), Length(max=15)])
        full_address = StringField('Full Address', validators=[DataRequired(), Length(max=50)])
        apt_suite = StringField('Apt/Suite', validators=[Optional(), Length(max=15)])
        service_id = IntegerField('Service ID', validators=[DataRequired()])
        service_type = StringField('Service Type', validators=[DataRequired(), Length(max=100)])
        description = TextAreaField('Description', validators=[Optional()])
        quoted_price = FloatField('Quoted Price', validators=[Optional()])
        request_date = TextAreaField('Request Date', validators=[DataRequired()])
        status = StringField('Status', validators=[DataRequired(), Length(max=20)], default='pending')

        # Additional cleaning specification fields
        bedrooms = IntegerField('Bedrooms', validators=[Optional(), NumberRange(min=0)], default=0)
        half_baths = IntegerField('Half Baths', validators=[Optional(), NumberRange(min=0)], default=0)
        full_baths = IntegerField('Full Baths', validators=[Optional(), NumberRange(min=0)], default=0)
        square_footage = IntegerField('Square Footage', validators=[Optional()])
        levels = IntegerField('Levels', validators=[Optional(), NumberRange(min=1)], default=1)
        carpeted_rooms = IntegerField('Carpeted Rooms', validators=[Optional(), NumberRange(min=0)], default=0)
        number_of_people = IntegerField('Number of People', validators=[Optional(), NumberRange(min=0)], default=0)
        pets = BooleanField('Pets', validators=[Optional()])
        number_of_pets = IntegerField('Number of Pets', validators=[Optional(), NumberRange(min=0)], default=0)
        cleaning_frequency = SelectField('Cleaning Frequency', 
                                        choices=[('weekly', 'Weekly'), 
                                                ('monthly', 'Monthly'), 
                                                ('one_time', 'One-Time')],
                                        validators=[Optional()])
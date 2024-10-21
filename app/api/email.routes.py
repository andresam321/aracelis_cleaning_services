import smtplib
from flask_login import login_required, current_user
from flask import Blueprint, request, jsonify
from email.mime.multipart import MIMEMultipart
from app.forms import QuoteRequestForm
from app.models import QuoteRequest
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os



email_routes = Blueprint("email", __name__)


@email_routes.route("/send-quote", methods=["POST"])
def send_quote():
    form = QuoteRequestForm()

    if form.validate_on_submit():
        guest_email = form.data['guest_email']
        first_name = form.data['first_name']
        last_name = form.data['last_name']
        phone = form.data['phone']
        full_address = form.data['full_address']
        apt_suite = form.data['apt_suite']
        service_type = form.data['service_type']
        description = form.data['description']
        quoted_price = form.data['quoted_price']
        request_date = form.data['request_date'] 
        bedrooms = form.data['bedrooms']
        half_baths = form.data['half_baths']
        full_baths = form.data['full_baths']
        square_footage = form.data['square_footage']
        levels = form.data['levels']
        carpeted_rooms = form.data['carpeted_rooms']
        number_of_people = form.data['number_of_people']
        pets = form.data['pets']
        number_of_pets = form.data['number_of_pets']
        cleaning_frequency = form.data['cleaning_frequency']

        subject = "New Quote Request"
        body = f"""
        New Quote Request:

        Guest Email: {guest_email}
        First Name: {first_name}
        Last Name: {last_name}
        Phone: {phone}
        Address: {full_address}
        Apt/Suite: {apt_suite}
        Service Type: {service_type}
        Description: {description}
        Quoted Price: {quoted_price}
        Request Date: {request_date}  # <-- Here is where the date is included
        Bedrooms: {bedrooms}
        Half Baths: {half_baths}
        Full Baths: {full_baths}
        Square Footage: {square_footage}
        Levels: {levels}
        Carpeted Rooms: {carpeted_rooms}
        Number of People: {number_of_people}
        Pets: {pets}
        Number of Pets: {number_of_pets}
        Cleaning Frequency: {cleaning_frequency}
        """

        # Call send_email to send the email
        try:
            send_email(subject, body)
            return jsonify({"message": "Quote request sent successfully!"}), 200
        except Exception as e:
            return jsonify({"message": f"Failed to send quote request: {str(e)}"}), 500

    return jsonify({"message": "Invalid form data"}), 400

load_dotenv()


sender_email = os.getenv('EMAIL')
password = os.getenv('EMAIL_PASS')
receiver_email = os.getenv("EMAIL")

def send_email(subject, body):

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = receiver_email

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
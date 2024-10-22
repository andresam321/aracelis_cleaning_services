# Use Python 3.9 with Alpine as the base image
FROM python:3.9.18-alpine3.18

# Install necessary packages
RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

# Set the working directory inside the container
WORKDIR /var/www

# Copy and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Copy the rest of the application code
COPY . .

ENV FLASK_APP=app
ENV FLASK_ENV=production


# Remove database migration commands since no database is needed


# Run the application with Flask's built-in server for debugging
ENTRYPOINT ["gunicorn", "--access-logfile", "-", "-b", "0.0.0.0:80", "app:app"]
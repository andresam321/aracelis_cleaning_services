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

# Set environment variables (modify SECRET_KEY as needed)
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SECRET_KEY="lkasjdf09ajsdkfljalsiorj12n3490re9485309irefvnu90818734902139489230"

# Remove database migration commands since no database is needed


# Run the application with Flask's built-in server for debugging
ENTRYPOINT ["flask", "run", "--host=0.0.0.0", "--port=80"]
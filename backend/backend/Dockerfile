# Use Python base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy code
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose backend port
EXPOSE 5000

# Start backend app
CMD ["python", "main.py"]

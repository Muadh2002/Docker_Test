# Use official PHP image with Apache
FROM php:8.1-apache

# Enable Apache mod_rewrite (useful for routing)
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy all backend files to the container
COPY . /var/www/html/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache server
CMD ["apache2-foreground"]

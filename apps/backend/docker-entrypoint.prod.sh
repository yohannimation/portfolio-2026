#!/bin/sh
set -e

cd /var/www/html

echo ">> Preparing Symfony for production..."

# Clear cache
php bin/console cache:clear --no-debug

# Run database migrations
if [ -d "migrations" ]; then
    echo ">> Running database migrations..."
    php bin/console doctrine:migrations:migrate --no-interaction
fi

echo ">> Fixing permissions..."
mkdir -p /var/www/html/var
chown -R www-data:www-data /var/www/html/var

echo ">> Starting PHP-FPM..."
exec php-fpm

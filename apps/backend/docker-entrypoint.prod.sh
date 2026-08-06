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

echo ">> Syncing built assets to shared volume..."
mkdir -p /var/www/html/public/build
rsync -a --delete /var/www/html/public-src/build/ /var/www/html/public/build/
chown -R www-data:www-data /var/www/html/public/build

echo ">> Fixing permissions..."
mkdir -p /var/www/html/var
chown -R www-data:www-data /var/www/html/var
chown -R www-data:www-data /var/www/html/public/miniature

echo ">> Starting PHP-FPM..."
exec php-fpm
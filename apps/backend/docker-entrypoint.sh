#!/bin/sh
set -e

cd /var/www/html

# Install dependencies if `vendor` is empty
if [ -f composer.json ] && [ ! -d vendor ]; then
    echo ">> Dependencies installation with Composer..."
    composer install --no-interaction --optimize-autoloader
fi

chown -R www-data:www-data /var/www/html/var 2>/dev/null || true

exec php-fpm

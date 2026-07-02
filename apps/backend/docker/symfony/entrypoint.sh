#!/bin/sh
set -e

PWD=/var/www/html

chown -R www-data:www-data .

composer install

# Wait for mysql to start
until php bin/console doctrine:query:sql "SELECT 1" >/dev/null 2>&1; do
  echo "Waiting for database..."
  sleep 2
done

# Start migrations
php bin/console doctrine:migrations:migrate --no-interaction

npm run build

exec symfony server:start --allow-all-ip
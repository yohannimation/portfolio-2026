FROM alpine:3.22.1

RUN apk add --no-cache \
    bash \
    curl \
    coreutils \
    gettext \
    php83-fpm \
    php83-ctype \
    php83-curl \
    php83-dom \
    php83-gd \
    php83-iconv \
    php83-json \
    php83-intl \
    php83-fileinfo \
    php83-mbstring \
    php83-opcache \
    php83-openssl \
    php83-pdo \
    php83-pdo_mysql \
    php83-mysqli \
    php83-xml \
    php83-xsl \
    php83-zlib \
    php83-phar \
    php83-tokenizer \
    php83-session \
    php83-simplexml \
    php83-zip \
    php83-xmlwriter \
    php83-sodium \
    php83-pecl-apcu \
    php83-bcmath \
    php83-pecl-redis \
    make \
    nodejs \
    npm

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

RUN curl -sS https://get.symfony.com/cli/installer | bash && \
    mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

RUN rm -f /etc/php83/php-fpm.d/www.conf
COPY symfony.pool.conf /etc/php83/php-fpm.d/

COPY symfony.ini /etc/php83/conf.d/
COPY symfony.ini /etc/php83/cli/conf.d/

WORKDIR /var/www/html

RUN chown -R 1000:1000 /var/log/php83

CMD ["php-fpm83", "-F"]

EXPOSE 9001

<?php
// Конфигурация для API
// Этот файл содержит настройки для работы API на вашем хостинге

// Базовый URL вашего сайта (измените на свой домен)
define('BASE_URL', 'https://your-domain.com');

// Директория для загрузки изображений
define('UPLOAD_DIR', __DIR__ . '/../img/');

// Максимальный размер загружаемого файла (в байтах)
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5 MB

// Разрешенные типы файлов для загрузки
define('ALLOWED_MIME_TYPES', ['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'webp']);
?>
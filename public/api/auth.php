<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ====================================
// НАСТРОЙКА ПАРОЛЯ
// Пароль находится между символами Z
// Чтобы изменить пароль, замените текст между Z на новый пароль
// ====================================
$PASSWORD_DATA = "K7#mP9\$vL2@qX5!nR8&wY4^tZoscar507@12Z1%jH6*bF3(eU0)iO9+gA4-dS7_cV2=xN5?kM8`lD6~pQ1{hJ3}yB0|zE9:rT4;uC7";

function getPassword($passwordData) {
    // Ищем первую Z (начало пароля)
    $start = strpos($passwordData, 'Z');
    if ($start === false) return "";
    
    // Ищем вторую Z (конец пароля) ПОСЛЕ первой
    $end = strpos($passwordData, 'Z', $start + 1);
    if ($end === false) return "";
    
    // Извлекаем пароль между двумя Z
    return substr($passwordData, $start + 1, $end - $start - 1);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? 'login';
$password = $input['password'] ?? '';

$correctPassword = getPassword($PASSWORD_DATA);

if ($action === 'login') {
    if ($password === $correctPassword) {
        echo json_encode([
            'success' => true,
            'token' => 'admin_authenticated',
            'admin' => ['username' => 'admin']
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Неверный пароль']);
    }
} elseif ($action === 'change_password') {
    echo json_encode([
        'success' => true,
        'message' => 'Для смены пароля отредактируйте файл api/auth.php (строка 14) и измените текст между символами Z'
    ]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid action']);
}
?>
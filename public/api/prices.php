<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Файл для хранения цен
$pricesFile = __DIR__ . '/data/prices.json';

// Создаем директорию если её нет
if (!file_exists(__DIR__ . '/data')) {
    mkdir(__DIR__ . '/data', 0755, true);
}

// Начальные цены
$defaultPrices = [
    'calculator_prices' => [
        ['id' => 1, 'product_type' => 'menu', 'material' => 'eco-leather', 'base_price' => 2500, 'a4_modifier' => 500, 'a5_modifier' => 0],
        ['id' => 2, 'product_type' => 'menu', 'material' => 'natural-leather', 'base_price' => 4500, 'a4_modifier' => 800, 'a5_modifier' => 0],
        ['id' => 3, 'product_type' => 'menu', 'material' => 'baladek', 'base_price' => 1800, 'a4_modifier' => 300, 'a5_modifier' => 0],
        ['id' => 4, 'product_type' => 'folder', 'material' => 'eco-leather', 'base_price' => 3000, 'a4_modifier' => 600, 'a5_modifier' => -200],
        ['id' => 5, 'product_type' => 'folder', 'material' => 'natural-leather', 'base_price' => 5000, 'a4_modifier' => 1000, 'a5_modifier' => -300],
        ['id' => 6, 'product_type' => 'folder', 'material' => 'baladek', 'base_price' => 2200, 'a4_modifier' => 400, 'a5_modifier' => -150],
        ['id' => 7, 'product_type' => 'cover', 'material' => 'eco-leather', 'base_price' => 1500, 'a4_modifier' => 300, 'a5_modifier' => -100],
        ['id' => 8, 'product_type' => 'cover', 'material' => 'natural-leather', 'base_price' => 2800, 'a4_modifier' => 500, 'a5_modifier' => -200],
        ['id' => 9, 'product_type' => 'cover', 'material' => 'baladek', 'base_price' => 1200, 'a4_modifier' => 200, 'a5_modifier' => -80]
    ],
    'branding_prices' => [
        ['id' => 1, 'branding_type' => 'none', 'price' => 0],
        ['id' => 2, 'branding_type' => 'print', 'price' => 300],
        ['id' => 3, 'branding_type' => 'foil', 'price' => 800],
        ['id' => 4, 'branding_type' => 'embossing', 'price' => 600],
        ['id' => 5, 'branding_type' => 'laser', 'price' => 500]
    ],
    'logo_size_prices' => [
        ['id' => 1, 'size_type' => 'small', 'price' => 0],
        ['id' => 2, 'size_type' => 'medium', 'price' => 200],
        ['id' => 3, 'size_type' => 'large', 'price' => 400]
    ]
];

// Создаем файл с начальными ценами если его нет
if (!file_exists($pricesFile)) {
    file_put_contents($pricesFile, json_encode($defaultPrices, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $prices = json_decode(file_get_contents($pricesFile), true);
    echo json_encode($prices);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $type = $input['type'] ?? '';
    
    $prices = json_decode(file_get_contents($pricesFile), true);
    
    if ($type === 'calculator') {
        $productType = $input['product_type'];
        $material = $input['material'];
        
        foreach ($prices['calculator_prices'] as &$item) {
            if ($item['product_type'] === $productType && $item['material'] === $material) {
                $item['base_price'] = $input['base_price'];
                $item['a4_modifier'] = $input['a4_modifier'];
                $item['a5_modifier'] = $input['a5_modifier'];
                break;
            }
        }
    } elseif ($type === 'branding') {
        $brandingType = $input['branding_type'];
        
        foreach ($prices['branding_prices'] as &$item) {
            if ($item['branding_type'] === $brandingType) {
                $item['price'] = $input['price'];
                break;
            }
        }
    } elseif ($type === 'logo') {
        $sizeType = $input['size_type'];
        
        foreach ($prices['logo_size_prices'] as &$item) {
            if ($item['size_type'] === $sizeType) {
                $item['price'] = $input['price'];
                break;
            }
        }
    }
    
    file_put_contents($pricesFile, json_encode($prices, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    echo json_encode(['success' => true]);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
?>
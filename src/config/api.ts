// API Configuration
// Автоматически определяет где запущен сайт и использует правильный API

// Проверяем: запущен на poehali.dev или на своём хостинге
const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
const isPoehali = hostname.includes('poehali.dev') || hostname.includes('localhost');

// Endpoints
export const API_ENDPOINTS = {
  auth: isPoehali 
    ? 'https://functions.poehali.dev/c59fe49a-4cc0-43df-b6b4-3c6b8e55326e'
    : '/api/auth.php',
  prices: isPoehali 
    ? 'https://functions.poehali.dev/ce1d4913-184d-4416-987f-84853ba4a6ee'
    : '/api/prices.php',
};
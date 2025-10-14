// API Configuration
// Измените API_BASE_URL на адрес вашего сайта после загрузки на хостинг

// Для разработки (когда сайт на poehali.dev)
const isDevelopment = window.location.hostname.includes('poehali.dev');

// Базовый URL для API
export const API_BASE_URL = isDevelopment 
  ? 'https://functions.poehali.dev'  // Для разработки
  : '/api';  // Для продакшена на вашем хостинге

// Endpoints
export const API_ENDPOINTS = {
  auth: isDevelopment ? `${API_BASE_URL}/c59fe49a-4cc0-43df-b6b4-3c6b8e55326e` : `${API_BASE_URL}/auth.php`,
  prices: isDevelopment ? `${API_BASE_URL}/ce1d4913-184d-4416-987f-84853ba4a6ee` : `${API_BASE_URL}/prices.php`,
};

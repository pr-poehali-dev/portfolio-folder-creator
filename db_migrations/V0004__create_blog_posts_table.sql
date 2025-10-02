-- Create blog_posts table
CREATE TABLE IF NOT EXISTS t_p51155524_portfolio_folder_cre.blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  image VARCHAR(500),
  read_time VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert existing blog posts
INSERT INTO t_p51155524_portfolio_folder_cre.blog_posts (title, slug, excerpt, content, category, image, read_time) VALUES
('Как выбрать папку для меню ресторана: полное руководство', 'kak-vybrat-papku-dlya-menu', 'Разбираем критерии выбора идеальной папки для меню: материалы, размеры, дизайн и практичность.', '<h2>Материалы папок для меню</h2><p>При выборе папки для меню ресторана важно учитывать материал изготовления...</p>', 'Меню', '/img/8ffb4be5-fdbf-42eb-bc68-0cf711115a50.jpg', '5 мин'),
('Адресные папки для бизнеса: зачем они нужны', 'adresnyje-papki-dlya-biznesa', 'Почему качественные адресные папки — это важная часть корпоративного стиля и деловой репутации.', '<h2>Значение адресных папок</h2><p>Адресные папки играют важную роль в деловом общении...</p>', 'Папки', '/img/05840f5b-bd40-49b3-9963-3eba3115df7d.jpg', '4 мин'),
('Твердый переплет для дипломов: технологии и материалы', 'tverdyj-pereplet-diplomy', 'Обзор современных технологий твердого переплета и материалов для корочек дипломов.', '<h2>Технологии переплета</h2><p>Современные технологии позволяют создавать надежные и красивые переплеты...</p>', 'Корочки', '/img/7f03a9f1-8c9c-41ff-9ea7-4b560c7fa36c.jpg', '6 мин');

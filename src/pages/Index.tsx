import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
  description: string;
  features: string[];
  materials: string[];
  sizes: string[];
}

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const products: Product[] = [
    {
      id: 1,
      title: 'Меню "Пиратский дневник"',
      category: 'menu',
      price: 'от 1 800 ₽',
      image: 'https://cdn.poehali.dev/files/2aa0ba53-f41b-4a2f-bc39-a20747d14638.jpg',
      description: 'Эксклюзивное меню в морской тематике с золотым тиснением черепа и мечей. Темно-зеленая кожа премиум-класса.',
      features: ['Золотое тиснение', 'Натуральная кожа', 'Индивидуальный дизайн', 'Влагостойкое покрытие'],
      materials: ['Натуральная кожа премиум', 'Золотое тиснение', 'Декоративная рамка'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 2,
      title: 'Меню "Парусник"',
      category: 'menu',
      price: 'от 1 700 ₽',
      image: 'https://cdn.poehali.dev/files/654a54c8-3e46-42bb-a05d-3f2fcb803da8.jpg',
      description: 'Элегантное меню с изображением парусника. Золотые орнаменты и рамка создают атмосферу морских путешествий.',
      features: ['Тиснение фольгой', 'Морская тематика', 'Премиум материалы', 'Детализированный дизайн'],
      materials: ['Натуральная кожа', 'Золотое тиснение', 'Декоративные элементы'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 3,
      title: 'Меню "Корабль"',
      category: 'menu',
      price: 'от 1 600 ₽',
      image: 'https://cdn.poehali.dev/files/0a87c9a0-2d65-4120-af0c-acc1a212edd1.jpg',
      description: 'Стильное меню с парусником на волнах. Золотые декоративные уголки и рамка.',
      features: ['Золотая рамка', 'Морской дизайн', 'Натуральная кожа', 'Декоративные уголки'],
      materials: ['Эко-кожа премиум', 'Золотое тиснение', 'Металлические уголки'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 4,
      title: 'Меню "FARGE"',
      category: 'menu',
      price: 'от 1 500 ₽',
      image: 'https://cdn.poehali.dev/files/d8901404-77f4-45ac-9825-c975d8152a35.jpg',
      description: 'Винтажное меню в стиле старинной книги с парусником. Светлое оформление с золотыми акцентами.',
      features: ['Винтажный стиль', 'Авторский дизайн', 'Позолота', 'Уникальное тиснение'],
      materials: ['Кожзам с текстурой', 'Золотое тиснение', 'Состаренная бумага'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 5,
      title: 'Меню "Эйфелева башня"',
      category: 'menu',
      price: 'от 1 600 ₽',
      image: 'https://cdn.poehali.dev/files/1a5f4f2c-a968-49c1-b10d-14434f34a1bc.jpg',
      description: 'Элегантное меню для французского ресторана с изображением Эйфелевой башни.',
      features: ['Французский стиль', 'Золотое тиснение', 'Премиум кожа', 'Декоративная рамка'],
      materials: ['Натуральная кожа', 'Золотое тиснение', 'Декоративные элементы'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 6,
      title: 'Меню "Архитектура"',
      category: 'menu',
      price: 'от 1 700 ₽',
      image: 'https://cdn.poehali.dev/files/8964ce2d-5e1e-4d90-b74d-c8bd0a981649.jpg',
      description: 'Роскошное меню с изображением архитектурного ансамбля в золотом тиснении.',
      features: ['Детальное тиснение', 'Премиум материалы', 'Архитектурный дизайн', 'Золотые элементы'],
      materials: ['Натуральная кожа премиум', 'Золотое тиснение', 'Декоративная рамка'],
      sizes: ['А4 (210×297мм)']
    },
    {
      id: 7,
      title: 'Меню "Грибы"',
      category: 'menu',
      price: 'от 1 400 ₽',
      image: 'https://cdn.poehali.dev/files/994cfb02-b2ff-4a9c-b2d4-d0ac6cd04046.jpg',
      description: 'Оригинальное меню с изображением грибов. Идеально для ресторанов с лесной кухней.',
      features: ['Уникальный дизайн', 'Натуральная тематика', 'Качественное тиснение', 'Коричневая кожа'],
      materials: ['Натуральная кожа', 'Золотое тиснение', 'Прошивка'],
      sizes: ['А5 (148×210мм)', 'А6']
    },
    {
      id: 8,
      title: 'Меню "Восточный дракон"',
      category: 'menu',
      price: 'от 1 800 ₽',
      image: 'https://cdn.poehali.dev/files/a8b1995a-ff21-4120-8eeb-db1910d97ae6.jpg',
      description: 'Эксклюзивное меню в восточном стиле с изображением дракона. Зеленая кожа с золотым тиснением.',
      features: ['Восточный дизайн', 'Дракон в золоте', 'Декоративная рамка', 'Премиум кожа'],
      materials: ['Натуральная кожа премиум', 'Золотое тиснение', 'Декоративные уголки'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 9,
      title: 'Меню "НЕГАСАОГЕ"',
      category: 'menu',
      price: 'от 1 700 ₽',
      image: 'https://cdn.poehali.dev/files/2a69d09f-812c-4e53-a721-97813f5e3781.jpg',
      description: 'Изысканное меню с восточным драконом в золоте. Темно-зеленая премиум кожа.',
      features: ['Авторский дизайн', 'Золотой дракон', 'Натуральная кожа', 'Уникальное тиснение'],
      materials: ['Натуральная кожа', 'Золотое тиснение', 'Металлические элементы'],
      sizes: ['А4 (210×297мм)']
    },
    {
      id: 10,
      title: 'Меню "Королевское"',
      category: 'menu',
      price: 'от 1 800 ₽',
      image: 'https://cdn.poehali.dev/files/88abf1ab-defb-4733-a676-821d074aa2d8.jpg',
      description: 'Роскошное меню с королевским гербом. Темно-зеленая кожа с золотым тиснением.',
      features: ['Королевский стиль', 'Герб в золоте', 'Премиум материалы', 'Декоративная рамка'],
      materials: ['Натуральная кожа премиум', 'Золотое тиснение', 'Декоративные элементы'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 11,
      title: 'Меню "Флоральное"',
      category: 'menu',
      price: 'от 1 500 ₽',
      image: 'https://cdn.poehali.dev/files/4538f55e-ea36-4043-8200-12cee39f756b.jpg',
      description: 'Элегантное меню с золотыми цветочными орнаментами по периметру.',
      features: ['Цветочные мотивы', 'Золотое тиснение', 'Темный фон', 'Премиум дизайн'],
      materials: ['Натуральная кожа', 'Золотое тиснение', 'Декоративная рамка'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 12,
      title: 'Меню "Классика"',
      category: 'menu',
      price: 'от 1 300 ₽',
      image: 'https://cdn.poehali.dev/files/2990bad5-aed1-49e4-ba93-bce7469f338a.jpg',
      description: 'Классическое меню с золотой рамкой. Универсальный дизайн для любого заведения.',
      features: ['Классический дизайн', 'Золотая рамка', 'Качественные материалы', 'Универсальность'],
      materials: ['Натуральная кожа', 'Золотое тиснение', 'Декоративные уголки'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)', 'А6']
    },
    {
      id: 13,
      title: 'Меню "Светлое с рамкой"',
      category: 'menu',
      price: 'от 1 200 ₽',
      image: 'https://cdn.poehali.dev/files/7898d59a-cced-4940-86b5-23e406f38a8a.jpg',
      description: 'Светлое меню в пастельных тонах с элегантной золотой рамкой. Идеально для кафе и ресторанов.',
      features: ['Светлый дизайн', 'Золотая рамка', 'Декоративные уголки', 'Влагостойкость'],
      materials: ['Эко-кожа', 'Золотое тиснение', 'Защитное покрытие'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 14,
      title: 'Адресная папка "Классическая рамка"',
      category: 'folder',
      price: 'от 1 400 ₽',
      image: 'https://cdn.poehali.dev/files/fcb72d82-00a7-4fa4-87c8-f49383415b19.jpg',
      description: 'Элегантная черная папка с золотой рамкой и декоративными уголками.',
      features: ['Золотая рамка', 'Декоративные уголки', 'Премиум кожа', 'Магнитный замок'],
      materials: ['Натуральная кожа', 'Золотое тиснение', 'Металлическая фурнитура'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 15,
      title: 'Меню "Ботаника"',
      category: 'menu',
      price: 'от 1 500 ₽',
      image: 'https://cdn.poehali.dev/files/10c2d4d2-7003-493d-9910-9979fd30c10c.jpg',
      description: 'Меню в эко-стиле с растительным орнаментом. Натуральные материалы и зеленый корешок.',
      features: ['Эко-дизайн', 'Ботанический рисунок', 'Натуральные материалы', 'Текстурная обложка'],
      materials: ['Лен', 'Эко-кожа', 'Натуральные красители'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 16,
      title: 'Папка "Congratulations"',
      category: 'folder',
      price: 'от 1 400 ₽',
      image: 'https://cdn.poehali.dev/files/6a3c6f92-729d-49f9-9142-7ecdc1a9697f.jpg',
      description: 'Представительская папка темно-синего цвета с золотой надписью Congratulations.',
      features: ['Премиум кожа', 'Золотое тиснение', 'Лента-закладка', 'Подарочное оформление'],
      materials: ['Натуральная кожа премиум', 'Золотое тиснение', 'Шелковая лента'],
      sizes: ['А4 (210×297мм)']
    },
    {
      id: 17,
      title: 'Меню "Englame"',
      category: 'menu',
      price: 'от 1 500 ₽',
      image: 'https://cdn.poehali.dev/files/d07bc2c3-545e-436b-843f-dc1322e6077d.jpg',
      description: 'Стильное меню синего цвета с золотой каллиграфией Englame.',
      features: ['Каллиграфия', 'Премиум дизайн', 'Золотое тиснение', 'Синяя кожа'],
      materials: ['Натуральная кожа', 'Золотое тиснение', 'Мягкая обложка'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 18,
      title: 'Папка "Congratulations" темная',
      category: 'folder',
      price: 'от 1 500 ₽',
      image: 'https://cdn.poehali.dev/files/f4308aac-8e9a-48eb-847f-9532034b3fcb.jpg',
      description: 'Темно-синяя папка с золотым тиснением и резинкой-фиксатором.',
      features: ['Резинка-фиксатор', 'Золотая надпись', 'Лента-закладка', 'Премиум материалы'],
      materials: ['Натуральная кожа', 'Золотое тиснение', 'Эластичная резинка'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 19,
      title: 'Адресная папка "Декор-рамка"',
      category: 'folder',
      price: 'от 1 600 ₽',
      image: 'https://cdn.poehali.dev/files/c6cb92dc-d272-425a-949f-fbc99247a2a1.jpg',
      description: 'Темно-зеленая папка с роскошной золотой рамкой и декоративными уголками.',
      features: ['Золотая рамка', 'Объемные уголки', 'Лента-закладка', 'Твердая обложка'],
      materials: ['Натуральная кожа премиум', 'Золотое тиснение', 'Металлические уголки'],
      sizes: ['А4 (210×297мм)']
    },
    {
      id: 20,
      title: 'Меню "Баклажан"',
      category: 'menu',
      price: 'от 1 500 ₽',
      image: 'https://cdn.poehali.dev/files/c9dd445e-d7d2-4522-b5e7-f38c6e366c85.jpg',
      description: 'Оригинальное меню бордового цвета с золотым изображением баклажана.',
      features: ['Уникальный дизайн', 'Овощная тематика', 'Золотое тиснение', 'Твердая обложка'],
      materials: ['Натуральная кожа', 'Золотое тиснение', 'Картон 3мм'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 21,
      title: 'Корочки "Дерево жизни"',
      category: 'cover',
      price: 'от 1 600 ₽',
      image: 'https://cdn.poehali.dev/files/f9767041-83ee-4c80-9858-d28620bcf955.jpg',
      description: 'Яркая оранжевая обложка с черным изображением дерева. Символ жизни и роста.',
      features: ['Яркий цвет', 'Символический дизайн', 'Тиснение', 'Твердый переплет'],
      materials: ['Эко-кожа', 'Черное тиснение', 'Картон 3мм'],
      sizes: ['210×297мм', 'А4']
    },
    {
      id: 22,
      title: 'Корочки "Звезда"',
      category: 'cover',
      price: 'от 1 100 ₽',
      image: 'https://cdn.poehali.dev/files/f31daa92-1fd9-4a44-9c95-2e80cb49bed2.jpg',
      description: 'Минималистичная белая обложка с коричневой звездой. Современный дизайн.',
      features: ['Минимализм', 'Контрастный дизайн', 'Тиснение фольгой', 'Легкая конструкция'],
      materials: ['Эко-кожа', 'Тиснение фольгой', 'Картон 2мм'],
      sizes: ['210×297мм', 'А5']
    },
    {
      id: 23,
      title: 'Корочки "Красные классические"',
      category: 'cover',
      price: 'от 1 200 ₽',
      image: 'https://cdn.poehali.dev/files/ba794c75-9a07-4474-8612-a7288fbb5d41.jpg',
      description: 'Ярко-красные корочки с рамкой тиснения. Для дипломов и сертификатов.',
      features: ['Красная кожа', 'Тиснение рамки', 'Твердая обложка', 'Универсальность'],
      materials: ['Натуральная кожа', 'Тиснение', 'Картон 3мм'],
      sizes: ['210×297мм', 'А4']
    },
    {
      id: 24,
      title: 'Меню "Либрариус"',
      category: 'menu',
      price: 'от 1 300 ₽',
      image: 'https://cdn.poehali.dev/files/38aafc07-ff10-4edd-b51d-3d7e94d9ffee.jpg',
      description: 'Элегантное зеленое меню с золотой надписью и листочком.',
      features: ['Золотая каллиграфия', 'Декоративный элемент', 'Зеленая кожа', 'Компактный размер'],
      materials: ['Натуральная кожа', 'Золотое тиснение'],
      sizes: ['А6', 'А5']
    },
    {
      id: 25,
      title: 'Меню "Индийский слон"',
      category: 'menu',
      price: 'от 1 700 ₽',
      image: 'https://cdn.poehali.dev/files/7a10b93f-70e5-431b-8602-58d0e762a2d8.jpg',
      description: 'Роскошное меню коричневого цвета с серебряным тиснением слона в индийском стиле.',
      features: ['Серебряное тиснение', 'Восточный орнамент', 'Детализированный дизайн', 'Декоративная рамка'],
      materials: ['Натуральная кожа премиум', 'Серебряное тиснение', 'Декоративные уголки'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 26,
      title: 'Меню "Байкер"',
      category: 'menu',
      price: 'от 1 600 ₽',
      image: 'https://cdn.poehali.dev/files/2e6e7055-c11a-4b1b-a596-2a2cef8e4fde.jpg',
      description: 'Брутальное черное меню с тиснением мотоцикла. Для байкерских баров и тематических заведений.',
      features: ['Черная кожа', 'Тиснение мотоцикла', 'Брутальный стиль', 'Текстура кожи'],
      materials: ['Натуральная кожа', 'Блинтовое тиснение', 'Твердая обложка'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 27,
      title: 'Папка "Винтажная рамка"',
      category: 'folder',
      price: 'от 1 800 ₽',
      image: 'https://cdn.poehali.dev/files/d8e47894-46cf-44cd-9994-f8804d981297.jpg',
      description: 'Роскошная папка бордового цвета с золотыми узорами в углах и рамкой.',
      features: ['Золотые узоры', 'Угловой декор', 'Премиум кожа', 'Твердая конструкция'],
      materials: ['Натуральная кожа премиум', 'Золотое тиснение', 'Картон 3мм'],
      sizes: ['А4 (210×297мм)']
    },
    {
      id: 28,
      title: 'Меню "Restaurant Briess"',
      category: 'menu',
      price: 'от 1 500 ₽',
      image: 'https://cdn.poehali.dev/files/46339c57-487a-4cb1-8ad1-bab82a336226.jpg',
      description: 'Стильное серое меню с черным тиснением логотипа ресторана и мотоцикла.',
      features: ['Корпоративный стиль', 'Тиснение логотипа', 'Карман внутри', 'Минимализм'],
      materials: ['Эко-кожа', 'Блинтовое тиснение', 'Внутренний карман'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    }
  ];

  const categories = [
    { id: 'all', name: 'Все работы', icon: 'Grid3x3' },
    { id: 'menu', name: 'Меню', icon: 'BookOpen' },
    { id: 'folder', name: 'Папки', icon: 'FolderOpen' },
    { id: 'cover', name: 'Корочки', icon: 'Book' }
  ];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">papka.moscow</h1>
                <p className="text-xs text-gray-500">Портфолио работ</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/calculator">
                <Button variant="ghost">
                  <Icon name="Calculator" size={16} className="mr-2" />
                  Калькулятор
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="ghost">
                  <Icon name="Newspaper" size={16} className="mr-2" />
                  Блог
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90" asChild>
                <a href="tel:+79032469318">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Заказать
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
            Портфолио • 2024
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
            Полиграфия премиум-класса
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Папки для меню ресторанов с индивидуальным дизайном. 
            Натуральная кожа, золотое тиснение, уникальные обложки.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={filter === cat.id ? 'default' : 'outline'}
                onClick={() => setFilter(cat.id)}
                className={filter === cat.id ? 'bg-gradient-to-r from-amber-500 to-orange-600' : ''}
              >
                <Icon name={cat.icon as any} size={16} className="mr-2" />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <Card 
                key={product.id} 
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-amber-200 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200">
                  <img 
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Eye" size={16} />
                        <span className="text-sm font-medium">Посмотреть детали</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-white/95 text-amber-700 hover:bg-white/95">
                    {product.price}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-tight">{product.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Преимущества работы с нами</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={32} className="text-white" />
              </div>
              <h3 className="font-semibold mb-2">15 лет опыта</h3>
              <p className="text-gray-600 text-sm">Профессиональное производство полиграфии</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Palette" size={32} className="text-white" />
              </div>
              <h3 className="font-semibold mb-2">Индивидуальный дизайн</h3>
              <p className="text-gray-600 text-sm">Создаем уникальные решения под ваш бренд</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-white" />
              </div>
              <h3 className="font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-600 text-sm">Только премиум материалы и технологии</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Готовы обсудить ваш проект?</h2>
          <p className="text-gray-600 mb-8">
            Свяжитесь с нами для расчета стоимости и обсуждения деталей заказа
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90" asChild>
              <a href="tel:+79032469318">
                <Icon name="Phone" size={20} className="mr-2" />
                +7 903 246-93-18
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:info@papka.moscow">
                <Icon name="Mail" size={20} className="mr-2" />
                info@papka.moscow
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                papka.moscow
              </h3>
              <p className="text-gray-400 text-sm">
                Производство полиграфической продукции премиум-класса с 2009 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="tel:+79032469318" className="flex items-center gap-2 justify-center md:justify-start hover:text-amber-400 transition-colors">
                  <Icon name="Phone" size={16} />
                  +7 903 246-93-18
                </a>
                <a href="mailto:info@papka.moscow" className="flex items-center gap-2 justify-center md:justify-start hover:text-amber-400 transition-colors">
                  <Icon name="Mail" size={16} />
                  info@papka.moscow
                </a>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Icon name="MapPin" size={16} />
                  1-ая Фрезерная 2/1 стр 1
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Режим работы</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Пн-Пт: 9:00 - 18:00</p>
                <p>Сб: 10:00 - 15:00</p>
                <p>Вс: выходной</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 papka.moscow. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProduct.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedProduct.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-amber-100 text-amber-800 text-base px-4 py-1">
                        {selectedProduct.price}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Star" size={18} className="text-amber-600" />
                      Особенности
                    </h3>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Package" size={18} className="text-amber-600" />
                      Материалы
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.materials.map((material, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Ruler" size={18} className="text-amber-600" />
                      Размеры
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90" size="lg" asChild>
                    <a href="tel:+79032469318">
                      <Icon name="Phone" size={20} className="mr-2" />
                      Заказать консультацию
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
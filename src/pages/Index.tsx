import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      title: 'Меню для ресторана "Премиум"',
      category: 'menu',
      price: 'от 2 500 ₽',
      image: '/img/41d81912-9f74-494e-bfb1-6a2414456757.jpg',
      description: 'Элегантные папки для меню ресторанов премиум-класса. Натуральная кожа, индивидуальное тиснение логотипа.',
      features: ['Тиснение фольгой', 'Натуральная кожа', 'Индивидуальный дизайн', 'Влагостойкое покрытие'],
      materials: ['Натуральная кожа', 'Бархатная подкладка', 'Металлические уголки'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)', 'Нестандартные размеры']
    },
    {
      id: 2,
      title: 'Меню для кафе "Классик"',
      category: 'menu',
      price: 'от 1 800 ₽',
      image: '/img/41d81912-9f74-494e-bfb1-6a2414456757.jpg',
      description: 'Практичные и стильные папки для меню. Искусственная кожа высокого качества.',
      features: ['Печать логотипа', 'Износостойкая поверхность', 'Быстрое изготовление'],
      materials: ['Искусственная кожа', 'Плотный картон'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 3,
      title: 'Адресная папка "Корпоративная"',
      category: 'folder',
      price: 'от 2 100 ₽',
      image: '/img/46eee740-9ed6-4a7f-b704-e3da630c96f6.jpg',
      description: 'Представительские папки для документов. Идеальны для деловых встреч и презентаций.',
      features: ['Логотип компании', 'Карман для визиток', 'Подкладка из бархата', 'Магнитный замок'],
      materials: ['Натуральная кожа', 'Металлическая фурнитура', 'Бархатная подкладка'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 4,
      title: 'Папка для документов "Офисная"',
      category: 'folder',
      price: 'от 1 500 ₽',
      image: '/img/46eee740-9ed6-4a7f-b704-e3da630c96f6.jpg',
      description: 'Практичные папки для повседневного использования в офисе.',
      features: ['Прочная конструкция', 'Несколько отделений', 'Брендирование'],
      materials: ['Эко-кожа', 'Усиленный картон'],
      sizes: ['А4 (210×297мм)']
    },
    {
      id: 5,
      title: 'Корочки для диплома "Люкс"',
      category: 'cover',
      price: 'от 3 200 ₽',
      image: '/img/2f49c79c-980d-4b69-b48d-e31510186673.jpg',
      description: 'Твердый переплет премиум-класса для дипломов и сертификатов.',
      features: ['Тиснение золотом', 'Твердая обложка', 'Шелковая лента-закладка', 'Гравировка'],
      materials: ['Натуральная кожа', 'Картон 3мм', 'Шелковая лента'],
      sizes: ['210×297мм', 'Нестандартные размеры']
    },
    {
      id: 6,
      title: 'Корочки универсальные',
      category: 'cover',
      price: 'от 2 400 ₽',
      image: '/img/2f49c79c-980d-4b69-b48d-e31510186673.jpg',
      description: 'Твердый переплет для документов, сертификатов, благодарностей.',
      features: ['Различные цвета', 'Тиснение', 'Прочная конструкция'],
      materials: ['Баладек', 'Картон 2мм'],
      sizes: ['210×297мм', 'А4', 'А5']
    },
    {
      id: 7,
      title: 'Меню для бара "Минимал"',
      category: 'menu',
      price: 'от 1 600 ₽',
      image: '/img/41d81912-9f74-494e-bfb1-6a2414456757.jpg',
      description: 'Стильные папки в минималистичном дизайне. Подходят для баров и кафе.',
      features: ['Современный дизайн', 'Легкая очистка', 'Влагостойкость'],
      materials: ['Искусственная кожа', 'Пластиковые вставки'],
      sizes: ['А4 (210×297мм)', 'А5 (148×210мм)']
    },
    {
      id: 8,
      title: 'Адресная папка "VIP"',
      category: 'folder',
      price: 'от 4 500 ₽',
      image: '/img/46eee740-9ed6-4a7f-b704-e3da630c96f6.jpg',
      description: 'Эксклюзивные папки для особых клиентов. Ручная работа.',
      features: ['Ручная прошивка', 'Позолоченная фурнитура', 'Именная гравировка', 'Подарочная упаковка'],
      materials: ['Итальянская кожа', 'Латунная фурнитура', 'Шелк'],
      sizes: ['А4 (210×297мм)', 'Индивидуальные размеры']
    }
  ];

  const categories = [
    { id: 'all', name: 'Все работы', icon: 'Grid3x3' },
    { id: 'menu', name: 'Меню', icon: 'BookOpen' },
    { id: 'folder', name: 'Адресные папки', icon: 'FolderOpen' },
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
              <Link to="/blog">
                <Button variant="ghost">
                  <Icon name="Newspaper" size={16} className="mr-2" />
                  Блог
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90">
                <Icon name="Phone" size={16} className="mr-2" />
                Заказать
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
            Папки для меню, адресные папки и корочки с твердым переплетом. 
            Индивидуальный дизайн, качественные материалы, внимание к деталям.
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
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {categories.find(c => c.id === product.category)?.name}
                    </Badge>
                  </div>
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
                      <Badge variant="outline">
                        {categories.find(c => c.id === selectedProduct.category)?.name}
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

                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90" size="lg">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Заказать консультацию
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
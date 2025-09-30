import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      slug: 'kak-vybrat-papku-dlya-menu',
      title: 'Как выбрать папку для меню ресторана: полное руководство',
      excerpt: 'Разбираем критерии выбора идеальной папки для меню: материалы, размеры, дизайн и практичность.',
      category: 'Меню',
      date: '15 сентября 2024',
      readTime: '5 мин',
      image: '/img/8ffb4be5-fdbf-42eb-bc68-0cf711115a50.jpg'
    },
    {
      id: '2',
      slug: 'adresnyje-papki-dlya-biznesa',
      title: 'Адресные папки для бизнеса: зачем они нужны',
      excerpt: 'Почему качественные адресные папки — это важная часть корпоративного стиля и деловой репутации.',
      category: 'Папки',
      date: '10 сентября 2024',
      readTime: '4 мин',
      image: '/img/05840f5b-bd40-49b3-9963-3eba3115df7d.jpg'
    },
    {
      id: '3',
      slug: 'tverdyj-pereplet-diplomy',
      title: 'Твердый переплет для дипломов: технологии и материалы',
      excerpt: 'Обзор современных технологий твердого переплета и материалов для корочек дипломов.',
      category: 'Корочки',
      date: '5 сентября 2024',
      readTime: '6 мин',
      image: '/img/217ec340-5e5a-4e3b-a6dc-31b3c06039fe.jpg'
    },
    {
      id: '4',
      slug: 'dizajn-menu-restorana',
      title: 'Дизайн меню ресторана: тренды 2024 года',
      excerpt: 'Актуальные тренды в дизайне ресторанных меню: минимализм, эко-материалы и персонализация.',
      category: 'Меню',
      date: '1 сентября 2024',
      readTime: '7 мин',
      image: '/img/8ffb4be5-fdbf-42eb-bc68-0cf711115a50.jpg'
    },
    {
      id: '5',
      slug: 'korporativnye-podarki',
      title: 'Корпоративные подарки: идеи с адресными папками',
      excerpt: 'Как использовать премиальные адресные папки в качестве статусных корпоративных подарков.',
      category: 'Папки',
      date: '28 августа 2024',
      readTime: '5 мин',
      image: '/img/05840f5b-bd40-49b3-9963-3eba3115df7d.jpg'
    },
    {
      id: '6',
      slug: 'brending-polligrafii',
      title: 'Брендирование полиграфии: от логотипа до тиснения',
      excerpt: 'Способы нанесения логотипа на полиграфическую продукцию: печать, тиснение фольгой, гравировка.',
      category: 'Производство',
      date: '25 августа 2024',
      readTime: '8 мин',
      image: '/img/8ffb4be5-fdbf-42eb-bc68-0cf711115a50.jpg'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все статьи' },
    { id: 'Меню', name: 'Меню' },
    { id: 'Папки', name: 'Папки' },
    { id: 'Корочки', name: 'Корочки' },
    { id: 'Производство', name: 'Производство' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">papka.moscow</h1>
                <p className="text-xs text-gray-500">Блог о полиграфии</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost">
                  <Icon name="Home" size={16} className="mr-2" />
                  Главная
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
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
              <Icon name="Newspaper" size={14} className="mr-1" />
              Блог
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Статьи о полиграфии
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Полезные материалы о выборе, производстве и использовании полиграфической продукции
            </p>
          </div>

          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  size="sm"
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={selectedCategory === cat.id ? 'bg-gradient-to-r from-amber-500 to-orange-600' : ''}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card 
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-amber-200 overflow-hidden h-full"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge className="absolute top-4 right-4 bg-white/95 text-amber-700 hover:bg-white/95">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-amber-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-amber-600 font-medium text-sm group-hover:gap-2 transition-all">
                      Читать статью
                      <Icon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <Icon name="FileQuestion" size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Статьи не найдены</h3>
              <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Есть вопросы по производству?</h2>
          <p className="text-gray-600 mb-8">
            Свяжитесь с нами для консультации и расчета стоимости заказа
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
    </div>
  );
};

export default Blog;
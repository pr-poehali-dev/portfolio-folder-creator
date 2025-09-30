import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
  tags: string[];
}

const BlogPost = () => {
  const { slug } = useParams();

  const blogPosts: BlogPostData[] = [
    {
      slug: 'kak-vybrat-papku-dlya-menu',
      title: 'Как выбрать папку для меню ресторана: полное руководство',
      excerpt: 'Разбираем критерии выбора идеальной папки для меню: материалы, размеры, дизайн и практичность.',
      category: 'Меню',
      date: '15 сентября 2024',
      readTime: '5 мин',
      image: '/img/41d81912-9f74-494e-bfb1-6a2414456757.jpg',
      tags: ['меню', 'рестораны', 'папки', 'выбор'],
      content: [
        'Выбор папки для меню ресторана — это не просто покупка обложки. Это инвестиция в впечатление гостей и имидж заведения. Качественная папка для меню создает правильное первое впечатление и подчеркивает уровень ресторана.',
        'При выборе папки необходимо учитывать несколько ключевых критериев: материал, размер, дизайн, практичность и долговечность. Давайте разберем каждый из них подробнее.',
        'Материалы для папок меню бывают разные: натуральная кожа, искусственная кожа, баладек, дерево, пластик. Для премиум-ресторанов рекомендуется натуральная кожа — она выглядит солидно и служит годами. Для демократичных заведений подойдет качественная искусственная кожа.',
        'Размер папки должен соответствовать формату меню. Стандартные размеры — А4 и А5. Важно, чтобы страницы меню не выступали за края папки и легко переворачивались.',
        'Дизайн папки должен соответствовать концепции ресторана. Для классических заведений подойдут строгие темные цвета, для современных — яркие акценты и необычные формы.',
        'Практичность включает легкость очистки (важно для ресторанов), наличие карманов для вкладышей, удобство для гостей. Влагостойкое покрытие — обязательное требование для меню.',
        'Не забывайте о брендировании: логотип на папке — это дополнительное напоминание о вашем заведении. Тиснение фольгой или гравировка выглядят особенно премиально.'
      ]
    },
    {
      slug: 'adresnyje-papki-dlya-biznesa',
      title: 'Адресные папки для бизнеса: зачем они нужны',
      excerpt: 'Почему качественные адресные папки — это важная часть корпоративного стиля и деловой репутации.',
      category: 'Папки',
      date: '10 сентября 2024',
      readTime: '4 мин',
      image: '/img/46eee740-9ed6-4a7f-b704-e3da630c96f6.jpg',
      tags: ['адресные папки', 'бизнес', 'корпоративный стиль'],
      content: [
        'Адресные папки — это не просто аксессуар для документов. Это полноценный инструмент деловой коммуникации, который говорит о статусе компании и отношении к партнерам.',
        'В эпоху цифровизации, когда большинство документов в электронном виде, качественная адресная папка выделяет вас среди конкурентов. Она показывает, что вы уделяете внимание деталям.',
        'Адресные папки используются для презентации документов на переговорах, в качестве корпоративных подарков партнерам и клиентам, для официальных церемоний и мероприятий.',
        'Качественная адресная папка с логотипом компании работает как инструмент брендинга. Каждый раз, когда получатель использует папку, он видит ваш логотип.',
        'При выборе адресной папки важны: качество материалов (натуральная кожа предпочтительнее), аккуратность исполнения логотипа, наличие кармана для визиток.',
        'Стоимость адресной папки окупается впечатлением, которое она производит. Это инвестиция в имидж компании и отношения с партнерами.'
      ]
    },
    {
      slug: 'tverdyj-pereplet-diplomy',
      title: 'Твердый переплет для дипломов: технологии и материалы',
      excerpt: 'Обзор современных технологий твердого переплета и материалов для корочек дипломов.',
      category: 'Корочки',
      date: '5 сентября 2024',
      readTime: '6 мин',
      image: '/img/2f49c79c-980d-4b69-b48d-e31510186673.jpg',
      tags: ['дипломы', 'переплет', 'корочки', 'технологии'],
      content: [
        'Твердый переплет для дипломов и сертификатов — это классика, проверенная временем. Качественные корочки защищают документ и придают ему солидный вид.',
        'Технология твердого переплета включает несколько этапов: подготовку картонных сторонок (обычно толщиной 2-3 мм), обтяжку материалом, тиснение или печать, сборку конструкции.',
        'Материалы для корочек различаются по качеству и цене. Натуральная кожа — самый премиальный вариант, долговечный и престижный. Баладек — практичный материал средней ценовой категории.',
        'Искусственная кожа современных производителей также может выглядеть очень достойно. Главное — выбирать качественные материалы с равномерной текстурой.',
        'Тиснение — важная часть оформления корочек. Золотое и серебряное тиснение фольгой выглядят классически. Для современного дизайна используют слепое тиснение или печать.',
        'Картон для сторонок должен быть плотным (не менее 2 мм), иначе корочки будут деформироваться. Качественные корочки сохраняют форму десятилетиями.',
        'При заказе корочек обращайте внимание на качество швов, ровность углов, плотность прилегания материала к картону. Детали имеют значение.'
      ]
    },
    {
      slug: 'dizajn-menu-restorana',
      title: 'Дизайн меню ресторана: тренды 2024 года',
      excerpt: 'Актуальные тренды в дизайне ресторанных меню: минимализм, эко-материалы и персонализация.',
      category: 'Меню',
      date: '1 сентября 2024',
      readTime: '7 мин',
      image: '/img/41d81912-9f74-494e-bfb1-6a2414456757.jpg',
      tags: ['дизайн', 'меню', 'тренды', '2024'],
      content: [
        'Дизайн меню ресторана — это искусство, которое постоянно эволюционирует. В 2024 году наблюдается несколько явных трендов, меняющих подход к оформлению меню.',
        'Минимализм остается актуальным. Чистые линии, много воздуха на странице, простые шрифты без засечек. Гости ценят, когда информацию легко найти и прочитать.',
        'Эко-материалы набирают популярность. Переработанная бумага, натуральная кожа с экологичной выделкой, деревянные элементы. Это соответствует тренду на осознанное потребление.',
        'Персонализация меню — важный тренд. Рестораны создают уникальные папки, которые невозможно спутать с конкурентами. Авторские иллюстрации, необычные форматы, креативные решения.',
        'Интерактивные элементы также в тренде: QR-коды для доступа к дополнительной информации о блюдах, истории ресторана, возможности заказа онлайн.',
        'Цветовые решения становятся смелее. Вместо традиционных темных тонов все чаще встречаются яркие акценты, пастельные оттенки, неожиданные сочетания.',
        'Тактильные ощущения важны: фактурные обложки, приятная на ощупь кожа, качественная бумага для вкладышей. Меню должно быть приятно держать в руках.'
      ]
    },
    {
      slug: 'korporativnye-podarki',
      title: 'Корпоративные подарки: идеи с адресными папками',
      excerpt: 'Как использовать премиальные адресные папки в качестве статусных корпоративных подарков.',
      category: 'Папки',
      date: '28 августа 2024',
      readTime: '5 мин',
      image: '/img/46eee740-9ed6-4a7f-b704-e3da630c96f6.jpg',
      tags: ['подарки', 'корпоративные', 'адресные папки'],
      content: [
        'Выбор корпоративного подарка — всегда непростая задача. Подарок должен быть статусным, практичным и напоминать о дарителе. Адресная папка соответствует всем этим критериям.',
        'Премиальная адресная папка из натуральной кожи с гравировкой или тиснением логотипа — это подарок, который оценят. Особенно если получатель часто участвует в переговорах и презентациях.',
        'Персонализация делает подарок особенным. Можно нанести не только логотип компании, но и имя получателя, поздравление, памятную дату.',
        'Адресные папки подходят для подарков партнерам, ключевым клиентам, топ-менеджерам. Для массовых подарков сотрудникам можно выбрать более бюджетный вариант.',
        'Комплектация папки также важна: можно добавить фирменный блокнот, ручку, набор визиток. Получится полноценный деловой набор.',
        'Упаковка имеет значение: подарочная коробка или мешочек из ткани добавят презентабельности. Первое впечатление от подарка начинается с упаковки.'
      ]
    },
    {
      slug: 'brending-polligrafii',
      title: 'Брендирование полиграфии: от логотипа до тиснения',
      excerpt: 'Способы нанесения логотипа на полиграфическую продукцию: печать, тиснение фольгой, гравировка.',
      category: 'Производство',
      date: '25 августа 2024',
      readTime: '8 мин',
      image: '/img/41d81912-9f74-494e-bfb1-6a2414456757.jpg',
      tags: ['брендирование', 'логотип', 'тиснение', 'производство'],
      content: [
        'Брендирование полиграфической продукции — важный этап создания папок, меню и корочек. Правильно нанесенный логотип делает продукт узнаваемым и подчеркивает статус бренда.',
        'Существует несколько способов нанесения логотипа: тиснение фольгой, слепое тиснение, шелкография, цифровая печать, гравировка. Каждый метод имеет свои особенности.',
        'Тиснение фольгой — классический и престижный способ. Золотая и серебряная фольга выглядят дорого и солидно. Фольга бывает разных оттенков: от матовой до глянцевой.',
        'Слепое тиснение создает выдавленный рельеф без цвета. Этот метод подходит для минималистичного дизайна и смотрится очень элегантно на качественной коже.',
        'Шелкография позволяет печатать многоцветные логотипы. Этот способ хорош для ярких дизайнов, но требует качественной подготовки макета.',
        'Цифровая печать — современный метод, позволяющий создавать сложные изображения и фотографии. Качество печати зависит от материала поверхности.',
        'Гравировка лазером — технология для долговечного нанесения. Изображение не стирается со временем. Подходит для кожи и дерева.',
        'При выборе способа брендирования учитывайте материал основы, сложность логотипа, тираж и бюджет. Для небольших тиражей подойдет цифровая печать, для больших — тиснение.'
      ]
    }
  ];

  const currentPost = blogPosts.find(post => post.slug === slug);
  const relatedPosts = blogPosts
    .filter(post => post.slug !== slug && post.category === currentPost?.category)
    .slice(0, 3);

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileQuestion" size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Статья не найдена</h2>
          <Link to="/blog">
            <Button>Вернуться к блогу</Button>
          </Link>
        </div>
      </div>
    );
  }

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
                <p className="text-xs text-gray-500">Блог</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/blog">
                <Button variant="ghost">
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  К статьям
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

      <article className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Link to="/blog">
              <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer">
                <Icon name="ArrowLeft" size={12} className="mr-1" />
                {currentPost.category}
              </Badge>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {currentPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <span className="flex items-center gap-2">
                <Icon name="Calendar" size={18} />
                {currentPost.date}
              </span>
              <span className="flex items-center gap-2">
                <Icon name="Clock" size={18} />
                {currentPost.readTime}
              </span>
            </div>
          </div>

          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full aspect-video object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            {currentPost.content.map((paragraph, idx) => (
              <p key={idx} className="mb-6 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">Теги</h3>
            <div className="flex flex-wrap gap-2">
              {currentPost.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="pb-20 px-4 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Похожие статьи</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`}>
                  <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-amber-200 h-full">
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Icon name="Clock" size={14} />
                        {post.readTime}
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-amber-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Остались вопросы?</h2>
          <p className="text-gray-600 mb-8">
            Свяжитесь с нами для консультации по вашему заказу
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
    </div>
  );
};

export default BlogPost;
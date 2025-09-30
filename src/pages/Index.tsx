import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [calculatorData, setCalculatorData] = useState({
    productType: '',
    quantity: 100,
    material: '',
    binding: ''
  });

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculatePrice = () => {
    const basePrice = calculatorData.quantity * 5;
    const materialMultiplier = calculatorData.material === 'premium' ? 1.5 : 1;
    const bindingCost = calculatorData.binding === 'hardcover' ? 200 : 50;
    return Math.round(basePrice * materialMultiplier + bindingCost);
  };

  const products = [
    { id: 1, name: 'Меню для ресторана', price: '2 500', image: 'https://v3.fal.media/files/lion/DI3nb1c-V704AGNnpu6c8_output.png' },
    { id: 2, name: 'Адресные папки', price: '1 800', image: 'https://v3.fal.media/files/lion/DI3nb1c-V704AGNnpu6c8_output.png' },
    { id: 3, name: 'Корочки твердый переплет', price: '3 200', image: 'https://v3.fal.media/files/lion/DI3nb1c-V704AGNnpu6c8_output.png' },
    { id: 4, name: 'Папки с логотипом', price: '2 100', image: 'https://v3.fal.media/files/lion/DI3nb1c-V704AGNnpu6c8_output.png' }
  ];

  const services = [
    { icon: 'FileText', title: 'Дизайн и верстка', desc: 'Профессиональная разработка макетов' },
    { icon: 'Printer', title: 'Цифровая печать', desc: 'Высокое качество и быстрые сроки' },
    { icon: 'BookOpen', title: 'Переплет', desc: 'Мягкий и твердый переплет любой сложности' },
    { icon: 'Package', title: 'Упаковка', desc: 'Индивидуальная упаковка продукции' }
  ];

  const portfolio = [
    { id: 1, title: 'Меню для ресторана "Вкус"', category: 'Меню' },
    { id: 2, title: 'Корпоративные папки для банка', category: 'Папки' },
    { id: 3, title: 'Дипломы учебного центра', category: 'Корочки' },
    { id: 4, title: 'Презентационные материалы', category: 'Папки' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ПринтМастер
            </div>
            <div className="hidden md:flex items-center gap-6">
              {['Главная', 'Каталог', 'О нас', 'Услуги', 'Портфолио', 'Доставка', 'Контакты'].map((item, idx) => {
                const sectionId = ['home', 'catalog', 'about', 'services', 'portfolio', 'delivery', 'contacts'][idx];
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(sectionId)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      activeSection === sectionId ? 'text-primary' : 'text-gray-600'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Icon name="Phone" size={16} className="mr-2" />
              Связаться
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Полиграфия <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">премиум качества</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Производим папки для меню, адресные папки и корочки с твердым переплетом. Индивидуальный подход к каждому заказу.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90" onClick={() => scrollToSection('calculator')}>
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('catalog')}>
                  Каталог товаров
                </Button>
              </div>
            </div>
            <div className="animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
                <img 
                  src="https://v3.fal.media/files/lion/DI3nb1c-V704AGNnpu6c8_output.png" 
                  alt="Полиграфическая продукция"
                  className="relative rounded-3xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-white text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Выполненных заказов</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold mb-2">15 лет</div>
              <div className="text-sm opacity-90">На рынке</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Поддержка клиентов</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Гарантия качества</div>
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-4">Калькулятор стоимости</h2>
          <p className="text-center text-gray-600 mb-12">Рассчитайте стоимость вашего заказа онлайн</p>
          
          <Card className="shadow-xl border-2">
            <CardHeader>
              <CardTitle>Параметры заказа</CardTitle>
              <CardDescription>Выберите характеристики продукции для расчета</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Тип продукции</Label>
                <Select value={calculatorData.productType} onValueChange={(val) => setCalculatorData({...calculatorData, productType: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип продукции" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="menu">Папка для меню</SelectItem>
                    <SelectItem value="folder">Адресная папка</SelectItem>
                    <SelectItem value="cover">Корочки твердый переплет</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Количество (шт.)</Label>
                <Input 
                  type="number" 
                  value={calculatorData.quantity}
                  onChange={(e) => setCalculatorData({...calculatorData, quantity: parseInt(e.target.value) || 0})}
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label>Материал</Label>
                <Select value={calculatorData.material} onValueChange={(val) => setCalculatorData({...calculatorData, material: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите материал" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Стандартный картон</SelectItem>
                    <SelectItem value="premium">Премиум материал</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Тип переплета</Label>
                <Select value={calculatorData.binding} onValueChange={(val) => setCalculatorData({...calculatorData, binding: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите переплет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soft">Мягкий переплет</SelectItem>
                    <SelectItem value="hardcover">Твердый переплет</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {calculatorData.productType && calculatorData.material && calculatorData.binding && (
                <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Предварительная стоимость:</span>
                    <span className="text-3xl font-bold text-primary">{calculatePrice()} ₽</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90" size="lg">
                <Icon name="Send" size={20} className="mr-2" />
                Отправить заявку
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Каталог товаров</h2>
          <p className="text-center text-gray-600 mb-12">Наша продукция высокого качества</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <Card key={product.id} className="overflow-hidden group hover:shadow-2xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    от {product.price} ₽
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Заказать
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">О нас</h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-600 text-center mb-8">
              Мы — команда профессионалов с 15-летним опытом в полиграфии. Специализируемся на производстве 
              папок для меню, адресных папок и корочек с твердым переплетом. Используем только качественные 
              материалы и современное оборудование.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Услуги и производство</h2>
          <p className="text-center text-gray-600 mb-12">Полный цикл производства полиграфической продукции</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Портфолио работ</h2>
          <p className="text-center text-gray-600 mb-12">Примеры наших выполненных проектов</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {portfolio.map((item, idx) => (
              <Card key={item.id} className="hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                      <CardDescription>{item.category}</CardDescription>
                    </div>
                    <Icon name="ExternalLink" size={20} className="text-primary" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Доставка и оплата</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Truck" size={24} className="text-primary" />
                </div>
                <CardTitle>Доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span>Курьерская доставка по городу</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span>Доставка по России транспортными компаниями</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span>Самовывоз из офиса</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="CreditCard" size={24} className="text-secondary" />
                </div>
                <CardTitle>Оплата</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span>Наличный расчет</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span>Безналичный расчет для юридических лиц</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span>Оплата банковскими картами</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Phone" size={24} className="text-primary" />
                </div>
                <CardTitle className="text-lg">Телефон</CardTitle>
                <CardDescription>+7 (495) 123-45-67</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Mail" size={24} className="text-secondary" />
                </div>
                <CardTitle className="text-lg">Email</CardTitle>
                <CardDescription>info@printmaster.ru</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="MapPin" size={24} className="text-accent" />
                </div>
                <CardTitle className="text-lg">Адрес</CardTitle>
                <CardDescription>г. Москва, ул. Примерная, д. 1</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Вопросы и ответы</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left">
                Какой минимальный тираж для заказа?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Минимальный тираж составляет 50 экземпляров. Для меньших тиражей возможна доплата.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left">
                Сколько времени занимает производство?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Стандартный срок производства — 7-10 рабочих дней. Возможно срочное изготовление за 3-5 дней с доплатой.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left">
                Можно ли заказать образец перед основным тиражом?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Да, мы изготавливаем пробные образцы. Стоимость образца обсуждается индивидуально.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left">
                Какие материалы вы используете?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Мы работаем с различными материалами: картон, кожзам, натуральная кожа, дизайнерская бумага. Поможем подобрать оптимальный вариант под ваш бюджет.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ПринтМастер</h3>
              <p className="text-gray-400 text-sm">
                Производство полиграфической продукции премиум-класса
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">Главная</button></li>
                <li><button onClick={() => scrollToSection('catalog')} className="hover:text-primary transition-colors">Каталог</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">О нас</button></li>
                <li><button onClick={() => scrollToSection('contacts')} className="hover:text-primary transition-colors">Контакты</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@printmaster.ru
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Режим работы</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Пн-Пт: 9:00 - 18:00</li>
                <li>Сб: 10:00 - 15:00</li>
                <li>Вс: выходной</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 ПринтМастер. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
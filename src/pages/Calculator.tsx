import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Calculator = () => {
  const [productType, setProductType] = useState('menu');
  const [material, setMaterial] = useState('eco-leather');
  const [size, setSize] = useState('a4');
  const [quantity, setQuantity] = useState(50);
  const [branding, setBranding] = useState('none');
  const [logoSize, setLogoSize] = useState('small');
  const [pricesData, setPricesData] = useState<any>(null);

  useEffect(() => {
    fetch('https://functions.poehali.dev/ce1d4913-184d-4416-987f-84853ba4a6ee')
      .then(res => res.json())
      .then(data => setPricesData(data))
      .catch(console.error);
  }, []);

  const getPricesFromData = () => {
    if (!pricesData) {
      return {
        menu: {
          'eco-leather': { base: 800, a4: 0, a5: -200 },
          'natural-leather': { base: 2200, a4: 0, a5: -300 },
          'baladek': { base: 600, a4: 0, a5: -150 }
        },
        folder: {
          'eco-leather': { base: 700, a4: 0, a5: -150 },
          'natural-leather': { base: 2000, a4: 0, a5: -250 },
          'baladek': { base: 500, a4: 0, a5: -100 }
        },
        cover: {
          'eco-leather': { base: 900, a4: 0, a5: -200 },
          'natural-leather': { base: 2500, a4: 0, a5: -400 },
          'baladek': { base: 700, a4: 0, a5: -150 }
        }
      };
    }

    const result: any = { menu: {}, folder: {}, cover: {} };
    pricesData.calculator_prices?.forEach((item: any) => {
      result[item.product_type][item.material] = {
        base: item.base_price,
        a4: item.a4_modifier,
        a5: item.a5_modifier
      };
    });
    return result;
  };

  const getBrandingPrices = () => {
    if (!pricesData) {
      return { none: 0, print: 150, foil: 400, embossing: 350, laser: 500 };
    }
    const result: any = {};
    pricesData.branding_prices?.forEach((item: any) => {
      result[item.branding_type] = item.price;
    });
    return result;
  };

  const getLogoSizePrices = () => {
    if (!pricesData) {
      return { small: 0, medium: 100, large: 200 };
    }
    const result: any = {};
    pricesData.logo_size_prices?.forEach((item: any) => {
      result[item.size_type] = item.price;
    });
    return result;
  };

  const calculatePrice = () => {
    const prices = getPricesFromData();
    const brandingPrices = getBrandingPrices();
    const logoSizePrices = getLogoSizePrices();
    
    const basePrice = prices[productType as keyof typeof prices][material as keyof typeof prices.menu].base;
    const sizeModifier = prices[productType as keyof typeof prices][material as keyof typeof prices.menu][size as 'a4' | 'a5'];
    const brandingCost = brandingPrices[branding as keyof typeof brandingPrices];
    const logoCost = branding !== 'none' ? logoSizePrices[logoSize as keyof typeof logoSizePrices] : 0;
    
    const unitPrice = basePrice + sizeModifier + brandingCost + logoCost;
    
    let discount = 0;
    if (quantity >= 100) discount = 0.15;
    else if (quantity >= 50) discount = 0.10;
    else if (quantity >= 20) discount = 0.05;
    
    const totalPrice = unitPrice * quantity * (1 - discount);
    
    return {
      unitPrice,
      totalPrice,
      discount: discount * 100
    };
  };

  const result = calculatePrice();

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
                <p className="text-xs text-gray-500">Калькулятор цен</p>
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

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
              <Icon name="Calculator" size={14} className="mr-1" />
              Расчет стоимости
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Калькулятор цен
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Рассчитайте стоимость вашего заказа онлайн
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Параметры заказа</CardTitle>
                  <CardDescription>Выберите характеристики продукции</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Тип продукции</Label>
                    <RadioGroup value={productType} onValueChange={setProductType}>
                      <div className="grid grid-cols-3 gap-3">
                        <Label htmlFor="menu" className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${productType === 'menu' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <RadioGroupItem value="menu" id="menu" className="sr-only" />
                          <Icon name="BookOpen" size={32} className={productType === 'menu' ? 'text-amber-600' : 'text-gray-400'} />
                          <span className="text-sm font-medium mt-2">Меню</span>
                        </Label>
                        <Label htmlFor="folder" className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${productType === 'folder' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <RadioGroupItem value="folder" id="folder" className="sr-only" />
                          <Icon name="FolderOpen" size={32} className={productType === 'folder' ? 'text-amber-600' : 'text-gray-400'} />
                          <span className="text-sm font-medium mt-2">Папка</span>
                        </Label>
                        <Label htmlFor="cover" className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${productType === 'cover' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <RadioGroupItem value="cover" id="cover" className="sr-only" />
                          <Icon name="Book" size={32} className={productType === 'cover' ? 'text-amber-600' : 'text-gray-400'} />
                          <span className="text-sm font-medium mt-2">Корочки</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="material" className="text-base font-semibold">Материал</Label>
                    <Select value={material} onValueChange={setMaterial}>
                      <SelectTrigger id="material" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eco-leather">
                          <div className="flex items-center justify-between w-full">
                            <span>Эко-кожа</span>
                            <Badge variant="secondary" className="ml-2">Стандарт</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="natural-leather">
                          <div className="flex items-center justify-between w-full">
                            <span>Натуральная кожа</span>
                            <Badge className="ml-2 bg-amber-100 text-amber-800">Премиум</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="baladek">
                          <div className="flex items-center justify-between w-full">
                            <span>Баладек</span>
                            <Badge variant="outline" className="ml-2">Эконом</Badge>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="size" className="text-base font-semibold">Размер</Label>
                    <RadioGroup value={size} onValueChange={setSize} className="mt-2">
                      <div className="grid grid-cols-2 gap-3">
                        <Label htmlFor="a4" className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${size === 'a4' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <RadioGroupItem value="a4" id="a4" className="sr-only" />
                          <div className="text-center">
                            <div className="font-semibold">A4</div>
                            <div className="text-xs text-gray-500">210×297 мм</div>
                          </div>
                        </Label>
                        <Label htmlFor="a5" className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${size === 'a5' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <RadioGroupItem value="a5" id="a5" className="sr-only" />
                          <div className="text-center">
                            <div className="font-semibold">A5</div>
                            <div className="text-xs text-gray-500">148×210 мм</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="quantity" className="text-base font-semibold">Количество: {quantity} шт</Label>
                    <Input
                      id="quantity"
                      type="range"
                      min="1"
                      max="500"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>500</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="branding" className="text-base font-semibold">Нанесение логотипа</Label>
                    <Select value={branding} onValueChange={setBranding}>
                      <SelectTrigger id="branding" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Без логотипа</SelectItem>
                        <SelectItem value="print">Печать (+150 ₽)</SelectItem>
                        <SelectItem value="foil">Тиснение фольгой (+400 ₽)</SelectItem>
                        <SelectItem value="embossing">Слепое тиснение (+350 ₽)</SelectItem>
                        <SelectItem value="laser">Лазерная гравировка (+500 ₽)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {branding !== 'none' && (
                    <div>
                      <Label htmlFor="logoSize" className="text-base font-semibold">Размер логотипа</Label>
                      <Select value={logoSize} onValueChange={setLogoSize}>
                        <SelectTrigger id="logoSize" className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Малый (50×50 мм)</SelectItem>
                          <SelectItem value="medium">Средний (80×80 мм) (+100 ₽)</SelectItem>
                          <SelectItem value="large">Большой (120×120 мм) (+200 ₽)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-2 border-amber-200 sticky top-24">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Receipt" size={20} />
                    Итоговая стоимость
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Цена за единицу:</span>
                      <span className="font-semibold">{result.unitPrice.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Количество:</span>
                      <span className="font-semibold">{quantity} шт</span>
                    </div>
                    {result.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Скидка:</span>
                        <Badge className="bg-green-100 text-green-800">-{result.discount}%</Badge>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-baseline mb-6">
                      <span className="text-lg font-semibold">Итого:</span>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-amber-600">
                          {Math.round(result.totalPrice).toLocaleString()} ₽
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.round(result.totalPrice / quantity).toLocaleString()} ₽/шт
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90" size="lg" asChild>
                      <a href="tel:+79032469318">
                        <Icon name="Phone" size={20} className="mr-2" />
                        Заказать
                      </a>
                    </Button>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                      Точная стоимость зависит от деталей заказа. Позвоните для уточнения.
                    </p>
                  </div>

                  {result.discount === 0 && quantity < 20 && (
                    <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800">
                      <Icon name="Info" size={14} className="inline mr-1" />
                      При заказе от 20 шт — скидка 5%
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
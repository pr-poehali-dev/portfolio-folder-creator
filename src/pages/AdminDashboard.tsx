import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const PRODUCTS_API = 'https://functions.poehali.dev/65b050bc-83c5-4cd4-abc4-6d565bbe765e';
const BLOG_API = 'https://functions.poehali.dev/03d15e5b-27a3-4806-861b-3ecb95d625bd';
const PRICES_API = 'https://functions.poehali.dev/ce1d4913-184d-4416-987f-84853ba4a6ee';
const AUTH_API = 'https://functions.poehali.dev/c59fe49a-4cc0-43df-b6b4-3c6b8e55326e';

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

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  read_time: string;
  created_at?: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [prices, setPrices] = useState<any>(null);
  const [editingPrice, setEditingPrice] = useState<any>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (activeTab === 'prices') {
      loadPrices();
    }
  }, [navigate, activeTab]);

  const loadPrices = async () => {
    try {
      const response = await fetch(PRICES_API);
      const data = await response.json();
      setPrices(data);
    } catch (err) {
      console.error('Ошибка загрузки цен:', err);
    }
  };

  const updatePrice = async (priceData: any) => {
    try {
      const response = await fetch(PRICES_API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(priceData)
      });
      const data = await response.json();
      if (data.success) {
        loadPrices();
        setEditingPrice(null);
        alert('Цена обновлена');
      }
    } catch (err) {
      console.error('Ошибка обновления цены:', err);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    try {
      const username = localStorage.getItem('adminUser');
      const response = await fetch(AUTH_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_password',
          username,
          old_password: currentPassword,
          new_password: newPassword
        })
      });
      const data = await response.json();
      if (data.success) {
        alert('Пароль успешно изменён');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        alert('Ошибка: ' + data.error);
      }
    } catch (err) {
      console.error('Ошибка смены пароля:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Админ-панель</h1>
            <p className="text-gray-600">Управление сайтом papka.moscow</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <Icon name="LogOut" size={20} className="mr-2" />
            Выйти
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-4 mb-6">
            <TabsTrigger value="products">
              <Icon name="Package" size={16} className="mr-2" />
              Товары
            </TabsTrigger>
            <TabsTrigger value="blog">
              <Icon name="FileText" size={16} className="mr-2" />
              Блог
            </TabsTrigger>
            <TabsTrigger value="prices">
              <Icon name="DollarSign" size={16} className="mr-2" />
              Цены
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Управление товарами</CardTitle>
                <CardDescription>Здесь будет управление товарами (используйте старую админку /old-admin)</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>Управление блогом</CardTitle>
                <CardDescription>Здесь будет управление блогом (используйте старую админку /old-admin)</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="prices">
            {!prices ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Icon name="Loader2" size={32} className="mx-auto animate-spin text-muted-foreground" />
                  <p className="text-lg text-muted-foreground mt-4">Загрузка цен...</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Цены на продукцию</CardTitle>
                    <CardDescription>Базовые цены и модификаторы размеров для калькулятора</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prices.calculator_prices?.map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex-1">
                            <div className="font-semibold">
                              {item.product_type === 'menu' ? 'Меню' : item.product_type === 'folder' ? 'Папка' : 'Корочки'} - {item.material === 'eco-leather' ? 'Эко-кожа' : item.material === 'natural-leather' ? 'Натуральная кожа' : 'Баладек'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Базовая: {item.base_price} ₽ | A4: {item.a4_modifier >= 0 ? '+' : ''}{item.a4_modifier} ₽ | A5: {item.a5_modifier >= 0 ? '+' : ''}{item.a5_modifier} ₽
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => setEditingPrice({ ...item, type: 'calculator' })}>
                            <Icon name="Edit" size={14} className="mr-1" />
                            Изменить
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Цены на брендирование</CardTitle>
                    <CardDescription>Стоимость нанесения логотипа</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prices.branding_prices?.map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex-1">
                            <div className="font-semibold">
                              {item.branding_type === 'none' ? 'Без логотипа' : item.branding_type === 'print' ? 'Печать' : item.branding_type === 'foil' ? 'Тиснение фольгой' : item.branding_type === 'embossing' ? 'Слепое тиснение' : 'Лазерная гравировка'}
                            </div>
                            <div className="text-sm text-muted-foreground">{item.price} ₽</div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => setEditingPrice({ ...item, type: 'branding' })}>
                            <Icon name="Edit" size={14} className="mr-1" />
                            Изменить
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Цены за размер логотипа</CardTitle>
                    <CardDescription>Доплата за увеличенный размер</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prices.logo_size_prices?.map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex-1">
                            <div className="font-semibold">
                              {item.size_type === 'small' ? 'Малый' : item.size_type === 'medium' ? 'Средний' : 'Большой'}
                            </div>
                            <div className="text-sm text-muted-foreground">{item.price} ₽</div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => setEditingPrice({ ...item, type: 'logo' })}>
                            <Icon name="Edit" size={14} className="mr-1" />
                            Изменить
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {editingPrice && (
              <Dialog open={!!editingPrice} onOpenChange={() => setEditingPrice(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Редактирование цены</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {editingPrice.type === 'calculator' ? (
                      <>
                        <div>
                          <Label>Базовая цена (₽)</Label>
                          <Input
                            type="number"
                            value={editingPrice.base_price}
                            onChange={(e) => setEditingPrice({...editingPrice, base_price: Number(e.target.value)})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Модификатор A4 (₽)</Label>
                          <Input
                            type="number"
                            value={editingPrice.a4_modifier}
                            onChange={(e) => setEditingPrice({...editingPrice, a4_modifier: Number(e.target.value)})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Модификатор A5 (₽)</Label>
                          <Input
                            type="number"
                            value={editingPrice.a5_modifier}
                            onChange={(e) => setEditingPrice({...editingPrice, a5_modifier: Number(e.target.value)})}
                            className="mt-2"
                          />
                        </div>
                      </>
                    ) : (
                      <div>
                        <Label>Цена (₽)</Label>
                        <Input
                          type="number"
                          value={editingPrice.price}
                          onChange={(e) => setEditingPrice({...editingPrice, price: Number(e.target.value)})}
                          className="mt-2"
                        />
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Button
                        onClick={() => {
                          if (editingPrice.type === 'calculator') {
                            updatePrice({
                              type: 'calculator',
                              product_type: editingPrice.product_type,
                              material: editingPrice.material,
                              base_price: editingPrice.base_price,
                              a4_modifier: editingPrice.a4_modifier,
                              a5_modifier: editingPrice.a5_modifier
                            });
                          } else if (editingPrice.type === 'branding') {
                            updatePrice({
                              type: 'branding',
                              branding_type: editingPrice.branding_type,
                              price: editingPrice.price
                            });
                          } else {
                            updatePrice({
                              type: 'logo',
                              size_type: editingPrice.size_type,
                              price: editingPrice.price
                            });
                          }
                        }}
                        className="flex-1"
                      >
                        <Icon name="Check" size={16} className="mr-2" />
                        Сохранить
                      </Button>
                      <Button variant="outline" onClick={() => setEditingPrice(null)} className="flex-1">
                        Отмена
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Смена пароля</CardTitle>
                <CardDescription>Измените пароль для доступа к админ-панели</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Текущий пароль</Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Введите текущий пароль"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Новый пароль</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Введите новый пароль"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Подтверждение пароля</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Повторите новый пароль"
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleChangePassword} className="w-full">
                  <Icon name="Lock" size={16} className="mr-2" />
                  Изменить пароль
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

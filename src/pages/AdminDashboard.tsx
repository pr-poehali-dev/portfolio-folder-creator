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
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (activeTab === 'prices') {
      loadPrices();
    } else if (activeTab === 'products') {
      loadProducts();
    } else if (activeTab === 'blog') {
      loadBlogPosts();
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

  const loadProducts = async () => {
    try {
      const response = await fetch(PRODUCTS_API);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Ошибка загрузки товаров:', err);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const response = await fetch(BLOG_API);
      const data = await response.json();
      setBlogPosts(data);
    } catch (err) {
      console.error('Ошибка загрузки постов:', err);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm('Удалить товар?')) return;
    try {
      const response = await fetch(`${PRODUCTS_API}?id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        loadProducts();
        alert('Товар удалён');
      }
    } catch (err) {
      console.error('Ошибка удаления товара:', err);
    }
  };

  const deleteBlogPost = async (id: number) => {
    if (!confirm('Удалить пост?')) return;
    try {
      const response = await fetch(`${BLOG_API}?id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        loadBlogPosts();
        alert('Пост удалён');
      }
    } catch (err) {
      console.error('Ошибка удаления поста:', err);
    }
  };

  const saveProduct = async (product: Product) => {
    try {
      const method = product.id ? 'PUT' : 'POST';
      const response = await fetch(PRODUCTS_API, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      const data = await response.json();
      if (data.success) {
        loadProducts();
        setEditingProduct(null);
        setIsAddingProduct(false);
        alert(product.id ? 'Товар обновлён' : 'Товар добавлен');
      }
    } catch (err) {
      console.error('Ошибка сохранения товара:', err);
    }
  };

  const saveBlogPost = async (post: BlogPost) => {
    try {
      const method = post.id ? 'PUT' : 'POST';
      const response = await fetch(BLOG_API, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      const data = await response.json();
      if (data.success) {
        loadBlogPosts();
        setEditingBlog(null);
        setIsAddingBlog(false);
        alert(post.id ? 'Пост обновлён' : 'Пост добавлен');
      }
    } catch (err) {
      console.error('Ошибка сохранения поста:', err);
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
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Управление товарами</CardTitle>
                    <CardDescription>Добавление и редактирование товаров в каталоге</CardDescription>
                  </div>
                  <Button onClick={() => {
                    setEditingProduct({
                      id: 0,
                      title: '',
                      category: 'menu',
                      price: '',
                      image: '',
                      description: '',
                      features: [],
                      materials: [],
                      sizes: []
                    });
                    setIsAddingProduct(true);
                  }}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить товар
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex gap-4 flex-1">
                        {product.image && (
                          <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded" />
                        )}
                        <div className="flex-1">
                          <div className="font-semibold text-lg">{product.title}</div>
                          <div className="text-sm text-muted-foreground">{product.category === 'menu' ? 'Меню' : product.category === 'folder' ? 'Папка' : 'Корочки'} • {product.price}</div>
                          <div className="text-sm mt-1">{product.description}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)}>
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteProduct(product.id)}>
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {editingProduct && (
              <Dialog open={!!editingProduct} onOpenChange={() => { setEditingProduct(null); setIsAddingProduct(false); }}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{isAddingProduct ? 'Добавить товар' : 'Редактировать товар'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Название</Label>
                      <Input
                        value={editingProduct.title}
                        onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Категория</Label>
                      <Select value={editingProduct.category} onValueChange={(v) => setEditingProduct({...editingProduct, category: v})}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="menu">Меню</SelectItem>
                          <SelectItem value="folder">Папка</SelectItem>
                          <SelectItem value="covers">Корочки</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Цена</Label>
                      <Input
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                        placeholder="от 500 ₽"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Изображение (URL)</Label>
                      <Input
                        value={editingProduct.image}
                        onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Описание</Label>
                      <Textarea
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Особенности (через запятую)</Label>
                      <Textarea
                        value={editingProduct.features.join(', ')}
                        onChange={(e) => setEditingProduct({...editingProduct, features: e.target.value.split(',').map(s => s.trim())})}
                        className="mt-2"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Материалы (через запятую)</Label>
                      <Input
                        value={editingProduct.materials.join(', ')}
                        onChange={(e) => setEditingProduct({...editingProduct, materials: e.target.value.split(',').map(s => s.trim())})}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Размеры (через запятую)</Label>
                      <Input
                        value={editingProduct.sizes.join(', ')}
                        onChange={(e) => setEditingProduct({...editingProduct, sizes: e.target.value.split(',').map(s => s.trim())})}
                        className="mt-2"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => saveProduct(editingProduct)} className="flex-1">
                        <Icon name="Check" size={16} className="mr-2" />
                        Сохранить
                      </Button>
                      <Button variant="outline" onClick={() => { setEditingProduct(null); setIsAddingProduct(false); }} className="flex-1">
                        Отмена
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Управление блогом</CardTitle>
                    <CardDescription>Добавление и редактирование статей</CardDescription>
                  </div>
                  <Button onClick={() => {
                    setEditingBlog({
                      id: 0,
                      title: '',
                      slug: '',
                      excerpt: '',
                      content: '',
                      category: 'production',
                      image: '',
                      read_time: '5 мин'
                    });
                    setIsAddingBlog(true);
                  }}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить статью
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex gap-4 flex-1">
                        {post.image && (
                          <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded" />
                        )}
                        <div className="flex-1">
                          <div className="font-semibold text-lg">{post.title}</div>
                          <div className="text-sm text-muted-foreground">{post.category} • {post.read_time}</div>
                          <div className="text-sm mt-1">{post.excerpt}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingBlog(post)}>
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteBlogPost(post.id)}>
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {editingBlog && (
              <Dialog open={!!editingBlog} onOpenChange={() => { setEditingBlog(null); setIsAddingBlog(false); }}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{isAddingBlog ? 'Добавить статью' : 'Редактировать статью'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Заголовок</Label>
                      <Input
                        value={editingBlog.title}
                        onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Slug (URL)</Label>
                      <Input
                        value={editingBlog.slug}
                        onChange={(e) => setEditingBlog({...editingBlog, slug: e.target.value})}
                        placeholder="nazvanie-stati"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Категория</Label>
                      <Select value={editingBlog.category} onValueChange={(v) => setEditingBlog({...editingBlog, category: v})}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="production">Производство</SelectItem>
                          <SelectItem value="materials">Материалы</SelectItem>
                          <SelectItem value="design">Дизайн</SelectItem>
                          <SelectItem value="trends">Тренды</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Время чтения</Label>
                      <Input
                        value={editingBlog.read_time}
                        onChange={(e) => setEditingBlog({...editingBlog, read_time: e.target.value})}
                        placeholder="5 мин"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Изображение (URL)</Label>
                      <Input
                        value={editingBlog.image}
                        onChange={(e) => setEditingBlog({...editingBlog, image: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Краткое описание</Label>
                      <Textarea
                        value={editingBlog.excerpt}
                        onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                        className="mt-2"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Полный текст</Label>
                      <Textarea
                        value={editingBlog.content}
                        onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                        className="mt-2"
                        rows={8}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => saveBlogPost(editingBlog)} className="flex-1">
                        <Icon name="Check" size={16} className="mr-2" />
                        Сохранить
                      </Button>
                      <Button variant="outline" onClick={() => { setEditingBlog(null); setIsAddingBlog(false); }} className="flex-1">
                        Отмена
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
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
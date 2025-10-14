import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/admin/ImageUpload';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [adminUsername, setAdminUsername] = useState('admin');
  
  console.log('Admin component loaded - VERSION 2.0');

  const [blogPost, setBlogPost] = useState({
    title: '',
    excerpt: '',
    category: 'Меню',
    slug: '',
    tags: '',
    content: '',
    image: '/img/8ffb4be5-fdbf-42eb-bc68-0cf711115a50.jpg'
  });

  const [product, setProduct] = useState({
    title: '',
    category: 'menu',
    price: '',
    description: '',
    features: '',
    materials: '',
    sizes: '',
    image: '/img/8ffb4be5-fdbf-42eb-bc68-0cf711115a50.jpg'
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [prices, setPrices] = useState<any>(null);
  const [editingPrice, setEditingPrice] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const savedUsername = localStorage.getItem('admin_username');
    if (token && savedUsername) {
      setAuthToken(token);
      setAdminUsername(savedUsername);
      setIsAuthenticated(true);
      loadPrices();
    }
  }, []);

  const loadPrices = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/ce1d4913-184d-4416-987f-84853ba4a6ee');
      const data = await response.json();
      setPrices(data);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить цены",
        variant: "destructive"
      });
    }
  };

  const updatePrice = async (priceData: any) => {
    try {
      const response = await fetch('https://functions.poehali.dev/ce1d4913-184d-4416-987f-84853ba4a6ee', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(priceData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Цена обновлена",
          description: "Изменения сохранены",
        });
        loadPrices();
        setEditingPrice(null);
      } else {
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось обновить цену",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка подключения",
        description: "Не удалось обновить цену",
        variant: "destructive"
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/c59fe49a-4cc0-43df-b6b4-3c6b8e55326e', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAuthToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_username', username);
        toast({
          title: "Вход выполнен",
          description: "Добро пожаловать в админ-панель",
        });
      } else {
        toast({
          title: "Ошибка входа",
          description: data.error || "Неверные данные",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка подключения",
        description: "Не удалось подключиться к серверу",
        variant: "destructive"
      });
    }
  };

  const handlePublishPost = () => {
    toast({
      title: "Статья опубликована",
      description: `"${blogPost.title}" успешно добавлена в блог`,
    });
    setBlogPost({
      title: '',
      excerpt: '',
      category: 'Меню',
      slug: '',
      tags: '',
      content: '',
      image: '/img/8ffb4be5-fdbf-42eb-bc68-0cf711115a50.jpg'
    });
  };

  const handlePublishProduct = () => {
    toast({
      title: "Товар добавлен",
      description: `"${product.title}" успешно добавлен в портфолио`,
    });
    setProduct({
      title: '',
      category: 'menu',
      price: '',
      description: '',
      features: '',
      materials: '',
      sizes: '',
      image: '/img/8ffb4be5-fdbf-42eb-bc68-0cf711115a50.jpg'
    });
  };

  const generateSlug = (title: string) => {
    const translitMap: { [key: string]: string } = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z',
      'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
      'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
      'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };
    
    return title
      .toLowerCase()
      .split('')
      .map(char => translitMap[char] || char)
      .join('')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Lock" size={32} className="text-white" />
            </div>
            <CardTitle className="text-2xl">Админ-панель</CardTitle>
            <CardDescription>Введите пароль для доступа</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="mt-2"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600">
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
              <Link to="/">
                <Button type="button" variant="outline" className="w-full">
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  На главную
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
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
                <Icon name="Settings" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">papka.moscow</h1>
                <p className="text-xs text-gray-500">Админ-панель</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">
                <Icon name="User" size={12} className="mr-1" />
                Администратор
              </Badge>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Icon name="Home" size={16} className="mr-2" />
                  На сайт
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setIsAuthenticated(false);
                  setAuthToken('');
                  localStorage.removeItem('admin_token');
                  localStorage.removeItem('admin_username');
                  toast({
                    title: "Выход выполнен",
                    description: "Вы вышли из админ-панели",
                  });
                }}
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Управление контентом</h1>
            <p className="text-gray-600">Управление сайтом</p>
          </div>

          <Tabs defaultValue="blog" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 gap-2">
              <TabsTrigger value="blog" className="flex items-center gap-2">
                <Icon name="Newspaper" size={16} />
                Блог
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Icon name="Package" size={16} />
                Товары
              </TabsTrigger>
              <TabsTrigger value="prices" className="flex items-center gap-2">
                <Icon name="DollarSign" size={16} />
                Цены
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Icon name="Settings" size={16} />
                Настройки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blog">
              <Card>
                <CardHeader>
                  <CardTitle>Новая статья в блог</CardTitle>
                  <CardDescription>Заполните поля для публикации статьи</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="blogTitle">Заголовок статьи</Label>
                      <Input
                        id="blogTitle"
                        value={blogPost.title}
                        onChange={(e) => {
                          setBlogPost({ ...blogPost, title: e.target.value, slug: generateSlug(e.target.value) });
                        }}
                        placeholder="Как выбрать папку для меню"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="blogSlug">URL (slug)</Label>
                      <Input
                        id="blogSlug"
                        value={blogPost.slug}
                        onChange={(e) => setBlogPost({ ...blogPost, slug: e.target.value })}
                        placeholder="kak-vybrat-papku"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="blogExcerpt">Краткое описание</Label>
                    <Textarea
                      id="blogExcerpt"
                      value={blogPost.excerpt}
                      onChange={(e) => setBlogPost({ ...blogPost, excerpt: e.target.value })}
                      placeholder="Краткое описание статьи для карточки"
                      className="mt-2"
                      rows={2}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="blogCategory">Категория</Label>
                      <Select value={blogPost.category} onValueChange={(value) => setBlogPost({ ...blogPost, category: value })}>
                        <SelectTrigger id="blogCategory" className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Меню">Меню</SelectItem>
                          <SelectItem value="Папки">Папки</SelectItem>
                          <SelectItem value="Корочки">Корочки</SelectItem>
                          <SelectItem value="Производство">Производство</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="blogTags">Теги (через запятую)</Label>
                      <Input
                        id="blogTags"
                        value={blogPost.tags}
                        onChange={(e) => setBlogPost({ ...blogPost, tags: e.target.value })}
                        placeholder="меню, рестораны, выбор"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="blogContent">Текст статьи</Label>
                    <Textarea
                      id="blogContent"
                      value={blogPost.content}
                      onChange={(e) => setBlogPost({ ...blogPost, content: e.target.value })}
                      placeholder="Полный текст статьи. Каждый абзац с новой строки."
                      className="mt-2"
                      rows={10}
                    />
                    <p className="text-xs text-gray-500 mt-1">Каждый абзац пишите с новой строки</p>
                  </div>

                  <div>
                    <Label htmlFor="blogImage">URL изображения</Label>
                    <Input
                      id="blogImage"
                      value={blogPost.image}
                      onChange={(e) => setBlogPost({ ...blogPost, image: e.target.value })}
                      placeholder="/img/название.jpg"
                      className="mt-2"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={handlePublishPost}
                      className="bg-gradient-to-r from-amber-500 to-orange-600"
                      disabled={!blogPost.title || !blogPost.content}
                    >
                      <Icon name="Send" size={16} className="mr-2" />
                      Опубликовать статью
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/blog')}>
                      <Icon name="Eye" size={16} className="mr-2" />
                      Посмотреть блог
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Новый товар в портфолио</CardTitle>
                  <CardDescription>Заполните поля для добавления товара</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productTitle">Название товара</Label>
                      <Input
                        id="productTitle"
                        value={product.title}
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                        placeholder='Меню для ресторана "Премиум"'
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productPrice">Цена</Label>
                      <Input
                        id="productPrice"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        placeholder="от 2 500 ₽"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="productCategory">Категория</Label>
                    <Select value={product.category} onValueChange={(value) => setProduct({ ...product, category: value })}>
                      <SelectTrigger id="productCategory" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="menu">Меню</SelectItem>
                        <SelectItem value="folder">Адресные папки</SelectItem>
                        <SelectItem value="cover">Корочки</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="productDescription">Описание</Label>
                    <Textarea
                      id="productDescription"
                      value={product.description}
                      onChange={(e) => setProduct({ ...product, description: e.target.value })}
                      placeholder="Краткое описание товара"
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="productFeatures">Особенности (через запятую)</Label>
                    <Input
                      id="productFeatures"
                      value={product.features}
                      onChange={(e) => setProduct({ ...product, features: e.target.value })}
                      placeholder="Тиснение фольгой, Натуральная кожа, Индивидуальный дизайн"
                      className="mt-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productMaterials">Материалы (через запятую)</Label>
                      <Input
                        id="productMaterials"
                        value={product.materials}
                        onChange={(e) => setProduct({ ...product, materials: e.target.value })}
                        placeholder="Натуральная кожа, Картон 3мм"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productSizes">Размеры (через запятую)</Label>
                      <Input
                        id="productSizes"
                        value={product.sizes}
                        onChange={(e) => setProduct({ ...product, sizes: e.target.value })}
                        placeholder="А4 (210×297мм), А5 (148×210мм)"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <ImageUpload
                    value={product.image}
                    onChange={(url) => setProduct({ ...product, image: url })}
                    label="Изображение товара"
                  />

                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={handlePublishProduct}
                      className="bg-gradient-to-r from-amber-500 to-orange-600"
                      disabled={!product.title || !product.description}
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить товар
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/')}>
                      <Icon name="Eye" size={16} className="mr-2" />
                      Посмотреть сайт
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prices">
              {!prices ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Icon name="Loader2" size={32} className="mx-auto animate-spin text-gray-400" />
                    <p className="text-gray-500 mt-4">Загрузка цен...</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Цены на продукцию</CardTitle>
                      <CardDescription>Базовые цены и модификаторы размеров</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {prices.calculator_prices?.map((item: any) => (
                          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex-1">
                              <div className="font-semibold capitalize">
                                {item.product_type === 'menu' ? 'Меню' : item.product_type === 'folder' ? 'Папка' : 'Корочки'} - {item.material === 'eco-leather' ? 'Эко-кожа' : item.material === 'natural-leather' ? 'Натуральная кожа' : 'Баладек'}
                              </div>
                              <div className="text-sm text-gray-600">
                                Базовая: {item.base_price} ₽ | A4: {item.a4_modifier >= 0 ? '+' : ''}{item.a4_modifier} ₽ | A5: {item.a5_modifier >= 0 ? '+' : ''}{item.a5_modifier} ₽
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingPrice({ ...item, type: 'calculator' })}
                            >
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
                              <div className="font-semibold capitalize">
                                {item.branding_type === 'none' ? 'Без логотипа' : item.branding_type === 'print' ? 'Печать' : item.branding_type === 'foil' ? 'Тиснение фольгой' : item.branding_type === 'embossing' ? 'Слепое тиснение' : 'Лазерная гравировка'}
                              </div>
                              <div className="text-sm text-gray-600">{item.price} ₽</div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingPrice({ ...item, type: 'branding' })}
                            >
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
                              <div className="font-semibold capitalize">
                                {item.size_type === 'small' ? 'Малый' : item.size_type === 'medium' ? 'Средний' : 'Большой'}
                              </div>
                              <div className="text-sm text-gray-600">{item.price} ₽</div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingPrice({ ...item, type: 'logo' })}
                            >
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditingPrice(null)}>
                  <Card className="w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
                    <CardHeader>
                      <CardTitle>Редактирование цены</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                          className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600"
                        >
                          <Icon name="Check" size={16} className="mr-2" />
                          Сохранить
                        </Button>
                        <Button variant="outline" onClick={() => setEditingPrice(null)} className="flex-1">
                          Отмена
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки администратора</CardTitle>
                  <CardDescription>Изменение пароля и других параметров</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Icon name="Key" size={20} />
                      Смена пароля
                    </h3>
                    <div>
                      <Label htmlFor="newPassword">Новый пароль</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Введите новый пароль"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Повторите новый пароль"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentPassword">Текущий пароль</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Введите текущий пароль"
                        className="mt-2"
                      />
                    </div>
                    <Button 
                      onClick={async () => {
                        if (!currentPassword || !newPassword || !confirmPassword) {
                          toast({
                            title: "Ошибка",
                            description: "Заполните все поля",
                            variant: "destructive"
                          });
                          return;
                        }
                        if (newPassword !== confirmPassword) {
                          toast({
                            title: "Ошибка",
                            description: "Пароли не совпадают",
                            variant: "destructive"
                          });
                          return;
                        }
                        if (newPassword.length < 6) {
                          toast({
                            title: "Ошибка",
                            description: "Пароль должен быть не менее 6 символов",
                            variant: "destructive"
                          });
                          return;
                        }
                        
                        try {
                          const response = await fetch('https://functions.poehali.dev/c59fe49a-4cc0-43df-b6b4-3c6b8e55326e', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              action: 'change_password',
                              username: adminUsername,
                              old_password: currentPassword,
                              new_password: newPassword
                            })
                          });
                          
                          const data = await response.json();
                          
                          if (data.success) {
                            toast({
                              title: "Пароль изменен",
                              description: "Новый пароль успешно сохранен",
                            });
                            setCurrentPassword('');
                            setNewPassword('');
                            setConfirmPassword('');
                          } else {
                            toast({
                              title: "Ошибка",
                              description: data.error || "Не удалось изменить пароль",
                              variant: "destructive"
                            });
                          }
                        } catch (error) {
                          toast({
                            title: "Ошибка подключения",
                            description: "Не удалось подключиться к серверу",
                            variant: "destructive"
                          });
                        }
                      }}
                      className="bg-gradient-to-r from-amber-500 to-orange-600"
                    >
                      <Icon name="Check" size={16} className="mr-2" />
                      Сохранить пароль
                    </Button>
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Icon name="User" size={20} />
                      Информация об аккаунте
                    </h3>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Пользователь:</span>
                        <span className="font-medium">{adminUsername}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Статус:</span>
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          <Icon name="CheckCircle" size={12} className="mr-1" />
                          Активен
                        </Badge>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Роль:</span>
                        <span className="font-medium">Администратор</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-8 border-amber-200 bg-amber-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <Icon name="Info" size={20} />
                Важная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-amber-800">
              <p><strong>Пароль для входа:</strong> admin2024</p>
              <p><strong>Загрузка изображений:</strong> Сейчас используются заранее сгенерированные изображения. Для добавления новых изображений используйте пути вида /img/название.jpg</p>
              <p><strong>База данных:</strong> В текущей версии данные хранятся в коде. Для сохранения в базу данных необходимо настроить backend.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Admin;
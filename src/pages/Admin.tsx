import { useState } from 'react';
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

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin2024') {
      setIsAuthenticated(true);
      toast({
        title: "Вход выполнен",
        description: "Добро пожаловать в админ-панель",
      });
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверный пароль",
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
            <p className="text-gray-600">Добавляйте новые статьи и товары</p>
          </div>

          <Tabs defaultValue="blog" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="blog" className="flex items-center gap-2">
                <Icon name="Newspaper" size={16} />
                Блог
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Icon name="Package" size={16} />
                Товары
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

                  <div>
                    <Label htmlFor="productImage">URL изображения</Label>
                    <Input
                      id="productImage"
                      value={product.image}
                      onChange={(e) => setProduct({ ...product, image: e.target.value })}
                      placeholder="/img/название.jpg"
                      className="mt-2"
                    />
                  </div>

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
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

export default function AdminPanel() {
  console.log('AdminPanel v3.0 loaded with 4 tabs');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
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
    loadProducts();
    loadBlogPosts();
    loadPrices();
  }, [navigate]);

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

  const loadProducts = async () => {
    try {
      const response = await fetch(PRODUCTS_API);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Ошибка загрузки товаров:', err);
    } finally {
      setIsLoading(false);
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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleSave = async (formData: FormData) => {
    const productData = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      price: formData.get('price') as string,
      image: formData.get('image') as string,
      description: formData.get('description') as string,
      features: (formData.get('features') as string).split('\n').filter(Boolean),
      materials: (formData.get('materials') as string).split('\n').filter(Boolean),
      sizes: (formData.get('sizes') as string).split('\n').filter(Boolean),
    };

    try {
      const url = editingProduct
        ? `${PRODUCTS_API}?id=${editingProduct.id}`
        : PRODUCTS_API;
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        await loadProducts();
        setIsProductDialogOpen(false);
        setEditingProduct(null);
      }
    } catch (err) {
      console.error('Ошибка сохранения:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить товар?')) return;

    try {
      const response = await fetch(`${PRODUCTS_API}?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadProducts();
      }
    } catch (err) {
      console.error('Ошибка удаления:', err);
    }
  };

  const handleSavePost = async (formData: FormData) => {
    const postData = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      image: formData.get('image') as string,
      read_time: formData.get('read_time') as string,
    };

    try {
      const url = editingPost
        ? `${BLOG_API}?id=${editingPost.id}`
        : BLOG_API;
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        await loadBlogPosts();
        setIsPostDialogOpen(false);
        setEditingPost(null);
      }
    } catch (err) {
      console.error('Ошибка сохранения поста:', err);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('Удалить пост?')) return;

    try {
      const response = await fetch(`${BLOG_API}?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadBlogPosts();
      }
    } catch (err) {
      console.error('Ошибка удаления:', err);
    }
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setIsProductDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsProductDialogOpen(true);
  };

  const openCreatePostDialog = () => {
    setEditingPost(null);
    setIsPostDialogOpen(true);
  };

  const openEditPostDialog = (post: BlogPost) => {
    setEditingPost(post);
    setIsPostDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <Button variant="outline" onClick={handleLogout}>
            <Icon name="LogOut" size={20} className="mr-2" />
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-4">
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="blog">Блог</TabsTrigger>
            <TabsTrigger value="prices">Цены</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="flex justify-end mb-6">
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openCreateDialog}>
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить товар
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? 'Редактировать товар' : 'Новый товар'}
                    </DialogTitle>
                    <DialogDescription>
                      Заполните информацию о товаре
                    </DialogDescription>
                  </DialogHeader>
                  <ProductForm
                    product={editingProduct}
                    onSave={handleSave}
                    onCancel={() => setIsProductDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <CardTitle className="text-lg">{product.title}</CardTitle>
                    <CardDescription>{product.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(product)}
                        className="flex-1"
                      >
                        <Icon name="Edit" size={16} className="mr-1" />
                        Изменить
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="flex-1"
                      >
                        <Icon name="Trash2" size={16} className="mr-1" />
                        Удалить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {products.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Icon name="Package" size={48} className="mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground mb-4">
                    Товаров пока нет
                  </p>
                  <Button onClick={openCreateDialog}>
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить первый товар
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="blog" className="mt-6">
            <div className="flex justify-end mb-6">
              <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openCreatePostDialog}>
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить пост
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPost ? 'Редактировать пост' : 'Новый пост'}
                    </DialogTitle>
                    <DialogDescription>
                      Заполните информацию о посте блога
                    </DialogDescription>
                  </DialogHeader>
                  <BlogPostForm
                    post={editingPost}
                    onSave={handleSavePost}
                    onCancel={() => setIsPostDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription>{post.category} · {post.read_time}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditPostDialog(post)}
                        className="flex-1"
                      >
                        <Icon name="Edit" size={16} className="mr-1" />
                        Изменить
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        className="flex-1"
                      >
                        <Icon name="Trash2" size={16} className="mr-1" />
                        Удалить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {blogPosts.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Icon name="FileText" size={48} className="mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground mb-4">
                    Постов пока нет
                  </p>
                  <Button onClick={openCreatePostDialog}>
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить первый пост
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="prices" className="mt-6">
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
                    <CardDescription>Базовые цены и модификаторы размеров</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prices.calculator_prices?.map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
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

          <TabsContent value="settings" className="mt-6">
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

function BlogPostForm({
  post,
  onSave,
  onCancel,
}: {
  post: BlogPost | null;
  onSave: (formData: FormData) => void;
  onCancel: () => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="post-title">Заголовок</Label>
        <Input
          id="post-title"
          name="title"
          defaultValue={post?.title}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={post?.slug}
          placeholder="primer-slug-posta"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="post-category">Категория</Label>
        <Select name="category" defaultValue={post?.category || 'Меню'}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Меню">Меню</SelectItem>
            <SelectItem value="Папки">Папки</SelectItem>
            <SelectItem value="Корочки">Корочки</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Краткое описание</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          defaultValue={post?.excerpt}
          rows={2}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Содержание (HTML)</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={post?.content}
          rows={8}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="post-image">URL изображения</Label>
        <Input
          id="post-image"
          name="image"
          type="url"
          defaultValue={post?.image}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="read-time">Время чтения</Label>
        <Input
          id="read-time"
          name="read_time"
          defaultValue={post?.read_time || '5 мин'}
          placeholder="5 мин"
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Сохранить
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Отмена
        </Button>
      </div>
    </form>
  );
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product | null;
  onSave: (formData: FormData) => void;
  onCancel: () => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Название</Label>
        <Input
          id="title"
          name="title"
          defaultValue={product?.title}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Категория</Label>
        <Select name="category" defaultValue={product?.category || 'menu'}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="menu">Меню</SelectItem>
            <SelectItem value="folder">Папка</SelectItem>
            <SelectItem value="cover">Корочки</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Цена</Label>
        <Input
          id="price"
          name="price"
          defaultValue={product?.price}
          placeholder="от 1500 ₽"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL изображения</Label>
        <Input
          id="image"
          name="image"
          type="url"
          defaultValue={product?.image}
          placeholder="https://..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Особенности (по одной на строку)</Label>
        <Textarea
          id="features"
          name="features"
          defaultValue={product?.features.join('\n')}
          rows={4}
          placeholder="Золотое тиснение&#10;Премиум материал"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="materials">Материалы (по одному на строку)</Label>
        <Textarea
          id="materials"
          name="materials"
          defaultValue={product?.materials.join('\n')}
          rows={3}
          placeholder="Премиум материал&#10;Золотое тиснение"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sizes">Размеры (по одному на строку)</Label>
        <Textarea
          id="sizes"
          name="sizes"
          defaultValue={product?.sizes.join('\n')}
          rows={2}
          placeholder="А4 (210×297мм)&#10;А5 (148×210мм)"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Сохранить
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Отмена
        </Button>
      </div>
    </form>
  );
}
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const PRODUCTS_API = 'https://functions.poehali.dev/65b050bc-83c5-4cd4-abc4-6d565bbe765e';

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

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadProducts();
  }, [navigate]);

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
        setIsDialogOpen(false);
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

  const openCreateDialog = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
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
          <div className="flex gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  onCancel={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={20} className="mr-2" />
              Выйти
            </Button>
          </div>
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
      </div>
    </div>
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

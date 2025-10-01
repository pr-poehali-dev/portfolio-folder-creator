import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Изображение товара' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        setPreview(base64);

        const response = await fetch('https://functions.poehali.dev/abfee7f9-505f-471c-b604-dcb1f8f995a9', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64,
            filename: file.name
          })
        });

        if (!response.ok) {
          throw new Error('Ошибка загрузки');
        }

        const data = await response.json();
        onChange(data.url);
        setPreview(data.url);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Ошибка загрузки изображения');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="flex items-start gap-4">
        {preview && (
          <div className="relative w-32 h-32 rounded-lg border-2 border-gray-200 overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Icon name={uploading ? 'Loader2' : 'Upload'} size={16} className={uploading ? 'animate-spin' : ''} />
            {uploading ? 'Загрузка...' : 'Выбрать файл'}
          </button>
          
          {!preview && (
            <p className="text-sm text-gray-500">
              Или введите URL изображения ниже
            </p>
          )}
        </div>
      </div>

      <input
        type="url"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setPreview(e.target.value);
        }}
        placeholder="https://example.com/image.jpg"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
      />
    </div>
  );
}

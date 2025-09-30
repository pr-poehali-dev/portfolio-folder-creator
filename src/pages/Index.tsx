import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Book {
  id: number;
  title: string;
  image: string;
  description: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Пиратский дневник",
    image: "https://cdn.poehali.dev/files/2aa0ba53-f41b-4a2f-bc39-a20747d14638.jpg",
    description: "Захватывающие истории о морских приключениях и сокровищах"
  },
  {
    id: 2,
    title: "Menu",
    image: "https://cdn.poehali.dev/files/654a54c8-3e46-42bb-a05d-3f2fcb803da8.jpg",
    description: "Изысканное морское меню с традиционными рецептами"
  },
  {
    id: 3,
    title: "Корабль",
    image: "https://cdn.poehali.dev/files/0a87c9a0-2d65-4120-af0c-acc1a212edd1.jpg",
    description: "История великих парусных судов"
  },
  {
    id: 4,
    title: "Парусник FARGE",
    image: "https://cdn.poehali.dev/files/d8901404-77f4-45ac-9825-c975d8152a35.jpg",
    description: "Легендарное судно с богатой историей"
  },
  {
    id: 5,
    title: "Menu Paris",
    image: "https://cdn.poehali.dev/files/1a5f4f2c-a968-49c1-b10d-14434f34a1bc.jpg",
    description: "Парижская гастрономия в элегантном оформлении"
  },
  {
    id: 6,
    title: "Архитектура",
    image: "https://cdn.poehali.dev/files/8964ce2d-5e1e-4d90-b74d-c8bd0a981649.jpg",
    description: "Величественные строения золотого века"
  },
  {
    id: 7,
    title: "Грибное меню",
    image: "https://cdn.poehali.dev/files/994cfb02-b2ff-4a9c-b2d4-d0ac6cd04046.jpg",
    description: "Кулинарные секреты лесных даров"
  },
  {
    id: 8,
    title: "Восточный дракон",
    image: "https://cdn.poehali.dev/files/a8b1995a-ff21-4120-8eeb-db1910d97ae6.jpg",
    description: "Мифология и легенды востока"
  },
  {
    id: 9,
    title: "НЕГАСАОГЕ",
    image: "https://cdn.poehali.dev/files/2a69d09f-812c-4e53-a721-97813f5e3781.jpg",
    description: "Тайны древних цивилизаций"
  },
  {
    id: 10,
    title: "Королевское меню",
    image: "https://cdn.poehali.dev/files/88abf1ab-defb-4733-a676-821d074aa2d8.jpg",
    description: "Рецепты королевских банкетов"
  },
  {
    id: 11,
    title: "Флоральное меню",
    image: "https://cdn.poehali.dev/files/4538f55e-ea36-4043-8200-12cee39f756b.jpg",
    description: "Изысканные блюда с цветочными мотивами"
  },
  {
    id: 12,
    title: "Классика",
    image: "https://cdn.poehali.dev/files/2990bad5-aed1-49e4-ba93-bce7469f338a.jpg",
    description: "Вечная элегантность в каждой детали"
  }
];

export default function Index() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="py-8 px-4 sm:px-6 lg:px-8 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-500 text-center tracking-wide">
            Винтажная библиотека
          </h1>
          <p className="text-slate-300 text-center mt-4 text-lg">
            Коллекция редких книг с изысканными обложками
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="group cursor-pointer"
              onClick={() => setSelectedBook(book)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-amber-500/30">
                <div className="aspect-[3/4] bg-slate-800">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-amber-400 font-bold text-lg mb-1">{book.title}</h3>
                    <p className="text-slate-200 text-sm">{book.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedBook && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-800 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 z-10 bg-slate-900/80 hover:bg-slate-900 text-amber-400 rounded-full p-2 transition-colors duration-300"
            >
              <Icon name="X" size={24} />
            </button>
            
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-slate-900 p-8 flex items-center justify-center">
                <img
                  src={selectedBook.image}
                  alt={selectedBook.title}
                  className="w-full max-w-sm rounded-lg shadow-2xl"
                />
              </div>
              
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-amber-400 mb-4">
                  {selectedBook.title}
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  {selectedBook.description}
                </p>
                
                <div className="space-y-3 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Icon name="BookOpen" size={20} className="text-amber-500" />
                    <span>Раритетное издание</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Star" size={20} className="text-amber-500" />
                    <span>Коллекционная ценность</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Award" size={20} className="text-amber-500" />
                    <span>Уникальное оформление</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
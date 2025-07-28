import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would handle the form submission
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-montserrat font-bold text-2xl text-gray-900">
            WSE.AM
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="font-opensans text-gray-600 hover:text-primary transition-colors">О нас</a>
            <a href="#services" className="font-opensans text-gray-600 hover:text-primary transition-colors">Услуги</a>
            <a href="#contact" className="font-opensans text-gray-600 hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90 text-white font-opensans">
            Заявка
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-montserrat font-bold text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
              Агентство недвижимости <span className="text-primary">в Ереване</span>
            </h1>
            <p className="font-opensans text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              WSE.AM — помогаем релокантам из России находить идеальное жильё для жизни и отдыха в Армении с 2023 года
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-opensans px-8 py-3">
                <Icon name="Home" size={20} className="mr-2" />
                Найти жильё
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 font-opensans px-8 py-3">
                <Icon name="Phone" size={20} className="mr-2" />
                Консультация
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-montserrat font-bold text-primary mb-2">1000+</div>
              <div className="font-opensans text-gray-600">Довольных клиентов</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-montserrat font-bold text-primary mb-2">2023</div>
              <div className="font-opensans text-gray-600">Год основания</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-montserrat font-bold text-primary mb-2">100%</div>
              <div className="font-opensans text-gray-600">Поддержка сделок</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl text-gray-900 mb-6">
              Почему выбирают нас
            </h2>
            <p className="font-opensans text-lg text-gray-600">
              Мы знаем все тонкости рынка недвижимости Еревана и понимаем потребности релокантов
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <CardTitle className="font-montserrat text-xl">Опытные агенты</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-opensans text-center text-gray-600">
                  Внимательные специалисты с глубоким знанием местного рынка недвижимости
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <CardTitle className="font-montserrat text-xl">Проверенная база</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-opensans text-center text-gray-600">
                  Только качественные объекты от надёжных собственников
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Handshake" size={32} className="text-primary" />
                </div>
                <CardTitle className="font-montserrat text-xl">Полная поддержка</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-opensans text-center text-gray-600">
                  Сопровождение на всех этапах сделки и оформление документов
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl text-gray-900 mb-6">
              Наши услуги
            </h2>
            <p className="font-opensans text-lg text-gray-600 max-w-2xl mx-auto">
              Полный спектр услуг для решения любых вопросов с недвижимостью в Ереване
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-gray-200 hover:border-primary/50 transition-colors bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Key" size={24} />
                </div>
                <CardTitle className="font-montserrat text-xl">Аренда жилья</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-opensans text-gray-600">
                  Подбор квартир и домов для краткосрочной и долгосрочной аренды с учётом всех ваших пожеланий
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-primary/50 transition-colors bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Building" size={24} />
                </div>
                <CardTitle className="font-montserrat text-xl">Купля-продажа</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-opensans text-gray-600">
                  Помощь в покупке и продаже недвижимости с полным юридическим сопровождением сделки
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-primary/50 transition-colors bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                  <Icon name="FileText" size={24} />
                </div>
                <CardTitle className="font-montserrat text-xl">Оформление документов</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-opensans text-gray-600">
                  Помощь в оформлении всех необходимых документов и разрешений для сделок с недвижимостью
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-montserrat font-bold text-4xl text-gray-900 mb-6">
                Оставить заявку
              </h2>
              <p className="font-opensans text-lg text-gray-600">
                Расскажите о ваших потребностях, и мы найдём идеальный вариант
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="font-opensans font-medium">Имя *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-2 font-opensans"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-opensans font-medium">Телефон *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-2 font-opensans"
                        placeholder="+374 XX XXX XXX"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-opensans font-medium">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2 font-opensans"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="font-opensans font-medium">Сообщение *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="mt-2 font-opensans min-h-[120px]"
                      placeholder="Расскажите о ваших потребностях: тип жилья, район, бюджет, количество комнат..."
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-opensans"
                  >
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl text-gray-900 mb-6">
              Связаться с нами
            </h2>
            <p className="font-opensans text-lg text-gray-600">
              Выберите удобный способ связи
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border border-gray-200 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Send" size={32} className="text-blue-600" />
                </div>
                <CardTitle className="font-montserrat text-xl">Telegram</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-opensans text-gray-600 mb-4">
                  Быстрая связь и консультации
                </p>
                <Button variant="outline" className="w-full">
                  Написать в Telegram
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border border-gray-200 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Instagram" size={32} className="text-pink-600" />
                </div>
                <CardTitle className="font-montserrat text-xl">Instagram</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-opensans text-gray-600 mb-4">
                  Фото объектов и новости
                </p>
                <Button variant="outline" className="w-full">
                  Перейти в Instagram
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border border-gray-200 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" size={32} className="text-green-600" />
                </div>
                <CardTitle className="font-montserrat text-xl">Офис в Ереване</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-opensans text-gray-600 mb-4">
                  Личные встречи и консультации
                </p>
                <Button variant="outline" className="w-full">
                  Открыть на карте
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="font-montserrat font-bold text-2xl mb-4">WSE.AM</div>
            <p className="font-opensans text-gray-400 mb-6 max-w-2xl mx-auto">
              Агентство недвижимости в Ереване, основанное релокантами из России в 2023 году. 
              Помогаем найти идеальное жильё для жизни и отдыха.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Send" size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Instagram" size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="MapPin" size={24} />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="font-opensans text-gray-400 text-sm">
              © 2024 WSE.AM. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
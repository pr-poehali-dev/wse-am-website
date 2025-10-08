import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface FormData {
  districts: string[];
  propertyType: string[];
  moveInDate: string;
  rentalPeriod: string;
  residents: string;
  withChildren: string;
  withPets: string;
  budget: string;
  rooms: string;
  wishes: string;
  contact: string;
}

const DISTRICTS = [
  'Аван', 'Арабкир', 'Ачапняк', 'Давташен', 'Канакер-Зейтун',
  'Кентрон (Центр)', 'Малатия-Себастия', 'Нор-Норк', 'Норк-Мараш',
  'Шенгавит', 'Эребуни'
];

export default function Index() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    districts: [],
    propertyType: [],
    moveInDate: '',
    rentalPeriod: '',
    residents: '',
    withChildren: '',
    withPets: '',
    budget: '',
    rooms: '',
    wishes: '',
    contact: ''
  });
  const [customInput, setCustomInput] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  const totalSteps = 11;
  const progress = (step / totalSteps) * 100;

  const handleMultiSelect = (field: 'districts' | 'propertyType', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSingleSelect = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomInput = (field: keyof FormData) => {
    if (customInput.trim()) {
      if (field === 'districts' || field === 'propertyType') {
        setFormData(prev => ({
          ...prev,
          [field]: [...prev[field as 'districts' | 'propertyType'], customInput]
        }));
      } else {
        setFormData(prev => ({ ...prev, [field]: customInput }));
      }
      setCustomInput('');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return formData.districts.length > 0;
      case 1: return formData.propertyType.length > 0;
      case 2: return formData.moveInDate.trim() !== '';
      case 3: return formData.rentalPeriod !== '';
      case 4: return formData.residents !== '';
      case 5: return formData.withChildren !== '';
      case 6: return formData.withPets !== '';
      case 7: return formData.budget.trim() !== '';
      case 8: return formData.rooms.trim() !== '';
      case 9: return true;
      case 10: return formData.contact.trim() !== '';
      default: return false;
    }
  };

  const nextStep = () => {
    if (canProceed()) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        setShowSummary(true);
      }
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const resetForm = () => {
    setStep(0);
    setShowSummary(false);
    setFormData({
      districts: [],
      propertyType: [],
      moveInDate: '',
      rentalPeriod: '',
      residents: '',
      withChildren: '',
      withPets: '',
      budget: '',
      rooms: '',
      wishes: '',
      contact: ''
    });
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0088cc] to-[#006ba6] flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#0088cc] flex items-center justify-center">
              <Icon name="CheckCircle2" className="text-white" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Ваша заявка готова!</h2>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Районы:</p>
              <p className="font-medium text-gray-800">{formData.districts.join(', ')}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Тип жилья:</p>
              <p className="font-medium text-gray-800">{formData.propertyType.join(', ')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Дата заезда:</p>
                <p className="font-medium text-gray-800">{formData.moveInDate}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Срок аренды:</p>
                <p className="font-medium text-gray-800">{formData.rentalPeriod}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Жильцов:</p>
                <p className="font-medium text-gray-800">{formData.residents}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Дети:</p>
                <p className="font-medium text-gray-800">{formData.withChildren}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Питомцы:</p>
                <p className="font-medium text-gray-800">{formData.withPets}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Бюджет:</p>
                <p className="font-medium text-gray-800">{formData.budget}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Комнат:</p>
                <p className="font-medium text-gray-800">{formData.rooms}</p>
              </div>
            </div>

            {formData.wishes && (
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Пожелания:</p>
                <p className="font-medium text-gray-800">{formData.wishes}</p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Контакт:</p>
              <p className="font-medium text-gray-800">{formData.contact}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={resetForm}
              variant="outline"
              className="flex-1"
            >
              Новая заявка
            </Button>
            <Button 
              onClick={() => alert('В реальном боте здесь была бы отправка в Telegram')}
              className="flex-1 bg-[#0088cc] hover:bg-[#006ba6]"
            >
              <Icon name="Send" className="mr-2" size={18} />
              Отправить
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0088cc] to-[#006ba6] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-t-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center">
                <Icon name="Home" className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">Поиск жилья в Ереване</h1>
                <p className="text-xs text-gray-500">Шаг {step + 1} из {totalSteps + 1}</p>
              </div>
            </div>
            {step > 0 && (
              <Button variant="ghost" size="sm" onClick={prevStep}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
            )}
          </div>
          
          <Progress value={progress} className="h-1 mb-6" />

          <Card className="bg-gray-50 p-6 rounded-xl border-none shadow-inner min-h-[400px] flex flex-col">
            {step === 0 && (
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Выберите район</h3>
                <div className="grid grid-cols-2 gap-2 mb-4 flex-1">
                  {DISTRICTS.map(district => (
                    <Button
                      key={district}
                      variant={formData.districts.includes(district) ? "default" : "outline"}
                      className={`justify-start text-sm h-auto py-3 ${
                        formData.districts.includes(district) 
                          ? 'bg-[#0088cc] text-white hover:bg-[#006ba6]' 
                          : 'bg-white hover:bg-gray-100'
                      }`}
                      onClick={() => handleMultiSelect('districts', district)}
                    >
                      {formData.districts.includes(district) && (
                        <Icon name="Check" size={16} className="mr-2" />
                      )}
                      {district}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <Input
                    placeholder="Или укажите свой вариант"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCustomInput('districts')}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => handleCustomInput('districts')}
                    size="icon"
                    variant="outline"
                  >
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Квартира или дом?</h3>
                <div className="space-y-3 mb-4 flex-1">
                  {['Квартира', 'Дом'].map(type => (
                    <Button
                      key={type}
                      variant={formData.propertyType.includes(type) ? "default" : "outline"}
                      className={`w-full justify-start text-lg h-16 ${
                        formData.propertyType.includes(type)
                          ? 'bg-[#0088cc] text-white hover:bg-[#006ba6]'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                      onClick={() => handleMultiSelect('propertyType', type)}
                    >
                      {formData.propertyType.includes(type) && (
                        <Icon name="Check" size={20} className="mr-2" />
                      )}
                      {type}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <Input
                    placeholder="Или укажите свой вариант"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCustomInput('propertyType')}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => handleCustomInput('propertyType')}
                    size="icon"
                    variant="outline"
                  >
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Дата заезда (приблизительно)</h3>
                <Input
                  type="text"
                  placeholder="Например: 1 декабря 2024"
                  value={formData.moveInDate}
                  onChange={(e) => handleSingleSelect('moveInDate', e.target.value)}
                  className="text-lg h-14"
                />
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Срок аренды</h3>
                <div className="space-y-3 mb-4 flex-1">
                  {['6 месяцев', '1 год'].map(period => (
                    <Button
                      key={period}
                      variant={formData.rentalPeriod === period ? "default" : "outline"}
                      className={`w-full text-lg h-16 ${
                        formData.rentalPeriod === period
                          ? 'bg-[#0088cc] text-white hover:bg-[#006ba6]'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                      onClick={() => handleSingleSelect('rentalPeriod', period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
                <Input
                  placeholder="Или укажите свой срок"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customInput.trim()) {
                      handleSingleSelect('rentalPeriod', customInput);
                      setCustomInput('');
                    }
                  }}
                />
              </div>
            )}

            {step === 4 && (
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Число жильцов</h3>
                <div className="space-y-3 mb-4 flex-1">
                  {['1', '2', '3'].map(num => (
                    <Button
                      key={num}
                      variant={formData.residents === num ? "default" : "outline"}
                      className={`w-full text-lg h-16 ${
                        formData.residents === num
                          ? 'bg-[#0088cc] text-white hover:bg-[#006ba6]'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                      onClick={() => handleSingleSelect('residents', num)}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
                <Input
                  placeholder="Или укажите свой вариант"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customInput.trim()) {
                      handleSingleSelect('residents', customInput);
                      setCustomInput('');
                    }
                  }}
                />
              </div>
            )}

            {step === 5 && (
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Наличие детей</h3>
                <div className="space-y-3">
                  {['С детьми', 'Без детей'].map(option => (
                    <Button
                      key={option}
                      variant={formData.withChildren === option ? "default" : "outline"}
                      className={`w-full text-lg h-16 ${
                        formData.withChildren === option
                          ? 'bg-[#0088cc] text-white hover:bg-[#006ba6]'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                      onClick={() => handleSingleSelect('withChildren', option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Наличие питомцев</h3>
                <div className="space-y-3">
                  {['С питомцами', 'Без питомцев'].map(option => (
                    <Button
                      key={option}
                      variant={formData.withPets === option ? "default" : "outline"}
                      className={`w-full text-lg h-16 ${
                        formData.withPets === option
                          ? 'bg-[#0088cc] text-white hover:bg-[#006ba6]'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                      onClick={() => handleSingleSelect('withPets', option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Максимальный бюджет</h3>
                <p className="text-sm text-gray-500 mb-4">В AMD или USD</p>
                <Input
                  type="text"
                  placeholder="Например: 500 USD или 200,000 AMD"
                  value={formData.budget}
                  onChange={(e) => handleSingleSelect('budget', e.target.value)}
                  className="text-lg h-14"
                />
              </div>
            )}

            {step === 8 && (
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Количество комнат</h3>
                <Input
                  type="text"
                  placeholder="Например: 2"
                  value={formData.rooms}
                  onChange={(e) => handleSingleSelect('rooms', e.target.value)}
                  className="text-lg h-14"
                />
              </div>
            )}

            {step === 9 && (
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ваши пожелания</h3>
                <p className="text-sm text-gray-500 mb-4">Все, что считаете важным</p>
                <Textarea
                  placeholder="Опишите ваши пожелания..."
                  value={formData.wishes}
                  onChange={(e) => handleSingleSelect('wishes', e.target.value)}
                  className="flex-1 min-h-[200px] resize-none"
                />
              </div>
            )}

            {step === 10 && (
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Как с вами связаться?</h3>
                <p className="text-sm text-gray-500 mb-4">Укажите номер телефона или ник Telegram</p>
                <Input
                  type="text"
                  placeholder="Например: +374 99 123456 или @username"
                  value={formData.contact}
                  onChange={(e) => handleSingleSelect('contact', e.target.value)}
                  className="text-lg h-14"
                />
              </div>
            )}
          </Card>
        </div>

        <div className="bg-white rounded-b-2xl p-4 shadow-lg">
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="w-full h-12 bg-[#0088cc] hover:bg-[#006ba6] text-white text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === totalSteps ? 'Завершить' : 'Далее'}
            <Icon name="ArrowRight" className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

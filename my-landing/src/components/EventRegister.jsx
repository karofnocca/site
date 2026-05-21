import React, { useState, useEffect } from 'react';

// ВСТАВЬТЕ СЮДА URL ИЗ ШАГА 1 (для новой таблицы)
const SCRIPT_URL = 'ВАШ_НОВЫЙ_URL_APPS_SCRIPT'; 

const EventRegister = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: ''
  });

  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('eventRegistered');
    if (status) setIsSubmitted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Пожалуйста, введите ваше имя';
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Введите ваш Email';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Введите корректный адрес почты';
    }

    if (!formData.guests.trim()) {
      newErrors.guests = 'Укажите количество гостей';
    } else if (isNaN(formData.guests) || parseInt(formData.guests) < 1) {
      newErrors.guests = 'Введите число гостей';
    }

    if (!agreed) newErrors.agreed = 'Необходимо подтвердить согласие';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      localStorage.setItem('eventRegistered', 'true');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка отправки:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="w-full bg-white py-20 px-6 font-['Articulat_CF_Normal'] text-center">
        <h2 className="font-['Bicubik'] text-[40px] uppercase mb-4 text-[#FF4F01]">Готово!</h2>
        <p className="text-xl text-[#2D2D2D]">Вы успешно зарегистрированы на мероприятие.</p>
      </section>
    );
  }

  const ErrorMsg = ({ name }) => (
    errors[name] ? <span className="text-red-500 text-[12px] mt-1 font-bold">{errors[name]}</span> : null
  );

  return (
    <section className="w-full bg-white py-20 px-6 font-['Articulat_CF_Normal']">
      <div className="max-w-[800px] mx-auto">
        
        {/* ЗАГОЛОВОК С ФИКСИРОВАННЫМ ПЕРЕНОСОМ */}
        <h2 className="font-['Bicubik'] text-[40px] md:text-[70px] leading-[1.1] md:leading-none text-center uppercase mb-12 text-[#2D2D2D]">
          Регистрация <br /> на мероприятие
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex flex-col">
            <label className="text-[16px] font-bold mb-2">Имя</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              type="text" 
              className={`w-full h-12 border px-4 outline-none rounded-[4px] transition-colors ${errors.name ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} 
            />
            <ErrorMsg name="name" />
          </div>

          <div className="flex flex-col">
            <label className="text-[16px] font-bold mb-2">Email</label>
            <input 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              type="email" 
              className={`w-full h-12 border px-4 outline-none rounded-[4px] transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} 
            />
            <ErrorMsg name="email" />
          </div>

          <div className="flex flex-col">
            <label className="text-[16px] font-bold mb-2">Количество гостей</label>
            <input 
              name="guests" 
              value={formData.guests} 
              onChange={handleChange} 
              type="text" 
              className={`w-full h-12 border px-4 outline-none rounded-[4px] transition-colors ${errors.guests ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} 
            />
            <ErrorMsg name="guests" />
          </div>

          <div className="pt-4 flex flex-col items-center">
            <div className="flex items-center gap-4">
              <input 
                checked={agreed} 
                onChange={() => {setAgreed(!agreed); if(errors.agreed){const n={...errors}; delete n.agreed; setErrors(n);}}} 
                type="checkbox" 
                id="reg-agreement" 
                className={`w-6 h-6 accent-[#FF4F01] cursor-pointer ${errors.agreed ? 'outline outline-2 outline-red-500' : ''}`} 
              />
              <label htmlFor="reg-agreement" className={`text-[24px] select-none cursor-pointer ${errors.agreed ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                Согласен на обработку персональных данных
              </label>
            </div>
            <ErrorMsg name="agreed" />
          </div>

          <div className="flex justify-center pt-6">
            <button 
              disabled={isLoading}
              type="submit"
              className="w-full md:w-[400px] bg-[#FF4F01] text-white py-5 px-10 rounded-[4px] text-[18px] font-bold uppercase transition-all hover:bg-[#E04500] disabled:bg-gray-400 active:scale-95 shadow-md"
            >
              {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default EventRegister;
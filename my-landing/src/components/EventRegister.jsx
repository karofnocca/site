import React, { useState, useEffect } from 'react';

// Убедитесь, что этот URL ведет на развернутый скрипт нужной таблицы
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzkwXDY1YCng5ikvHqif80dJarkscpl1mbU7N1mTXOkIpAo-4vSOjP1WLmHcBIVP-R8/exec'; 

const EventRegister = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  
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
    setServerError('');
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.name.trim()) newErrors.name = 'Введите ваше имя';
    if (!formData.email.trim()) {
      newErrors.email = 'Введите Email';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Некорректный Email';
    }
    if (!formData.guests.trim()) {
      newErrors.guests = 'Укажите число гостей';
    }
    if (!agreed) newErrors.agreed = 'Нужно ваше согласие';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const registeredEmails = JSON.parse(localStorage.getItem('registered_emails') || "[]");
    if (registeredEmails.includes(formData.email.toLowerCase().trim())) {
      setServerError('Вы уже зарегистрированы с этой почтой.');
      return;
    }

    setIsLoading(true);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          "Дата": new Date().toLocaleString()
        })
      });

      const newEmails = [...registeredEmails, formData.email.toLowerCase().trim()];
      localStorage.setItem('registered_emails', JSON.stringify(newEmails));
      localStorage.setItem('eventRegistered', 'true');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка:', error);
      setServerError('Ошибка при отправке. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="w-full bg-white py-24 px-6 font-['Articulat_CF_Normal'] text-center animate-in fade-in zoom-in duration-500">
        <div className="max-w-[700px] mx-auto bg-[#FDF2ED] p-12 rounded-2xl border-2 border-[#FF4F01]/20">
          <div className="w-20 h-20 bg-[#FF4F01] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 className="font-['Bicubik'] text-[40px] md:text-[50px] uppercase mb-4 text-[#FF4F01]">Вы записаны!</h2>
          <p className="text-xl text-[#2D2D2D]">Данные успешно отправлены. Ждем вас на мероприятии!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="event-register" className="w-full bg-white py-20 px-6 font-['Articulat_CF_Normal']">
      <div className="max-w-[800px] mx-auto">
        <h2 className="font-['Bicubik'] text-[40px] md:text-[60px] lg:text-[70px] leading-tight text-center uppercase mb-12 text-[#2D2D2D]">
          Регистрация <br /> на мероприятие
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-[18px] font-bold mb-2">Ваше имя</label>
            <input name="name" placeholder="Иван Иванов" value={formData.name} onChange={handleChange} className={`w-full h-14 border px-5 rounded-[8px] outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} />
            {errors.name && <span className="text-red-500 text-[13px] mt-1 font-bold">{errors.name}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[18px] font-bold mb-2">Электронная почта</label>
            <input name="email" type="email" placeholder="example@mail.ru" value={formData.email} onChange={handleChange} className={`w-full h-14 border px-5 rounded-[8px] outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} />
            {errors.email && <span className="text-red-500 text-[13px] mt-1 font-bold">{errors.email}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[18px] font-bold mb-2">Количество гостей</label>
            <input name="guests" type="number" min="1" placeholder="1" value={formData.guests} onChange={handleChange} className={`w-full h-14 border px-5 rounded-[8px] outline-none transition-all ${errors.guests ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} />
            {errors.guests && <span className="text-red-500 text-[13px] mt-1 font-bold">{errors.guests}</span>}
          </div>

          {/* ИСПРАВЛЕННЫЙ ЧЕКБОКС: Теперь кликабельный всегда */}
          <div className="pt-4 flex flex-col items-center">
            <label className="flex items-start gap-4 cursor-pointer max-w-fit">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (errors.agreed) {
                    const n = {...errors};
                    delete n.agreed;
                    setErrors(n);
                  }
                }} 
                className="w-7 h-7 accent-[#FF4F01] mt-1 flex-shrink-0 cursor-pointer" 
              />
              <span className={`text-[18px] md:text-[22px] leading-tight select-none ${errors.agreed ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                Согласен на обработку персональных данных
              </span>
            </label>
            {errors.agreed && <span className="text-red-500 text-[13px] mt-2 font-bold">{errors.agreed}</span>}
          </div>

          {serverError && <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center font-bold border border-red-200">{serverError}</div>}

          <div className="flex justify-center pt-6">
            <button disabled={isLoading} type="submit" className="w-full md:w-[450px] bg-[#FF4F01] text-white py-5 px-10 rounded-[8px] text-[20px] font-bold uppercase transition-all hover:bg-[#E04500] disabled:bg-gray-400 active:scale-95 shadow-lg flex items-center justify-center gap-3">
              {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EventRegister;
import React, { useState, useEffect } from 'react';

// --- НАСТРОЙКИ TELEGRAM ---
const TG_TOKEN = '8883123351:AAG3V13aULv0dCU0v30G9LgG8EjmKyLqzI4'; 
const TG_CHAT_IDS = ['7052820465', '893865585']; 

const EventRegister = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1'
  });

  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  // Проверка, не регистрировался ли уже пользователь (в этом браузере)
  useEffect(() => {
    const status = localStorage.getItem('eventRegistered');
    if (status) setIsSubmitted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setServerError('');
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.name.trim()) newErrors.name = 'Введите ваше имя';
    if (!emailPattern.test(formData.email)) newErrors.email = 'Некорректный Email';
    if (!formData.guests || formData.guests < 1) newErrors.guests = 'Укажите число гостей';
    if (!agreed) newErrors.agreed = 'Нужно ваше согласие';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Проверка на дубликат почты в локальном хранилище
    const registeredEmails = JSON.parse(localStorage.getItem('registered_emails') || "[]");
    if (registeredEmails.includes(formData.email.toLowerCase().trim())) {
      setServerError('Вы уже зарегистрированы с этой почтой.');
      return;
    }

    setIsLoading(true);
    try {
      // ПОДГОТОВКА СООБЩЕНИЯ
      const message = `
🔔 <b>НОВАЯ РЕГИСТРАЦИЯ!</b>
👤 <b>Имя:</b> ${formData.name}
📧 <b>Email:</b> ${formData.email}
👥 <b>Гостей:</b> ${formData.guests}
📅 <b>Дата:</b> ${new Date().toLocaleString()}
      `;

      // ОТПРАВКА В TELEGRAM (цикл по всем ID)
      for (const chatId of TG_CHAT_IDS) {
        await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
          })
        });
      }

      // Сохраняем данные об успешной регистрации
      const newEmails = [...registeredEmails, formData.email.toLowerCase().trim()];
      localStorage.setItem('registered_emails', JSON.stringify(newEmails));
      localStorage.setItem('eventRegistered', 'true');
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка отправки в ТГ:', error);
      setServerError('Произошла ошибка. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="w-full bg-white py-24 px-6 text-center animate-in fade-in zoom-in duration-500 font-sans">
        <div className="max-w-[700px] mx-auto bg-[#FDF2ED] p-12 rounded-2xl border-2 border-[#FF4F01]/20 shadow-sm">
          <div className="w-20 h-20 bg-[#FF4F01] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-[40px] md:text-[50px] font-bold uppercase mb-4 text-[#FF4F01]">Вы записаны!</h2>
          <p className="text-xl text-[#2D2D2D]">Ваши данные успешно отправлены. До встречи на мероприятии!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="event-register" className="w-full bg-white py-20 px-6 font-sans">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-[40px] md:text-[60px] font-bold text-center uppercase mb-12 text-[#2D2D2D] leading-tight">
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
            <input name="guests" type="number" min="1" value={formData.guests} onChange={handleChange} className={`w-full h-14 border px-5 rounded-[8px] outline-none transition-all ${errors.guests ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} />
            {errors.guests && <span className="text-red-500 text-[13px] mt-1 font-bold">{errors.guests}</span>}
          </div>

          <div className="pt-4 flex flex-col items-center">
            <label className="flex items-start gap-4 cursor-pointer max-w-fit">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                className="w-7 h-7 accent-[#FF4F01] mt-1 flex-shrink-0 cursor-pointer" 
              />
              <span className={`text-[18px] md:text-[22px] leading-tight select-none ${errors.agreed ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                Согласен на <a href="/dock.docx" onClick={(e) => e.stopPropagation()} target="_blank" className="underline hover:text-[#FF4F01]">обработку персональных данных</a>
              </span>
            </label>
            {errors.agreed && <span className="text-red-500 text-[13px] mt-2 font-bold">{errors.agreed}</span>}
          </div>

          {serverError && <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center font-bold border border-red-200">{serverError}</div>}

          <div className="flex justify-center pt-6">
            <button disabled={isLoading} type="submit" className="w-full md:w-[450px] bg-[#FF4F01] text-white py-5 px-10 rounded-[8px] text-[20px] font-bold uppercase transition-all hover:bg-[#E04500] disabled:bg-gray-400 active:scale-95 shadow-lg flex items-center justify-center gap-3">
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EventRegister;
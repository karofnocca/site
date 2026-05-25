import React, { useState } from 'react';

// --- НАСТРОЙКИ TELEGRAM (ПОДКЛЮЧЕНО) ---
const TG_TOKEN = '8887185656:AAEB4eMUSrStthEUK4O7pGIF2VBjtzZQclc'; 
const TG_CHAT_IDS = ['7052820465', '893865585']; 

const ResumeForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', email: '', resume: '' });
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) newErrors.name = 'Введите имя';
    if (!emailPattern.test(formData.email)) newErrors.email = 'Некорректный Email';
    if (!formData.resume.trim()) newErrors.resume = 'Укажите ссылку на резюме';
    if (!agreed) newErrors.agreed = 'Нужно согласие';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // ПОДГОТОВКА ТЕКСТА
      const message = `
📄 <b>НОВОЕ РЕЗЮМЕ!</b>
👤 <b>Имя:</b> ${formData.name}
📧 <b>Email:</b> ${formData.email}
🔗 <b>Резюме:</b> ${formData.resume}
📅 <b>Дата:</b> ${new Date().toLocaleString()}
      `;

      // ОТПРАВКА В TELEGRAM ВСЕМ ПОЛУЧАТЕЛЯМ
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

      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка отправки резюме в ТГ:', error);
      alert('Произошла ошибка. Попробуйте еще раз или свяжитесь с нами напрямую.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="w-full py-24 px-6 text-center animate-in fade-in zoom-in duration-500 font-sans">
        <div className="max-w-[700px] mx-auto bg-[#FDF2ED] p-12 rounded-2xl border-2 border-[#FF4F01]/20 shadow-sm">
          <div className="w-20 h-20 bg-[#FF4F01] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-['Bicubik'] text-[40px] uppercase mb-4 text-[#FF4F01]">Резюме принято!</h2>
          <p className="text-xl font-['Articulat_CF_Normal'] text-[#2D2D2D]">Ваше резюме успешно получено. Мы изучим его и свяжемся с вами в ближайшее время.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 px-6 font-['Articulat_CF_Normal']">
      <div className="max-w-[800px] mx-auto">
        <h2 className="font-['Bicubik'] text-[48px] md:text-[72px] leading-none text-center uppercase mb-16 text-[#2D2D2D]">
          ОТПРАВИТЬ <br/> РЕЗЮМЕ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col">
            <label className="text-[20px] font-bold mb-2">Имя</label>
            <input 
              name="name" 
              placeholder="Иван Иванов"
              value={formData.name} 
              onChange={handleChange} 
              className={`h-14 border-2 border-black px-4 rounded-[4px] outline-none focus:border-[#FF4F01] transition-colors ${errors.name && 'border-red-500 bg-red-50'}`} 
            />
            {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[20px] font-bold mb-2">Email</label>
            <input 
              name="email" 
              placeholder="example@mail.ru"
              value={formData.email} 
              onChange={handleChange} 
              className={`h-14 border-2 border-black px-4 rounded-[4px] outline-none focus:border-[#FF4F01] transition-colors ${errors.email && 'border-red-500 bg-red-50'}`} 
            />
            {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[20px] font-bold mb-2">Резюме (PDF или ссылка)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
              </span>
              <input 
                name="resume" 
                placeholder="Вставьте ссылку на файл" 
                value={formData.resume} 
                onChange={handleChange} 
                className={`w-full h-14 border-2 border-black pl-12 pr-4 rounded-[4px] outline-none focus:border-[#FF4F01] transition-colors ${errors.resume && 'border-red-500 bg-red-50'}`} 
              />
            </div>
            {errors.resume && <span className="text-red-500 text-sm mt-1">{errors.resume}</span>}
          </div>

          <div className="flex flex-col items-center pt-4">
            <label className="flex items-center gap-4 cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={() => setAgreed(!agreed)} 
                className="w-7 h-7 accent-[#FF4F01] cursor-pointer" 
              />
              <span className={`text-[18px] md:text-[20px] select-none ${errors.agreed ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                Согласен на <a href="/dock.docx" onClick={(e) => e.stopPropagation()}  target="_blank" className="underline hover:text-[#FF4F01] transition-colors">обработку персональных данных</a>
              </span>            
            </label>
            {errors.agreed && <span className="text-red-500 text-sm mt-2 font-bold">{errors.agreed}</span>}
          </div>

          <div className="flex justify-center pt-4">
            <button 
              disabled={isLoading}
              className="w-full md:w-[400px] bg-[#FF4F01] text-white py-5 text-[20px] font-bold uppercase rounded-[4px] hover:bg-[#E04500] disabled:bg-gray-400 transition-all active:scale-95 shadow-lg flex items-center justify-center"
            >
              {isLoading ? 'Отправка...' : 'Отправить'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResumeForm;
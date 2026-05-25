import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// --- НАСТРОЙКИ (ВСЁ ПОДКЛЮЧЕНО) ---
const TG_TOKEN = '8909538314:AAEkr3P9BxSe0YiiGLdIEpMiChdTaJJen2M'; 
const TG_CHAT_IDS = ['893865585', '7052820465'];

const EMAIL_SERVICE_ID = 'service_pm77zif'; 
const EMAIL_TEMPLATE_ID = 'template_rr0sea4';
const EMAIL_PUBLIC_KEY = 'U7ntd953-PYPBxSZC';

const UploadForm = () => {
  const fileInputRef = useRef(null);
  const portfolioFileRef = useRef(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyExistsError, setAlreadyExistsError] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    experience: '',
    portfolio: '',
    fileName: '',
    portfolioFileName: ''
  });

  const [fileObjects, setFileObjects] = useState({
    mainFile: null,
    portfolioFile: null
  });

  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  // 1. ПРОВЕРКА LOCAL STORAGE НА ПОВТОРНУЮ ОТПРАВКУ
  useEffect(() => {
    const submittedEmails = JSON.parse(localStorage.getItem('submitted_emails') || "[]");
    if (formData.email && submittedEmails.includes(formData.email.toLowerCase().trim())) {
      setAlreadyExistsError(true);
    } else {
      setAlreadyExistsError(false);
    }
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, fileName: file.name });
      setFileObjects({ ...fileObjects, mainFile: file });
      if (errors.fileName) {
        const newErrors = { ...errors };
        delete newErrors.fileName;
        setErrors(newErrors);
      }
    }
  };

  const handlePortfolioFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, portfolioFileName: file.name });
      setFileObjects({ ...fileObjects, portfolioFile: file });
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'Введите имя';
    if (!emailPattern.test(formData.email)) newErrors.email = 'Некорректный Email';
    if (!formData.profession.trim()) newErrors.profession = 'Укажите профессию';
    if (!formData.experience.trim()) newErrors.experience = 'Опишите опыт';
    if (!formData.fileName) newErrors.fileName = 'Загрузите файл проекта';
    if (!agreed) newErrors.agreed = 'Нужно согласие';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || alreadyExistsError) return;

    setIsLoading(true);

    try {
      const caption = `
🚀 <b>НОВАЯ РАБОТА НА КОНКУРС!</b>
👤 <b>Имя:</b> ${formData.name}
📧 <b>Email:</b> ${formData.email}
🛠 <b>Профессия:</b> ${formData.profession}
💼 <b>Опыт:</b> ${formData.experience}
🔗 <b>Ссылка на портфолио:</b> ${formData.portfolio || 'Не указана'}
      `;

      // 2. ОТПРАВКА В TELEGRAM (ВСЕМ АДМИНАМ)
      for (const chatId of TG_CHAT_IDS) {
        // Если есть ДВА файла (основной + портфолио) — шлем альбомом
        if (fileObjects.portfolioFile) {
          const albumData = new FormData();
          albumData.append('chat_id', chatId);
          albumData.append('media', JSON.stringify([
            { type: 'document', media: 'attach://main', caption: caption, parse_mode: 'HTML' },
            { type: 'document', media: 'attach://port' }
          ]));
          albumData.append('main', fileObjects.mainFile);
          albumData.append('port', fileObjects.portfolioFile);

          await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMediaGroup`, {
            method: 'POST',
            body: albumData
          });
        } 
        // Если только ОДИН файл
        else {
          const singleData = new FormData();
          singleData.append('chat_id', chatId);
          singleData.append('document', fileObjects.mainFile);
          singleData.append('caption', caption);
          singleData.append('parse_mode', 'HTML');

          await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendDocument`, {
            method: 'POST',
            body: singleData
          });
        }
      }

      // 3. ОТПРАВКА ПИСЬМА ПОЛЬЗОВАТЕЛЮ (EMAILJS)
      await emailjs.send(
        EMAIL_SERVICE_ID, 
        EMAIL_TEMPLATE_ID, 
        {
          name: formData.name,
          email: formData.email,
          profession: formData.profession,
          experience: formData.experience,
          portfolio: formData.portfolio || 'Не указана'
        }, 
        EMAIL_PUBLIC_KEY
      );

      // 4. СОХРАНЕНИЕ В LOCAL STORAGE
      const submittedEmails = JSON.parse(localStorage.getItem('submitted_emails') || "[]");
      const newEmails = [...submittedEmails, formData.email.toLowerCase().trim()];
      localStorage.setItem('submitted_emails', JSON.stringify(newEmails));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const ErrorMsg = ({ name }) => (
    errors[name] ? <span className="text-red-500 text-[13px] mt-1 font-bold">{errors[name]}</span> : null
  );

  if (isSubmitted) {
    return (
      <div className="max-w-[700px] mx-auto bg-[#FDF2ED] p-12 rounded-2xl text-center border-2 border-[#FF4F01]/20 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-[#FF4F01] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h2 className="text-[40px] font-bold text-[#FF4F01] uppercase mb-4">Работа принята!</h2>
        <p className="text-xl text-gray-700">Ваш проект успешно загружен. Мы отправили подтверждение вам на почту!</p>
      </div>
    );
  }

  return (
    <section id="upload-form" className="w-full py-10 px-6 font-sans bg-white">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-[32px] md:text-[50px] font-bold text-center uppercase mb-12">Загрузить работу</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="font-bold mb-2">Ваше имя</label>
            <input name="name" value={formData.name} onChange={handleChange} className={`w-full h-14 border px-5 rounded-lg outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} />
            <ErrorMsg name="name" />
          </div>

          <div className="flex flex-col">
            <label className="font-bold mb-2">Email</label>
            <input name="email" value={formData.email} onChange={handleChange} className={`w-full h-14 border px-5 rounded-lg outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} />
            <ErrorMsg name="email" />
            {alreadyExistsError && <span className="text-orange-600 text-[13px] mt-1 font-bold text-center">Вы уже отправляли работу с этой почты</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-bold mb-2">Профессия</label>
              <input name="profession" value={formData.profession} onChange={handleChange} className={`w-full h-14 border px-5 rounded-lg outline-none transition-all ${errors.profession ? 'border-red-500' : 'border-black focus:border-[#FF4F01]'}`} />
              <ErrorMsg name="profession" />
            </div>
            <div className="flex flex-col">
              <label className="font-bold mb-2">Опыт работы</label>
              <input name="experience" value={formData.experience} onChange={handleChange} className={`w-full h-14 border px-5 rounded-lg outline-none transition-all ${errors.experience ? 'border-red-500' : 'border-black focus:border-[#FF4F01]'}`} />
              <ErrorMsg name="experience" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-bold mb-2">Файл с работой (png, jpg, pdf)</label>
            <div onClick={() => fileInputRef.current.click()} className={`w-full h-14 border rounded-lg px-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${errors.fileName ? 'border-red-500' : 'border-black'}`}>
              <span className="truncate text-gray-500">{formData.fileName || '📎 Нажмите, чтобы выбрать файл проекта'}</span>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".png,.jpg,.pdf" />
            </div>
            <ErrorMsg name="fileName" />
          </div>

          <div className="p-6 bg-gray-50 rounded-xl space-y-4 border-l-4 border-[#FF4F01]">
            <h3 className="font-bold text-lg">Портфолио <span className="text-gray-400 font-normal">(необязательно)</span></h3>
            <input name="portfolio" placeholder="Ссылка на Behance / Dribbble / Сайт..." value={formData.portfolio} onChange={handleChange} className="w-full h-14 border border-black rounded-lg px-4 bg-white outline-none focus:border-[#FF4F01]" />
            
            <div className="flex items-center gap-4 text-gray-400 py-2">
                <div className="h-[1px] bg-gray-300 flex-1"></div>
                <span className="text-xs font-bold">ИЛИ</span>
                <div className="h-[1px] bg-gray-300 flex-1"></div>
            </div>

            <div onClick={() => portfolioFileRef.current.click()} className="w-full h-14 border border-black rounded-lg px-4 flex items-center cursor-pointer bg-white hover:bg-gray-50 transition-colors">
               <span className="truncate text-gray-500">{formData.portfolioFileName || '📁 Загрузить файл портфолио'}</span>
               <input type="file" ref={portfolioFileRef} className="hidden" onChange={handlePortfolioFileChange} />
            </div>
          </div>

          <div className="py-4 flex flex-col items-center">
            <label className="flex gap-4 cursor-pointer items-start">
              <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="w-7 h-7 accent-[#FF4F01] mt-1 flex-shrink-0" />
              <span className={`text-[16px] md:text-[18px] leading-tight select-none ${errors.agreed ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                Согласен на <a href="/personal-data.pdf" target="_blank" className="underline hover:text-[#FF4F01] transition-colors">обработку персональных данных</a>
              </span>
            </label>
            {errors.agreed && <span className="text-red-500 text-[13px] mt-2 font-bold">{errors.agreed}</span>}
          </div>

          <button 
            disabled={isLoading || alreadyExistsError} 
            className="w-full bg-[#FF4F01] text-white py-5 rounded-lg text-xl font-bold uppercase disabled:bg-gray-400 hover:bg-[#e64600] transition-all shadow-lg active:scale-[0.98]"
          >
            {isLoading ? 'Отправка...' : 'Отправить проект'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadForm;
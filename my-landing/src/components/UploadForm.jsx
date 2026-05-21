import React, { useState, useRef, useEffect } from 'react';

// Вставьте сюда актуальный URL вашего развернутого скрипта для таблицы "Конкурс"
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxDGeEc4UsTMquUFRh6OGK6fnHOA0RMgIm2m02pCDpCQR3uNO0wGZ2GqAzigk_ba7iL/exec'; 

const UploadForm = () => {
  const fileInputRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyExistsError, setAlreadyExistsError] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    experience: '',
    portfolio: '',
    fileName: ''
  });

  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

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
      setFormData({ ...formData, fileName: e.target.files[0].name });
      const newErrors = { ...errors };
      delete newErrors.fileName;
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!formData.name.trim()) newErrors.name = 'Введите имя';
    if (!formData.email.trim()) {
      newErrors.email = 'Введите Email';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Некорректный Email';
    }
    if (!formData.profession.trim()) newErrors.profession = 'Укажите профессию';
    if (!formData.experience.trim()) newErrors.experience = 'Опишите опыт';
    if (!formData.fileName) newErrors.fileName = 'Загрузите файл';
    if (!formData.portfolio.trim()) {
      newErrors.portfolio = 'Укажите ссылку на портфолио';
    } else if (!urlPattern.test(formData.portfolio) && !formData.portfolio.toLowerCase().includes('.pdf')) {
      newErrors.portfolio = 'Введите корректную ссылку';
    }
    if (!agreed) newErrors.agreed = 'Нужно согласие';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submittedEmails = JSON.parse(localStorage.getItem('submitted_emails') || "[]");
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

      const newEmails = [...submittedEmails, formData.email.toLowerCase().trim()];
      localStorage.setItem('submitted_emails', JSON.stringify(newEmails));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка:', error);
      alert("Ошибка при отправке.");
    } finally {
      setIsLoading(false);
    }
  };

  // ЭКРАН УСПЕХА (Как во второй форме)
  if (isSubmitted) {
    return (
      <section className="w-full bg-white py-24 px-6 font-['Articulat_CF_Normal'] text-center animate-in fade-in zoom-in duration-500">
        <div className="max-w-[700px] mx-auto bg-[#FDF2ED] p-12 rounded-2xl border-2 border-[#FF4F01]/20">
          <div className="w-20 h-20 bg-[#FF4F01] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-['Bicubik'] text-[40px] md:text-[50px] uppercase mb-4 text-[#FF4F01] leading-none">Работа принята!</h2>
          <p className="text-xl text-[#2D2D2D] mb-6">Ваш проект успешно загружен. Мы свяжемся с вами после проверки всех работ.</p>
          <p className="text-sm text-gray-500 italic border-t border-orange-200 pt-6">
            Участие в конкурсе с одного Email возможно только один раз.
          </p>
        </div>
      </section>
    );
  }

  const ErrorMsg = ({ name }) => (
    errors[name] ? <span className="text-red-500 text-[13px] mt-1 font-bold">{errors[name]}</span> : null
  );

  return (
    <section id="upload-form" className="w-full py-20 px-6 font-['Articulat_CF_Normal'] bg-white">
      <div className="max-w-[1000px] mx-auto bg-white">
        <h2 className="font-['Bicubik'] text-[32px] md:text-[60px] lg:text-[72px] leading-tight text-center uppercase mb-12 text-[#2D2D2D]">
            Загрузить работу
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-[800px] mx-auto">
          
          <div className="flex flex-col">
            <label className="text-[18px] font-bold mb-2">Ваше имя</label>
            <input name="name" value={formData.name} onChange={handleChange} type="text" className={`w-full h-14 border px-5 rounded-[8px] outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} />
            <ErrorMsg name="name" />
          </div>

          <div className="flex flex-col">
            <label className="text-[18px] font-bold mb-2">Email</label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" className={`w-full h-14 border px-5 rounded-[8px] outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} />
            <ErrorMsg name="email" />
            {alreadyExistsError && <span className="text-orange-600 text-[13px] mt-1 font-bold">Вы уже отправляли работу с этой почты</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[18px] font-bold mb-2">Профессия</label>
            <input name="profession" value={formData.profession} onChange={handleChange} type="text" className={`w-full h-14 border px-5 rounded-[8px] border-black outline-none focus:border-[#FF4F01] ${errors.profession && 'border-red-500'}`} />
            <ErrorMsg name="profession" />
          </div>

          <div className="flex flex-col">
            <label className="text-[18px] font-bold mb-2">Опыт работы</label>
            <input name="experience" value={formData.experience} onChange={handleChange} type="text" className={`w-full h-14 border px-5 rounded-[8px] border-black outline-none focus:border-[#FF4F01] ${errors.experience && 'border-red-500'}`} />
            <ErrorMsg name="experience" />
          </div>

          <div className="flex flex-col">
            <label className="text-[18px] font-bold mb-2">Файл (png, jpg, pdf)</label>
            <div onClick={() => fileInputRef.current.click()} className={`w-full h-14 border px-5 flex items-center gap-3 cursor-pointer rounded-[8px] border-black hover:bg-gray-50 ${errors.fileName && 'border-red-500'}`}>
              <span className="text-[16px] text-gray-500 truncate">{formData.fileName || 'Нажмите, чтобы выбрать'}</span>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".png,.jpg,.pdf" />
            </div>
            <ErrorMsg name="fileName" />
          </div>

          <div className="flex flex-col">
            <label className="text-[18px] font-bold mb-2">Портфолио</label>
            <input name="portfolio" value={formData.portfolio} onChange={handleChange} type="text" className={`w-full h-14 border px-5 rounded-[8px] border-black outline-none focus:border-[#FF4F01] ${errors.portfolio && 'border-red-500'}`} />
            <ErrorMsg name="portfolio" />
          </div>

          <div className="pt-6 flex flex-col items-center">
            <label className="flex items-start gap-4 cursor-pointer">
              <input checked={agreed} onChange={() => setAgreed(!agreed)} type="checkbox" className="w-6 h-6 accent-[#FF4F01] mt-1" />
              <span className={`text-[18px] md:text-[22px] select-none ${errors.agreed ? 'text-red-500 font-bold' : 'text-gray-500'}`}>Согласен на обработку данных</span>
            </label>
            <ErrorMsg name="agreed" />
          </div>

          <div className="flex justify-center pt-8">
            <button 
              disabled={isLoading || alreadyExistsError}
              type="submit"
              className="w-full md:w-[500px] bg-[#FF4F01] text-white py-5 px-10 rounded-[8px] text-[20px] font-bold uppercase hover:bg-[#E04500] disabled:bg-gray-400 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-3"
            >
              {isLoading ? 'Отправка...' : 'Отправить проект'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadForm;
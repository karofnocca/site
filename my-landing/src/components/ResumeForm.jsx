import React, { useState, useEffect } from 'react';

// ВСТАВЬТЕ СЮДА URL ИЗ СКРИПТА НОВОЙ ТАБЛИЦЫ РЕЗЮМЕ
const SCRIPT_URL = 'ВАША_ССЫЛКА_ДЛЯ_РЕЗЮМЕ'; 

const ResumeForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadySent, setAlreadySent] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', email: '', resume: '' });
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const submittedEmails = JSON.parse(localStorage.getItem('submitted_resumes') || "[]");
    if (formData.email && submittedEmails.includes(formData.email.toLowerCase().trim())) {
      setAlreadySent(true);
    } else {
      setAlreadySent(false);
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
    if (!validate() || alreadySent) return;

    setIsLoading(true);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const submitted = JSON.parse(localStorage.getItem('submitted_resumes') || "[]");
      localStorage.setItem('submitted_resumes', JSON.stringify([...submitted, formData.email.toLowerCase().trim()]));
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Ошибка отправки");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="w-full py-24 px-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="max-w-[700px] mx-auto bg-[#FDF2ED] p-12 rounded-2xl border-2 border-[#FF4F01]/20">
          <div className="w-20 h-20 bg-[#FF4F01] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 className="font-['Bicubik'] text-[40px] uppercase mb-4 text-[#FF4F01]">Резюме принято!</h2>
          <p className="text-xl font-['Articulat_CF_Normal']">Мы свяжемся с вами после рассмотрения вашей кандидатуры.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 px-6 font-['Articulat_CF_Normal']">
      <div className="max-w-[800px] mx-auto">
        <h2 className="font-['Bicubik'] text-[48px] md:text-[72px] leading-none text-center uppercase mb-16">
          ОТПРАВИТЬ <br/> РЕЗЮМЕ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col">
            <label className="text-[20px] font-bold mb-2">Имя</label>
            <input name="name" value={formData.name} onChange={handleChange} className={`h-14 border-2 border-black px-4 rounded-[4px] outline-none ${errors.name && 'border-red-500'}`} />
          </div>

          <div className="flex flex-col">
            <label className="text-[20px] font-bold mb-2">Email</label>
            <input name="email" value={formData.email} onChange={handleChange} className={`h-14 border-2 border-black px-4 rounded-[4px] outline-none ${errors.email && 'border-red-500'}`} />
            {alreadySent && <span className="text-orange-600 text-sm mt-1 font-bold">Вы уже отправляли резюме</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-[20px] font-bold mb-2">Резюме (PDF или ссылка)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
              </span>
              <input 
                name="resume" 
                placeholder="Вставить ссылку" 
                value={formData.resume} 
                onChange={handleChange} 
                className={`w-full h-14 border-2 border-black pl-12 pr-4 rounded-[4px] outline-none ${errors.resume && 'border-red-500'}`} 
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <label className="flex items-center gap-4 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="w-6 h-6 accent-[#FF4F01]" />
              <span className={`text-[18px] ${errors.agreed ? 'text-red-500 font-bold' : 'text-gray-500'}`}>Согласен на обработку персональных данных</span>
            </label>
          </div>

          <div className="flex justify-center">
            <button 
              disabled={isLoading || alreadySent}
              className="w-full md:w-[400px] bg-[#FF4F01] text-white py-5 text-[20px] font-bold uppercase rounded-[4px] hover:bg-[#E04500] disabled:bg-gray-400 transition-all active:scale-95 shadow-lg"
            >
              {isLoading ? 'Загрузка...' : 'Отправить'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResumeForm;
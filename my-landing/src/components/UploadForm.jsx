import React, { useState, useRef, useEffect } from 'react';

const SCRIPT_URL = 'ВАШ_URL_ИЗ_APPS_SCRIPT'; 

const UploadForm = () => {
  const fileInputRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    experience: '',
    portfolio: '',
    fileName: ''
  });

  const [errors, setErrors] = useState({}); // Теперь здесь хранятся строки с текстом ошибок
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('formSubmitted');
    if (status) setIsSubmitted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Очищаем ошибку при вводе
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
    
    if (!formData.name.trim()) newErrors.name = 'Пожалуйста, введите ваше имя';
    if (!formData.profession.trim()) newErrors.profession = 'Укажите вашу профессию';
    if (!formData.experience.trim()) newErrors.experience = 'Опишите ваш опыт работы';
    if (!formData.fileName) newErrors.fileName = 'Загрузите файл с вашей работой';
    
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!formData.portfolio.trim()) {
      newErrors.portfolio = 'Введите ссылку на портфолио или укажите путь к нему';
    } else if (!urlPattern.test(formData.portfolio) && !formData.portfolio.toLowerCase().includes('.pdf')) {
      newErrors.portfolio = 'Введите корректную ссылку (напр. https://...)';
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
      localStorage.setItem('formSubmitted', 'true');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="w-full  py-20 px-6 font-['Articulat_CF_Normal'] text-center">
        <h2 className="font-['Bicubik'] text-[40px] uppercase mb-4 text-[#FF4F01]">Успешно!</h2>
        <p className="text-xl text-[#2D2D2D]">Ваша работа принята. Участие возможно только один раз.</p>
      </section>
    );
  }

  // Вспомогательный компонент для вывода сообщения об ошибке
  const ErrorMsg = ({ name }) => (
    errors[name] ? <span className="text-red-500 text-[12px] mt-1 font-bold">{errors[name]}</span> : null
  );

  return (
    <section className="w-full py-20 px-6 font-['Articulat_CF_Normal']">
      <div className="max-w-[1000px] mx-auto bg-white p-8 md:p-12">
        
        <h2 className="font-['Bicubik'] text-[28px] md:text-[60px] lg:text-[72px] leading-none text-center uppercase mb-12 text-[#2D2D2D] whitespace-nowrap">
  Загрузить работу
</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex flex-col">
            <label className="text-[28px] mb-2">Имя</label>
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
            <label className="text-[28px] mb-2">Профессия</label>
            <input 
              name="profession" 
              value={formData.profession} 
              onChange={handleChange} 
              type="text" 
              className={`w-full h-12 border px-4 outline-none rounded-[4px] transition-colors ${errors.profession ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} 
            />
            <ErrorMsg name="profession" />
          </div>

          <div className="flex flex-col">
            <label className="text-[28px] mb-2">Опыт работы</label>
            <input 
              name="experience" 
              value={formData.experience} 
              onChange={handleChange} 
              type="text" 
              className={`w-full h-12 border px-4 outline-none rounded-[4px] transition-colors ${errors.experience ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} 
            />
            <ErrorMsg name="experience" />
          </div>

          <div className="flex flex-col">
            <label className="text-[28px] mb-2">Файл с работой (png, jpg, pdf)</label>
            <div 
              onClick={() => fileInputRef.current.click()} 
              className={`w-full h-12 border px-4 flex items-center gap-3 cursor-pointer rounded-[4px] transition-colors ${errors.fileName ? 'border-red-500 bg-red-50' : 'border-black hover:bg-gray-50'}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={errors.fileName ? 'text-red-500' : 'text-gray-400'}>
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
              <span className={`text-[14px] truncate ${errors.fileName ? 'text-red-500' : 'text-gray-400'}`}>
                {formData.fileName || 'Выбрать файл'}
              </span>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".png,.jpg,.pdf" />
            </div>
            <ErrorMsg name="fileName" />
          </div>

          <div className="flex flex-col">
            <label className="text-[28px] mb-2">Портфолио (PDF или ссылка)</label>
            <input 
              name="portfolio" 
              value={formData.portfolio} 
              onChange={handleChange} 
              type="text" 
              placeholder="Вставить ссылку" 
              className={`w-full h-12 border px-4 outline-none rounded-[4px] transition-colors ${errors.portfolio ? 'border-red-500 bg-red-50' : 'border-black focus:border-[#FF4F01]'}`} 
            />
            <ErrorMsg name="portfolio" />
          </div>

          <div className="pt-4 flex flex-col items-center justify-center">
            <div className="flex items-center gap-4">
              <input 
                checked={agreed} 
                onChange={() => {setAgreed(!agreed); if(errors.agreed) {const n={...errors}; delete n.agreed; setErrors(n);}}} 
                type="checkbox" 
                id="agreement" 
                className={`w-6 h-6 accent-[#FF4F01] cursor-pointer ${errors.agreed ? 'outline outline-2 outline-red-500' : ''}`} 
              />
              <label htmlFor="agreement" className={`text-[24px] select-none cursor-pointer ${errors.agreed ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                Согласен на обработку персональных данных
              </label>
            </div>
            {/* Сообщение об ошибке тоже будет по центру */}
            <ErrorMsg name="agreed" />
          </div>

          <div className="flex justify-center pt-6">
            <button 
              disabled={isLoading}
              type="submit"
              className="w-full md:w-[450px] bg-[#FF4F01] text-white py-4 px-10 rounded-[4px] text-[18px] font-bold uppercase transition-all hover:bg-[#E04500] disabled:bg-gray-400 active:scale-95 shadow-md"
            >
              {isLoading ? 'Отправка...' : 'Отправить'}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default UploadForm;
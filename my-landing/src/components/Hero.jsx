import React from 'react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white font-['Bicubik'] overflow-hidden selection:bg-black selection:text-white">
      
      {/* 1. ЛОГОТИП */}
      <div className="max-w-[1440px] mx-auto px-10 pt-10 flex justify-end relative z-50">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-3">
            <img 
              src="/Group2.png" 
              alt="Транспорт Будущего" 
              className="h-20 w-auto object-contain" 
            />
            <img 
              src="/Group3.svg" 
              alt="ТБ" 
              className="h-12 w-auto object-contain" 
            />
          </div>
        </div>
      </div>

      {/* ГЛАВНЫЙ КОНТЕЙНЕР */}
      <div className="relative w-full flex flex-col lg:block min-h-fit lg:min-h-[550px] lg:-mt-20">
        
        {/* 2. ЛЕВЫЙ ОРАНЖЕВЫЙ БЛОК */}
        <div className="relative lg:absolute left-0 top-0 w-full lg:w-[62%] min-h-[320px] md:min-h-[450px] lg:min-h-[550px] z-10">
          <div 
            className="absolute inset-0 bg-[#FF4F01]"
            style={{
              clipPath: 'polygon(0 0, 24% 0, 24% 12%, 32% 12%, 32% 0, 64% 0, 64% 18%, 91% 18%, 91% 72%, 100% 72%, 100% 100%, 87% 100%, 87% 92%, 0 92%)'
            }}
          ></div>

          <div className="relative pt-20 lg:pt-30 pb-12 pl-8 md:pl-12 lg:pl-14 text-white z-20"> 
            <h1 className="font-['Bicubik'] font-normal text-[36px] md:text-[60px] lg:text-[76px] leading-[1.3] uppercase tracking-tight">
              Спроектируй <br />
              голову для <br />
              робособаки
            </h1>
          </div>
        </div>

        {/* 3. КОНТЕНТ МЕЖДУ (ЗДЕСЬ ПРАВКА: flex-row для мобилки) */}
        <div className="flex flex-row lg:contents relative z-30 items-center px-8 lg:px-0">
          
          {/* 5. ПОДЗАГОЛОВОК (Теперь слева) */}
          <div className="lg:absolute lg:top-[480px] left-0 z-20 bg-white lg:py-7 lg:pl-14 lg:border-t lg:border-gray-100 mt-2 lg:mt-10 flex-1">
            <p className="font-['Articulat_CF_Normal'] text-[24px] md:text-[20px] lg:text-[22px] font-bold tracking-tight uppercase text-black leading-tight lg:whitespace-nowrap max-w-[180px] lg:max-w-none">
              Публичный эксперимент: <br className="lg:hidden" /> человек против нейросети
            </p>
          </div>

          {/* 4. СОБАКА (Теперь справа и выше) */}
          <div className="relative lg:absolute lg:top-[90px] lg:left-[70%] lg:-translate-x-1/2 w-[55%] lg:w-[750px] z-30 pointer-events-none -mr-6 lg:mr-0">
             <img 
               src="/robot-dog.png" 
               alt="Robot Dog" 
               className="w-full h-auto object-contain drop-shadow-2xl scale-110 lg:scale-100" 
             />
          </div>
        </div>

        {/* 6. ПРАВЫЙ БЛОК ПРИЗА */}
<div className="mt-8 lg:mt-0 lg:absolute lg:right-0 lg:top-[180px] w-full lg:w-[38%] z-20  lg:px-0 flex flex-col items-start">
  {/* Надпись "ГЛАВНЫЙ ПРИЗ" над блоком */}
  <span className="text-[#FF4F01] px-8 font-['Articulat_CF_Normal'] font-bold text-[24px] lg:text-[16px] uppercase mb-2 block">
    Главный приз
  </span>
  
  {/* Оранжевый прямоугольник */}
  <div className="inline-block bg-[#FF4F01] py-6 px-10 lg:py-5 lg:pl-12 lg:pr-[calc((100vw-1440px)/2+40px)] shadow-xl">
    <div className="flex items-center justify-start gap-6">
      {/* Сумма */}
      <span className="text-white text-5xl lg:text-7xl leading-none tracking-tighter whitespace-nowrap tracking-wide font-bold  font-['Bicubik']" >
        100 000 ₽
      </span>
      {/* Текст рядом (только для десктопа) */}
      <span className="text-white hidden lg:inline font-['Articulat_CF_Normal'] text-[28px] font-bold uppercase leading-tight whitespace-nowrap pt-2">
        Главный <br/> Приз
      </span>
    </div>
  </div>
</div>
      </div>

      {/* 7. КНОПКИ (ПРАВКА: mt-10 вместо mt-20 для мобилки) */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-10 mt-10 lg:mt-40 relative z-40"> 
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 lg:pl-14 justify-start items-center lg:items-start">
          <button 
            onClick={() => scrollToSection('upload-form')}
            className="w-full font-bold font-['Articulat_CF_Normal'] lg:w-auto bg-[#2D2D2D] text-white px-12 py-5 rounded-[8px] lg:rounded-[4px] text-[18px] lg:text-[20px] uppercase transition-all duration-300 hover:bg-[#FF4F01] active:scale-95 shadow-md"
          >
            Участвовать
          </button>
          <button 
            onClick={() => scrollToSection('event-register')}
            className="w-full font-bold font-['Articulat_CF_Normal'] lg:w-auto border-[2px] lg:border-[2.5px] border-black lg:border-[#2D2D2D] text-[#2D2D2D] px-10 py-5 rounded-[8px] lg:rounded-[4px] text-[18px] lg:text-[20px] uppercase bg-white transition-all duration-300 hover:bg-gray-100 active:scale-95"
          >
            Прийти на мероприятие
          </button>
        </div>

        <div className="mt-8 lg:pl-14 text-center lg:text-left">
          {/* ИЗМЕНЕНО: теперь это кнопка, которая скроллит к id="join-team" */}
          <button 
            onClick={() => scrollToSection('join-team')}
            className="font-bold font-['Articulat_CF_Normal'] text-[28px] lg:text-[24px] text-black underline underline-offset-8 decoration-2 hover:text-[#FF4F01] transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Присоединяйся к команде будущего
          </button>
        </div>
      </div>

      {/* 8. НИЖНЯЯ СТАТИСТИКА */}
      <div className="max-w-[1440px] font-['Bicubik'] mx-auto px-8 lg:px-10 py-12 lg:py-24 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        <StatItem number="10" text={["дней на", "создание"]} />
        <StatItem number="4" text={["участника", "эксперимента"]} />
        <StatItem number="3" text={["эксперта", "в жюри"]} />
        <StatItem number="1" text={["победитель", ""]} />
      </div>

    </section>
  );
};

const StatItem = ({ number, text }) => (
  <div className="flex flex-col items-center text-center">
    <span className="font-['Bicubik'] text-[#FF4F01] text-[70px] lg:text-[90px] leading-none mb-2 select-none">
      {number}
    </span>
    <div className="font-['Bicubik'] text-[14px] lg:text-[21px] leading-[1.1] uppercase font-bold text-black">
      {text[0]} <br /> {text[1]}
    </div>
  </div>
);

export default Hero;
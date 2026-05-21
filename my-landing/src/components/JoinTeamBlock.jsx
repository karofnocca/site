import React from 'react';

const JoinTeamBlock = () => {
  const scrollToForm = () => {
    const element = document.getElementById('event-register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white py-12 lg:py-24 px-4 md:px-10 overflow-hidden">
      <div className="max-w-[1100px] mx-auto relative">
        
        {/* ОРАНЖЕВЫЙ ФОН */}
        <div className="relative w-full z-10">
          <div 
            className="absolute inset-0 bg-[#FF4F01]"
            style={{
              // Умный полигон: на мобилках (маленький экран) вырезы по 20px, на десктопе - масштабнее
              clipPath: 'polygon(0 40px, 40px 40px, 40px 0, 100px 0, 100px 40px, 100% 40px, 100% calc(100% - 40px), calc(100% - 40px) calc(100% - 40px), calc(100% - 40px) 100%, 40px 100%, 40px calc(100% - 40px), 0 calc(100% - 40px))'
            }}
          ></div>

          {/* КОНТЕНТ (Адаптированные отступы и шрифты) */}
          <div className="relative z-20 px-6 py-16 md:py-24 lg:px-20 text-center flex flex-col items-center">
            
            <p className="font-['Articulat_CF_Normal'] text-white text-[15px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-relaxed md:leading-[1.5] max-w-[900px] mb-8 md:mb-12">
              Станьте частью команды «Транспорт будущего» — мы приглашаем программистов, конструкторов и технологов присоединиться к нашему центру разработок. Оставьте информацию о себе и своем опыте в специальной форме ниже и мы обязательно свяжемся с вами. Вместе мы создаём решения для инновационных транспортных проектов.
            </p>

            {/* КНОПКА */}
            <button 
              onClick={scrollToForm}
              className="w-full sm:w-auto border-2 border-white bg-transparent hover:bg-white text-white hover:text-[#FF4F01] transition-all duration-300 rounded-[4px] px-10 py-4 font-bold text-[18px] md:text-[22px] uppercase active:scale-95 shadow-lg"
            >
              Подробнее
            </button>
          </div>
        </div>

        {/* ДЕКОРАТИВНЫЙ ПИКСЕЛЬ (скрываем на мобилках, чтобы не мешал) */}
        <div className="absolute right-[-10px] top-[70%] w-8 h-8 bg-[#FF4F01] z-0 hidden md:block"></div>
        
      </div>
    </section>
  );
};

export default JoinTeamBlock;
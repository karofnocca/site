import React from 'react';

const JoinTeamBlock = () => {
  // Функция для скролла к форме внизу
  const scrollToForm = () => {
    const element = document.getElementById('event-register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white py-12 lg:py-24 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative">
        
        {/* ФОНОВЫЙ ОРАНЖЕВЫЙ БЛОК СО СЛОЖНОЙ ФОРМОЙ */}
        <div className="relative w-full z-10">
          <div 
            className="absolute inset-0 bg-[#FF4F01]"
            style={{
              // Ступенчатый полигон: вырезы сверху и снизу для эффекта пикселей
              clipPath: 'polygon(0 20%, 25% 20%, 25% 0, 45% 0, 45% 20%, 100% 20%, 100% 80%, 85% 80%, 85% 100%, 15% 100%, 15% 85%, 0 85%)'
            }}
          ></div>

          {/* КОНТЕНТ */}
          <div className="relative z-20 px-6 py-20 md:py-38 lg:px-20 text-center flex flex-col items-center">
            
            <p className="font-['Articulat_CF_Normal'] text-white text-[16px] md:text-[20px] lg:text-[24px] leading-[1.5] max-w-[900px] mb-10">
              Станьте частью команды «Транспорт будущего» — мы приглашаем программистов, конструкторов и технологов присоединиться к нашему центру разработок. Оставьте информацию о себе и своем опыте в специальной форме ниже и мы обязательно свяжемся с вами. Вместе мы создаём решения для инновационных транспортных проектов.
            </p>

            {/* КНОПКА С РАМКОЙ */}
            <button 
              onClick={scrollToForm}
              className="group relative flex items-center justify-center border-2 border-white bg-transparent hover:bg-white transition-all duration-300 rounded-[4px] px-12 py-4"
            >
              <span className="text-white group-hover:text-[#FF4F01] font-bold text-[18px] md:text-[22px] uppercase tracking-wide">
                Подробнее
              </span>
              {/* Маленькая иконка/аватар как на макете (опционально) */}
            </button>
          </div>
        </div>

        {/* ДЕКОРАТИВНЫЙ ПИКСЕЛЬ СПРАВА */}
        <div className="absolute right-[-20px] top-[60%] w-12 h-10 bg-[#FF4F01] z-0 hidden lg:block"></div>
        
      </div>
    </section>
  );
};

export default JoinTeamBlock;
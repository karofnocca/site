import React from 'react';

const InfoBlock = () => {
  return (
    <section className="w-full bg-white py-10 lg:py-28 px-4 md:px-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-0">
        
        {/* 1. ЛЕВАЯ ЧАСТЬ: Шильдик (адаптирован под центр на мобилке) */}
        <div className="w-full lg:w-[32%] z-30 lg:-mt-16 order-1"> 
          <div className="bg-white border-[2px] md:border-[3px] border-black p-5 md:p-10 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)]">
            <div className="font-['Bicubik'] text-[20px] sm:text-[24px] md:text-[32px] lg:text-[42px] leading-[1.1] text-[#2D2D2D] uppercase tracking-tight">
              31.05.2026 <br />
              Г. ПЕРМЬ <br />
              «ПЕРМСКАЯ <br className="hidden sm:block"/> СИНЕМАТЕКА»
            </div>
          </div>
        </div>

        {/* 2. ВОЗДУХ (скрыт на мобилках) */}
        <div className="hidden lg:flex w-[8%] justify-center self-center">
            <div className="w-10 h-10 bg-[#FF4F01] rotate-45 opacity-10"></div>
        </div>

        {/* 3. ПРАВАЯ ЧАСТЬ: Оранжевый блок (переработан под мобилки) */}
        <div className="w-full lg:w-[60%] relative z-10 order-2">
          <div 
            className="absolute inset-0 bg-[#FF4F01]"
            style={{
              // Упрощенный, но пиксельный полигон для мобилок, чтобы текст не вылетал
              clipPath: 'polygon(0 10px, 10px 10px, 10px 0, calc(100% - 10px) 0, calc(100% - 10px) 10px, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 10px calc(100% - 10px), 0 calc(100% - 10px))'
            }}
          ></div>

          {/* КОНТЕНТ: Уменьшены падинги и шрифты для мобильных */}
          <div className="relative p-6 sm:p-10 md:p-16 lg:p-20 text-white text-center flex flex-col items-center gap-5 md:gap-8">
            
            <h3 className="font-bold text-[16px] sm:text-[20px] md:text-[26px] lg:text-[34px] leading-tight font-['Articulat_CF_Normal'] uppercase tracking-tight">
              Профи, новички и искусственный интеллект <br className="hidden md:block"/> в одном ринге.
            </h3>

            <div className="space-y-4 md:space-y-6 font-['Articulat_CF_Normal'] text-[14px] sm:text-[16px] md:text-[19px] lg:text-[22px] leading-snug md:leading-relaxed">
              <p className="max-w-[750px] mx-auto">
                <span className="font-bold underline decoration-1 md:decoration-2 underline-offset-4 md:underline-offset-8 uppercase mr-1">Задача:</span> 
                предложить эскиз головы для робособаки-курьера. 
                Жюри оценят работы: арт-директор «Студии Лебедева» Николай Морозов и эксперт Андрей Блохин.
              </p>
              
              <p className="font-bold text-[18px] sm:text-[22px] md:text-[30px] lg:text-[40px] pt-2 md:pt-4 leading-none uppercase tracking-tighter">
                Сможет ли ИИ обойти человека?
              </p>

              <p className="opacity-90 text-[13px] sm:text-[15px] md:text-[18px]">
                Голосуй, смотри, удивляйся. Главный приз — 100 000 рублей и экскурсия на производство.
              </p>
            </div>

            <div className="w-[90%] border-t border-white/20 pt-5 md:pt-8 mt-2 md:mt-4">
               <p className="font-bold text-[18px] sm:text-[24px] md:text-[34px] lg:text-[44px] uppercase font-['Articulat_CF_Normal'] leading-none">
                 Регистрация открыта. <br/> Ждём тебя.
               </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default InfoBlock;
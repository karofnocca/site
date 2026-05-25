import React from 'react';

const PermBlock = () => {
  return (
    <section className="w-full bg-white py-16 lg:py-24 px-6 overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
        
        {/* 1. ЛЕВАЯ ЧАСТЬ (Шильдик) - ИСПРАВЛЕНО ОТОБРАЖЕНИЕ */}
        <div className="w-full lg:w-[30%] flex items-start"> 
          <div className="w-full bg-white border-[3px] border-black p-6 md:p-10 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]">
            <div className="font-['Bicubik'] text-[20px] md:text-[28px] lg:text-[32px] xl:text-[36px] leading-[1.2] text-[#2D2D2D] uppercase break-words">
              31.05.2026 <br />
              Г. ПЕРМЬ <br />
              «ПЕРМСКАЯ <br /> СИНЕМАТЕКА»
            </div>
          </div>
        </div>

        {/* 2. ПРАВАЯ ЧАСТЬ (Исправленный пиксельный блок) */}
        <div className="w-full lg:w-[70%] relative flex">
          <div 
            className="absolute inset-0 bg-[#FF4F01]"
            style={{
              // Умный полигон: пиксели только по самым краям, внутри - ровный прямоугольник
              clipPath: `polygon(
                0 30px, 30px 30px, 30px 0, calc(100% - 60px) 0, calc(100% - 60px) 20px, 100% 20px, 
                100% 40%, 97% 40%, 97% 70%, 100% 70%, 100% calc(100% - 30px), calc(100% - 40px) calc(100% - 30px), calc(100% - 40px) 100%, 
                60% 100%, 60% calc(100% - 20px), 40% calc(100% - 20px), 40% 100%, 20px 100%, 20px calc(100% - 40px), 0 calc(100% - 40px)
              )`
            }}
          ></div>

          {/* КОНТЕНТ С БОЛЬШИМИ ОТСТУПАМИ (Padding) */}
          <div className="relative z-10 w-full p-10 md:p-16 lg:p-20 text-white text-center flex flex-col items-center justify-center gap-8">
            
            <h3 className="font-['Bicubik'] font-normal text-[20px] md:text-[28px] lg:text-[34px] leading-tight uppercase max-w-[700px]">
              Профи, новички и искусственный интеллект в одном ринге.
            </h3>

            <div className="space-y-6 font-['Articulat_CF_Normal'] text-[15px] md:text-[18px] lg:text-[21px] leading-relaxed max-w-[800px]">
              <p>
                <span className="font-bold underline underline-offset-8 decoration-2 uppercase">Задача:</span> &nbsp;
                предложить эскиз головы для робособаки-курьера. 
                Жюри оценят работы: арт-директор «Студии Лебедева» Николай Морозов и эксперт Андрей Блохин.
              </p>
              
              <p className="font-['Bicubik'] text-[24px] md:text-[32px] lg:text-[38px] pt-4 leading-none uppercase text-[#ffffff]">
                Сможет ли ИИ обойти человека?
              </p>

              <p className="opacity-90">
                Голосуй, смотри, удивляйся. Главный приз — 100 000 рублей и экскурсия на производство.
              </p>
            </div>

            <div className="w-full border-t border-white/20 pt-8 mt-4">
               <p className="font-['Bicubik'] text-[24px] md:text-[40px] lg:text-[46px] uppercase leading-[1.1]">
                 Регистрация открыта. <br className="hidden md:block" /> Ждём тебя.
               </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PermBlock;
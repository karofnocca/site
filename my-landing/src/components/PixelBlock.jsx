import React from 'react';

const PixelBlock = () => {
  return (
    <section className="w-full bg-white py-24 lg:py-40 px-6">
      <div className="max-w-[1900px] mx-auto relative">
        
        {/* САМ БЛОК */}
        <div className="relative w-full z-10">
          <div 
            className="absolute inset-0 bg-[#2D2D2D]"
            style={{
              // Хаотичная пиксельная форма по вашему референсу
              clipPath: 'polygon(0 0, 18% 0, 18% 15%, 24% 15%, 24% 0, 45% 0, 45% 25%, 78% 25%, 78% 75%, 85% 75%, 85% 65%, 100% 65%, 100% 90%, 80% 90%, 80% 100%, 0 100%)'
            }}
          ></div>

          {/* ТЕКСТ (Всего 2 слова) */}
          <div className="relative z-20 px-8 py-20 md:py-32 lg:px-20">
            <h2 className="font-['Bicubik'] text-white text-[38px] md:text-[60px] lg:text-[80px] leading-[1.1] uppercase">
              Спроектируй <br /> будущее
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PixelBlock;
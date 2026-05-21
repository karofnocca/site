import React from 'react';

const InfoBlock = () => {
  return (
    <section className="w-full bg-white py-10 lg:py-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* КОНТЕЙНЕР БЛОКА (Увеличили высоту до 400px и 600px) */}
        <div className="relative w-full min-h-[350px] md:min-h-[500px] flex items-start">
          
          {/* ГЕОМЕТРИЧЕСКАЯ ФИГУРА */}
          <div 
            className="absolute inset-0 bg-[#2D2D2D]"
            style={{
              clipPath: 'polygon(0 15%, 15% 15%, 15% 0, 22% 0, 22% 15%, 40% 15%, 40% 35%, 65% 35%, 65% 80%, 72% 80%, 72% 70%, 100% 70%, 100% 85%, 72% 85%, 72% 100%, 0 100%)'
            }}
          ></div>

          {/* ТЕКСТ (Установили ОЧЕНЬ большие отступы pt-40 и md:pt-72, чтобы опустить текст в нижнюю часть) */}
          <div className="relative z-10 pl-8 md:pl-20 pt-40 md:pt-72">
            <h2 className="font-['Articulat_CF_Normal'] text-white text-[38px] md:text-[80px] lg:text-[80px] leading-[0.9] uppercase font-bold tracking-tighter">
              Спроектируй <br />
              будущее
            </h2>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InfoBlock;
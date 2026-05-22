const PixelBlock = () => {
  return (
    <section className="w-full bg-white py-10 md:py-20 px-4 lg:px-24 overflow-hidden">
      {/* Убрали mx-auto, чтобы блок не центрировался */}
      {/* justify-start, чтобы текст внутри был слева */}
      <div className="max-w-[1000px] relative min-h-[250px] md:min-h-[450px] flex items-center justify-start">
        
        {/* ЧЕРНЫЙ ПИКСЕЛЬНЫЙ ФОН */}
        <div 
          className="absolute inset-0 bg-[#2D2D2D]"
          style={{
            clipPath: 'polygon(0 15%, 22% 15%, 22% 5%, 38% 5%, 38% 15%, 75% 15%, 75% 35%, 88% 35%, 88% 65%, 100% 65%, 100% 88%, 80% 88%, 80% 100%, 0 100%)'
          }}
        ></div>

        {/* ТЕКСТ СЛЕВА */}
        <div className="relative z-10 px-8 py-12 md:p-20 text-left">
          {/* text-left вместо text-center */}
          <h2 className="font-['Bicubik'] text-white text-[28px] sm:text-[36px] md:text-[60px] lg:text-[72px] leading-[1.1] uppercase tracking-tight">
            Спроектируй <br /> будущее
          </h2>
        </div>

        {/* ДЕКОРАТИВНЫЙ КВАДРАТ */}
        <div className="hidden md:block absolute -right-4 top-1/2 w-10 h-10 bg-[#2D2D2D] z-0"></div>
      </div>
    </section>
  );
};

export default PixelBlock;
import React from 'react';

const Jury = () => {
  const experts = [
    {
      name: "АЛЕКСАНДР МЕДВЕДЕВ",
      desc: "экс-генконструктор Роскосмоса",
      img: "/1.png" // Замените на ваши пути к фото
    },
    {
      name: "НИКОЛАЙ МОРОЗОВ",
      desc: "арт-директор «Студии Артемия Лебедева»",
      img: "/2.png"
    },
    {
      name: "АРТЕМ НИКОНОРОВ",
      desc: "директор центра «Интеллектуальная мобильность»",
      img: "/expert3.png"
    }
  ];

  return (
    <section className="w-full">
      
      {/* СЕКЦИЯ ЭКСПЕРТЫ И ЖЮРИ */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-[1440px] mx-auto">
          
          <h2 className="font-['Bicubik'] text-[40px] md:text-[80px] leading-none text-center uppercase mb-20 text-[#2D2D2D]">
            Эксперты и жюри
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {experts.map((expert, index) => (
              <div key={index} className="flex items-center gap-6">
                {/* Круглое фото */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                  <img 
                    src={expert.img} 
                    alt={expert.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // Заглушка если фото нет
                  />
                </div>

                {/* Текст рядом */}
                <div className="flex flex-col font-['Articulat_CF_Normal']">
                  <h3 className="text-[18px] md:text-[20px] font-bold leading-tight uppercase text-[#2D2D2D] mb-2">
                    {expert.name}
                  </h3>
                  <p className="text-[14px] md:text-[16px] text-gray-600 leading-tight">
                    {expert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ТЕМНЫЙ БЛОК "СПРОЕКТИРУЙ БУДУЩЕЕ" */}
      <div className="bg-[#2D2D2D] py-24 md:py-32 px-6">
        <h2 className="font-['Bicubik'] text-white text-[22px] md:text-[60px] lg:text-[80px] text-center uppercase tracking-wider leading-none">
          Спроектируй будущее
        </h2>
      </div>

    </section>
  );
};

export default Jury;
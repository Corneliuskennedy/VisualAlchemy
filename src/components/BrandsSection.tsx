const BrandsSection = () => {
  const brands = [
    { url: "/logo/vilaverde.svg", name: "Vilaverde Consultancy" },
    { url: "/logo/monuta.svg", name: "Monuta" },
    { url: "/logo/gtahoodexpert.svg", name: "GTA Hood Expert" },
    { url: "/logo/octomatic-200.webp", name: "Octomatic" },
  ];

  return (
    <div className="py-8 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto px-6 w-full max-w-6xl relative z-10">
        <h2 className="text-sm md:text-base font-medium text-center mb-6 text-white/80">
          Trusted by businesses of all sizes
        </h2>
        
        <div className="flex justify-center items-center gap-4 flex-wrap max-w-3xl mx-auto">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="group relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center p-2"
            >
              <div className="absolute inset-0 bg-[#112C46]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={brand.url}
                alt={brand.name}
                className="w-full h-full object-contain opacity-70 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsSection;
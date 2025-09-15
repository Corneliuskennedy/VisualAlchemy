
const PressLogos = () => {
  const logos = [
    "Digital Journal",
    "Bloomberg",
    "Fox News Media",
    "Popular Mechanics",
    "Yahoo Finance",
    "Associated Press"
  ];

  return (
    <div className="border-t border-b border-border/50 py-12 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto px-6 w-full max-w-6xl relative z-10">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400">Featured in</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div
              key={logo}
              className="text-gray-500 font-semibold text-sm md:text-base animate-fade-in hover:text-primary transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PressLogos;

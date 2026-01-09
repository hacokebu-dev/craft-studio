const LogoRollingSection = () => {
  const logos = Array(10).fill('HACO & KEBU');
  
  return (
    <section className="py-8 bg-secondary overflow-hidden">
      <div className="flex logo-scroll">
        <div className="flex shrink-0">
          {logos.map((logo, index) => (
            <span
              key={`logo-1-${index}`}
              className="text-background font-bold text-xl md:text-2xl px-8 whitespace-nowrap"
            >
              {logo}
            </span>
          ))}
        </div>
        <div className="flex shrink-0">
          {logos.map((logo, index) => (
            <span
              key={`logo-2-${index}`}
              className="text-background font-bold text-xl md:text-2xl px-8 whitespace-nowrap"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoRollingSection;

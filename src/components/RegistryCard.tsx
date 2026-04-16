

export const RegistryCard = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 mt-8 backdrop-blur-md bg-white/40 border border-[var(--color-brand-wine)]/20 shadow-xl relative overflow-hidden group w-full max-w-lg mx-auto rounded-[2rem]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
      <h3 className="font-serif text-3xl md:text-4xl mb-4 tracking-wider text-[var(--color-brand-wine)]">Our Registry</h3>
      <p className="font-sans font-light text-[var(--color-brand-wine)]/80 text-center mb-8 max-w-sm leading-relaxed">
        Your presence is the greatest gift. Should you wish to honor us with a gift, our registry is available below.
      </p>
      <a 
        href="https://www.amazon.com/wedding/guest-view/N8FXCH30SI45" 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-10 py-4 tracking-[0.15em] text-sm uppercase transition-all duration-500 rounded-full border border-[var(--color-brand-hotpink)] text-[var(--color-brand-wine)] hover:bg-[var(--color-brand-hotpink)] hover:text-white hover:shadow-[0_0_20px_rgba(255,70,137,0.4)] font-bold"
      >
        View Registry
      </a>
    </div>
  );
};

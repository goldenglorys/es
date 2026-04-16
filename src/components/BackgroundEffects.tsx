import { MeshGradient } from '@paper-design/shaders-react';

export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0, opacity: 0.85 }}>
      <MeshGradient 
        colors={['#D9C5C8', '#922049', '#FFAECD', '#FDFBF7']} 
        distortion={0.5} 
        swirl={0.7} 
        speed={0.12} 
        style={{ width: '100%', height: '100vh', objectFit: 'cover' }} 
      />
      {/* Blend overlay to keep it soft and integrated with the main background */}
      <div className="absolute inset-0 bg-[var(--color-brand-bg)] mix-blend-overlay opacity-30"></div>
    </div>
  );
};

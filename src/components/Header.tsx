const Header: React.FC = () => {
  return (
    <header>
      <div
        className="relative w-full h-64 bg-cover bg-center bg-black flex items-center justify-center mb-0 border-2 border-gray-400 shadow-lg max-w-4xl mx-auto"
        style={{
          backgroundImage: 'url(/images/BackgroundHomepage.png)',
          filter: 'grayscale(100%) brightness(130%) contrast(80%)',
        }}
      >
        <div className="absolute inset-0 bg-gray-800 bg-opacity-30"></div>

        <div className="relative z-10 text-center">
          <div className="bg-black border-2 border-gray-400 px-6 py-4 inline-block">
            <h1 className="bop-pixel-title bop-pixel-title--hero text-white mb-2">
              BOP
            </h1>
            <h2 className="text-base text-gray-200" style={{ fontFamily: 'Times New Roman, serif' }}>
              Just a board of proof on Robinhood Chain
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import LandingPageButton from '../Buttons/LandingPageButton';

const LandingHeader = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 p-2">
              <img
                src="/icon.png"
                alt=""
                className="h-6 w-6 object-contain text-white"
              />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent">
              Nexify
            </span>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
            >
              Contact
            </a>
            <LandingPageButton type />
          </div>

          <LandingPageButton type className="md:hidden" />
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader;

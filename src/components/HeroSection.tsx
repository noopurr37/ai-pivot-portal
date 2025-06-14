
const HeroSection = () => (
  <section className="w-full bg-gradient-to-r from-indigo-800 via-blue-900 to-slate-900 text-white py-16 px-8 rounded-b-2xl shadow-md animate-fade-in">
    <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
      <h1 className="text-5xl font-extrabold tracking-tight mb-2 drop-shadow-lg">
        <span className="text-gradient bg-gradient-to-tr from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
          AI Portfolio & Skillset
        </span>
      </h1>
      <h2 className="text-xl md:text-2xl font-medium text-slate-200 mb-2">
        Innovation&nbsp;&bull;&nbsp;ML Engineering&nbsp;&bull;&nbsp;Realtime Demos
      </h2>
      <p className="text-slate-300 text-lg md:text-xl">
        Showcasing projects, research, and tools at the intersection of technology and intelligence.
      </p>
      <button className="mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-700 to-purple-600 hover:from-purple-600 hover:to-blue-700 transition text-white text-lg font-semibold shadow-xl hover-scale">
        Get In Touch
      </button>
    </div>
  </section>
);

export default HeroSection;

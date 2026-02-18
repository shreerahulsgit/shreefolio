function splineMasking({ splineLoaded, bottom = 20, right = 20 }) {
  return (
    <div
      className={`fixed z-[1] transition-all duration-300 ${
        splineLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        bottom: `${bottom}px`,
        right: `${right}px`,
      }}
    >
      <div className="bg-black/30 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10 shadow-2xl">
        <p className="text-white text-sm font-medium">@ Code by Shree Rahul</p>
      </div>
    </div>
  );
}

export default splineMasking;

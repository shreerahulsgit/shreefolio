function splineMasking({ splineLoaded }) {
    return (
        <div
            className={`fixed bottom-4 right-4 z-30 transition-all duration-0 ${
                splineLoaded
                    ? 'opacity-100'
                    : 'opacity-0'
            }`}
        >
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10 shadow-2xl">
                <p className="text-white text-sm font-medium">
                    @ Code by Shree Rahul
                </p>
            </div>
        </div>
    )
};

export default splineMasking;
function loadingOverlay({ message }) {
    return (
        <div
            className="fixed inset-0 backdrop-blur-md z-[100] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(34, 34, 34, 0.5)' }}
        >
            <div
                className="flex flex-col items-center p-8 rounded-3xl backdrop-blur-xl"
                style={{
                    backgroundColor: 'rgba(248, 248, 248, 0.025)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(248, 248, 248, 0.2)',
                }}
            >
                <div
                    className="w-16 h-16 border-2 rounded-full animate-spin mb-6"
                    style={{
                        borderColor: 'rgba(248, 248, 248, 0.2)',
                        borderTopColor: 'rgba(248, 248, 248, 0.8)',
                    }}
                ></div>
                <p
                    className="text-lg font-medium mb-2"
                    style={{ color: '#F8F8F8' }}
                >
                    Loading Interactive Experience...
                </p>
                <p className="text-sm" style={{ color: '#7B7B7B' }}>
                    {message}
                </p>
            </div>
        </div>
    );
}

export default loadingOverlay;
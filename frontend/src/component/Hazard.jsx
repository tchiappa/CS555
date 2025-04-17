export function Hazard({ hazard, onChooseOption, onClose }) {
    if (!hazard) return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    };

    const modalStyle = {
        backgroundColor: '#000000',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        width: '90%',
    };

    const titleStyle = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
    };

    const descriptionStyle = {
        marginBottom: '1rem',
    };

    const optionButtonStyle = {
        width: '100%',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        backgroundColor: '#3b82f6',
        color: '#fff',
        border: 'none',
        borderRadius: '0.375rem',
        cursor: 'pointer',
    };

    const outcomeStyle = {
        marginTop: '1rem',
        fontWeight: '600',
    };

    const continueButtonStyle = {
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#16a34a',
        color: '#fff',
        border: 'none',
        borderRadius: '0.375rem',
        cursor: 'pointer',
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2 style={titleStyle}>{hazard.name}</h2>
                <p style={descriptionStyle}>{hazard.description}</p>

                {!hazard.resolved ? (
                    <div>
                        {hazard.options.map((opt, idx) => (
                            <button
                                key={idx}
                                style={optionButtonStyle}
                                onClick={() => onChooseOption(opt)}
                            >
                                {opt.text}
                            </button>
                        ))}
                    </div>
                ) : (
                    <>
                        <p style={outcomeStyle}>{hazard.resolved}</p>
                        <button style={continueButtonStyle} onClick={onClose}>
                            Continue
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
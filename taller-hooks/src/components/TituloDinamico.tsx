import { useState, useEffect } from 'react';

function TituloDinamico() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Titulo dinamico: ${count}`;
    }, [count]);

    return (
        <button onClick={() => setCount(count + 1)}>
            Incrementar ({count})
        </button>
    );
}

export default TituloDinamico;
import { useState } from 'react';

interface ContadorProps {
    init?: number;
}

function Contador({init=0}:ContadorProps) {
    const [count, setCount] = useState(init);

    return (
        <div>
            <p>Contador: {count}</p>
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
            <button onClick={() => setCount(count - 1)}>Decrementar</button>
        </div>
    );
}

export default Contador;
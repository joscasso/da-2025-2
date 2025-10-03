import { useState, useEffect } from 'react';

function Temporizador() {
    const [segundos, setSegundos] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setSegundos(s => s + 1);
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);

    return <p>Segundos: {segundos}</p>;
}

export default Temporizador;
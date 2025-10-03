import { useState, useEffect } from 'react';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setUsuarios(data));
    }, []);

    return (
        <ul>
            {usuarios.map(u => <li className='bg-amber-400' key={u["id"]}>{u["name"] + " (" + u["email"] + ")"}</li>)}
        </ul>
    );
}

export default Usuarios;
//import React from 'react';
import styles from './Greeting.module.css';

interface GreetingProps {
    name: string;
    title?: string;
}

function Greeting({name, title='Desconocido'}:GreetingProps){
    /*const titleStyle = {
        color: 'red',
        fontFamily: 'sans-serif'
    }*/

    return (
        <div>
            <h2 className={styles.titleEjemplo}>Hola, {(title ? title + ' ': '') + name}</h2>
        </div>
    )
}

export default Greeting;
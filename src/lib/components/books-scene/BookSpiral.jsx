import React from 'react';
import InteractiveBook from './InteractiveBook';
import { Float } from '@react-three/drei';

const BookSpiral = ({ books, activeBook, onSelect }) => {
    return (
        <group>
            {books.map((book, i) => (
                <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <InteractiveBook 
                        book={book} 
                        index={i} 
                        total={books.length} 
                        isActive={activeBook === book}
                        isAnyActive={!!activeBook}
                        onSelect={onSelect}
                    />
                </Float>
            ))}
        </group>
    );
};

export default BookSpiral;

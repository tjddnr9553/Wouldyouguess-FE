import { create } from 'zustand'

export const useColorStore = create((set)=>({
    color : 'VALUE',
    setColor : (color, contextRef) => {
        set( {color: color} );
        contextRef.current.strokeStyle = color;
    }
}))

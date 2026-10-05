import { useEffect, useRef } from "react";

export const UseControls = () => {
    const keys = useRef(new Set<string>());

    useEffect(()=> {
        const down = (e: KeyboardEvent) => {
            if (['ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
            keys.current.add(e.code);
        }
        const up = (e: KeyboardEvent) => keys.current.delete(e.code);

        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        return () => {
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', up);
        }
    }, [])
    return keys;
}

export default UseControls;

import { useEffect, useState } from 'react';
import './index.css';
import { tickScreen } from '../../helpers/commom';
import type { ScreenPlayProps } from '../../types/types';

type ButtonPlayProps = ScreenPlayProps & {
    onClick: () => void;
};

const ButtonPlay = ({ playing, ...rest }: ButtonPlayProps) => {
    const [isButtonVisible, setIsButtonVisible] = useState(true);

    useEffect(() => {
        return tickScreen(setIsButtonVisible, 200);
    }, [playing]);

    return (
        (!playing)
            ? (
                <button
                    className="button-play"
                    style={{ opacity: isButtonVisible ? 1 : 0 }}
                    {...rest}>
                    Clique para começar
                </button >
            ) :
            <div ></div>
    );
}

export default ButtonPlay;

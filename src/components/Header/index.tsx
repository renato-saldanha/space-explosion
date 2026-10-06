
import { useEffect, useState } from 'react';
import { tickScreen } from '../../helpers/commom';

import './index.css';

import type { ScreenPlayProps } from '../../types/types';


const Header = ({ playing }: ScreenPlayProps) => {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    useEffect(() => {
        return tickScreen(setIsHeaderVisible, 1000);
    }, [playing]);

    return (
        (!playing && isHeaderVisible)
            ? (
                <header className="header-contanier">
                    SPACE EXPLOSION
                </header >
            ) :
            <div></div>
    );
}

export default Header;

import React from 'react';
import GameItem from "./GameItem";
import {observer} from "mobx-react-lite";
import "../styles/gameList.css"

const GameList = observer( ({games, className, style, ...props}) => {
    return (
        <div className={"game-list " + className} style={style} {...props}>
            {games.map(game =>
                <GameItem
                    key={game.id}
                    game={game}
                />
            )}
        </div>
    );
});

export default GameList;

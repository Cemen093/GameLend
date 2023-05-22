import React from 'react';
import GameItem from "./GameItem";
import {observer} from "mobx-react-lite";
import "../styles/gameList.css"

const GameList =  ({games, className, style, isLoading, buttons, ...props}) => {

    if (isLoading){
        return (
        <div className={"game-list " + className} style={style} {...props}>
            {[...Array(10)].map((_,i) => <GameItem key={i} isLoading={true}/>)}
        </div>
        )
    }

    if (!games){
        return <div>invalid games</div>
    }

    return (
        <div className={"game-list " + className} style={style} {...props}>
            {games.map(game => <GameItem key={game.id} game={game} buttons={buttons}/>)}
        </div>
    );
};

export default observer(GameList);

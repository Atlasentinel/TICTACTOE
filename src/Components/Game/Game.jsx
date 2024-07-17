import { useState, useEffect } from "react";
import "./Game.css";
import Row from "../Row/Row";
import clickSound from "../sounds/click.mp3";
import winSound from "../sounds/win.mp3";
import Icon from "../Icons/Infos"

export default function Game() {
    const [playerOne, setPlayerOne] = useState(localStorage.getItem("Player1") || "Player 1");
    const [playerTwo, setPlayerTwo] = useState(localStorage.getItem("Player2") || "Player 2");
    const [grid, setGrid] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);

    const [currentPlayer, setCurrentPlayer] = useState('❤️');
    const [gameMessage, setGameMessage] = useState('');
    const [audio] = useState(new Audio(clickSound));
    const [audio1] = useState(new Audio(winSound));

    useEffect(() => {
        localStorage.setItem("Player1", playerOne);
        localStorage.setItem("Player2", playerTwo);
    }, [playerOne, playerTwo]);

    const handlePlayerOne = (e) => {
        setPlayerOne(e.target.value);
    };

    const handlePlayerTwo = (e) => {
        setPlayerTwo(e.target.value);
    };

    const checkWinner = (grid, player) => {
        for (let i = 0; i < 3; i++) {
            // Vérification des lignes
            if (grid[i][0] === player && grid[i][1] === player && grid[i][2] === player) {
                return true;
            }
            // Vérification des colonnes
            if (grid[0][i] === player && grid[1][i] === player && grid[2][i] === player) {
                return true;
            }
        }
        // Vérification des diagonales
        if (grid[0][0] === player && grid[1][1] === player && grid[2][2] === player) {
            return true;
        }
        if (grid[0][2] === player && grid[1][1] === player && grid[2][0] === player) {
            return true;
        }

        let isGridFull = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i][j] === '') {
                    isGridFull = false;
                    break;
                }
            }
            if (!isGridFull) break;
        }
        if (isGridFull) {
            // Si la grille est pleine et personne n'a gagné, c'est un match nul
            setGameMessage("Match nul !");
            setGrid([
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ]);
            setCurrentPlayer('❤️'); // Réinitialiser pour le prochain jeu
            window.location.reload();
            return false;
        }

        // Aucun gagnant trouvé
        return false;
    };

    const handleInfosMessage = () => {
        setGameMessage("💻 by Atlasentinel © 2024 ");
    };


    const handleClick = (index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;

        if (grid[row][col] === '') {
            const newGrid = [...grid];
            newGrid[row][col] = currentPlayer;
            audio.play();
            setGrid(newGrid);
            

            // Vérifier si le joueur actuel a gagné
            if (checkWinner(newGrid, currentPlayer)) {
                setGameMessage(`${currentPlayer} ${currentPlayer === '❤️' ? playerOne : playerTwo} a gagné !`);
                setGrid([
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ]);
                setCurrentPlayer('❤️');
                audio1.play();
                return;
            }

            // Passer au joueur suivant
            setCurrentPlayer(currentPlayer === '❤️' ? '☢️' : '❤️');
        }
    };

    return (
        <div className="GameMenu">
            <h1>TIC-TAC-TOE</h1>

            <div className="Menu">
                <div className="pseudo">
                    <span>Joueur ❤️: {playerOne}</span>
                    <span>Joueur ☢️: {playerTwo}</span>
                </div>
                <div className="pseudo-input">
                    <input
                        className="input-text"
                        type="text"
                        value={playerOne}
                        onChange={handlePlayerOne}
                        placeholder="Player 1"
                    />
                    <input
                        className="input-text"
                        type="text"
                        value={playerTwo}
                        onChange={handlePlayerTwo}
                        placeholder="Player 2"
                    />
                </div>
                <div className="Game">
                    {grid.map((row, index) => (
                        <Row key={index} cells={row} onClick={(cellIndex) => handleClick(index * 3 + cellIndex)} />
                    ))}
                </div>
                <div className="settings">
                    <span className="span-settings">
                    {!gameMessage && ( <span>
                        C'est au tour de : {currentPlayer} {currentPlayer === '❤️' ? playerOne : playerTwo}
                      
                    </span>
                         
                    )}
                       {gameMessage && <p>{gameMessage}</p>}
                       <a class="infos" onClick={handleInfosMessage}><Icon /></a>
                       <a class="reload" href="./">REJOUER</a>
                    </span>
                    
                     
                </div>
            </div>
        </div>
    );
}

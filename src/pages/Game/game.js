import { Link } from 'react-router-dom';
import Button from '~/components/Button/btn';
function Game() {
    return (
        <div className="game-content">
            <h1>Game</h1>
            <div>
               <Button href={'/word'}>Word Association</Button> 
            </div>
            <div>
            <Button href={'/fillinblank'}>Fill In Blank</Button>
            </div>
            <div>
            <Button href={'/fillinblankcrud'}>Fill In Blank Management</Button>
            </div>
            <div>
                <video src="http://res.cloudinary.com/dcbt4j7z2/video/upload/v1678783820/EnglishWeb/zvuvsuqaxobuyheh4hxe.mp4"></video>
            </div>
        </div>
    );
}

export default Game;

import { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const AudioPlayer = ({ src }) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = () => {
        if (sound) {
            setIsPlaying(!isPlaying);
            if (isPlaying) {
                sound.pause();
            } else {
                sound.play();
            }
        }
    };

    useEffect(() => {
        if (!sound) {
            setSound(new Howl({ src }));
        }
    }, []);

    return (
        <div>
            <div>
                {isPlaying ? (
                    <FontAwesomeIcon icon={faPause} onClick={handleClick} />
                ) : (
                    <FontAwesomeIcon icon={faPlay} onClick={handleClick} />
                )}
            </div>

        </div>
    );
};

export default AudioPlayer;
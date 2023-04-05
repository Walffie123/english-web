import React, { useState, useRef } from 'react';
import { Howl, Howler } from 'howler';

const AudioPlayer = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handleClick = () => {
        if (!isPlaying) {
            if (audioRef.current) {
                // Tạm dừng âm thanh cũ trước khi phát âm thanh mới
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            // Bắt đầu AudioContext trong hàm xử lý sự kiện onClick
            if (audioRef.current) {
                audioRef.current.play();
            }
            if (Howler.ctx.state === 'suspended') {
                Howler.ctx.resume();
            }

            // Tạo đối tượng Howl để phát nhạc
            const sound = new Howl({
                src: src,
                onplay: () => {
                    setIsPlaying(true);
                },
                onend: () => {
                    setIsPlaying(false);
                },
                onpause: () => {
                    setIsPlaying(false);
                },
                onstop: () => {
                    setIsPlaying(false);
                },
            });
            sound.play();
        } else {
            // Dừng nhạc
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <button onClick={handleClick}>{isPlaying ? 'Dừng' : 'Phát'}</button>
            <audio ref={audioRef} src={src} />
        </div>
    );
};

export default AudioPlayer;

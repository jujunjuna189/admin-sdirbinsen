import { useEffect, useRef, useState } from "react";

const AudioPlayer = (props) => {
    const trackRef = useRef();
    const [audio, setAudio] = useState(props.source ? new Audio(props.source ?? '') : '');
    const [audioPlayer, setAudioPlayer] = useState({
        timer: 0,
        play: false,
    });

    const onSetAudioPlayer = (field, value) => {
        setAudioPlayer({ ...audioPlayer, [field]: value });
    };

    const onPlay = () => {
        if (audio !== '') {
            audio.play();
            audioPlayer.play = true;
            audioPlayer.timer = audio.currentTime;
            audioPlayer.track = countTrack(audio.currentTime, audio.duration);
            setAudioPlayer({ ...audioPlayer });

            audioPlayer.interval = setInterval(() => {
                audioPlayer.timer = audio.currentTime;
                ((trackRef.current || {}).style || {}).width = `${countTrack(audio.currentTime, audio.duration)}%`;
                setAudioPlayer({ ...audioPlayer });

                // close interval
                if (audioPlayer.timer >= audio.duration) {
                    clearInterval(audioPlayer.interval);
                    audioPlayer.play = false;
                    setAudioPlayer({ ...audioPlayer });
                }
            }, 100);
        }
    }

    const onPause = () => {
        audio.pause();
        clearInterval(audioPlayer.interval);
        onSetAudioPlayer("play", false);
    }
    const countTrack = (current, duration) => {
        const total = (current / duration) * 100;
        return total;
    }

    useEffect(() => {
        var audio = new Audio(props.source)
        props.source && setAudio(audio);
        return (() => {
            audio.pause();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.source]);

    return (
        <div className="border rounded-[100px] w-full px-[20px] py-[10px] flex gap-2 items-center">
            {audio !== '' && (
                <div className="grow flex gap-2 items-center">
                    {!audioPlayer.play && (
                        <span className="cursor-pointer" onClick={() => onPlay()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" strokeWidth="0" fill="currentColor" />
                            </svg>
                        </span>
                    )}
                    {audioPlayer.play && (
                        <span className="cursor-pointer" onClick={() => onPause()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>
                        </span>
                    )}
                    <div className="grow">
                        <div className="rounded-full w-full bg-red-200">
                            <div className={`rounded-full p-1 w-0 bg-red-600`} ref={trackRef} />
                        </div>
                    </div>
                </div>
            )}
            {audio === '' && (
                <span>Audio tidak ditemukan...</span>
            )}
        </div>
    );
}

export default AudioPlayer;
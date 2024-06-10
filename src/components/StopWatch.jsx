import { useEffect, useRef, useState } from 'react';
import styles from './StopWatch.module.css';

function StopWatch() {

    let [isRunning, setIsRunning] = useState(false);
    let [elapsedTime, setElapsedTime] = useState(0);
    let intervalIdRef = useRef(null);
    let startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning])

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setIsRunning(false);
        setElapsedTime(0);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${milliseconds < 10 ? '0' + milliseconds : milliseconds}`;
    }

    return (
        <div className={styles.container}>
            <div className={styles.time}>{formatTime()}</div>
            <div className={styles.controls}>
                <button className={styles.start} onClick={start}>Start</button>
                <button className={styles.stop} onClick={stop}>Stop</button>
                <button className={styles.reset} onClick={reset}>Reset</button>
            </div>
        </div>
    )
}

export default StopWatch
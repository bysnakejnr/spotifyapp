import React from "react";
import styles from './Tracklist.module.css'
function Tracklist () {
    return (
        <div className={styles.Tracklist}>
            {/* <!-- You will add a map method that renders a set of Track components  --> */}
            <li>Track 1</li>
            <li>Track 2</li>
            <li>Track 3</li>
            <li>Track 4</li>
        </div>
    );
}

export default Tracklist;
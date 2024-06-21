import React from "react";
import styles from './Tracklist.module.css'
import Track from '../Track/Track'
function Tracklist (props) {
    return (
        <div className={styles.Tracklist}>
            {props.userSearchResults.map(track=>(
                <Track track={track} key={track.id} onAdd={props.onAdd} isRemoval={props.isRemoval} onAdd={props.onAdd} onRemove={props.onRemove} />
            ))}
            <li>Track 1</li>
            <li>Track 2</li>
            <li>Track 3</li>
            <li>Track 4</li>
        </div>
    );
}

export default Tracklist;
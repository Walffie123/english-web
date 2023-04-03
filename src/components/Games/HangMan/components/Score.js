import React from 'react'

const Score = ({ score, len, words }) => {
    return (
        <>
            <h3>Score: {score}/{words.length}</h3>
            <h3>{len} questions left</h3>
        </>
    )
}

export default Score
import React from 'react'

const Score = ({ score, len, words }) => {
    return (
        <>
            <h3>Score: {score}/{words.length}</h3>
            <h4>({len} questions left)</h4>
        </>
    )
}

export default Score
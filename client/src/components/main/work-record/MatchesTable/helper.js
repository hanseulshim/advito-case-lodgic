import React from 'react'

const getColor = (score) => {
	console.log(score)
	return score >= 75 ? 'green' : score < 75 && score >= 50 ? '' : 'red'
}

const Confidence = ({ score }) => {
	return (
		<div style={{ color: getColor(score), fontSize: '1em' }}>
			<span>{score}%</span>
		</div>
	)
}

export const getConfidence = (score) => <Confidence score={score} />

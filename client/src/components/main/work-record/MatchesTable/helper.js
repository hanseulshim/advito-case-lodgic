import React from 'react'
import { formatPercent } from 'helper'

const getColor = (score) =>
	score >= 0.75 ? 'green' : score < 0.75 && score >= 0.5 ? 'black' : 'red'

const Confidence = ({ score }) => {
	return (
		<div style={{ color: getColor(score), fontSize: '.8em' }}>
			<span> {formatPercent(score)}</span>
		</div>
	)
}

export const getConfidence = (score) => <Confidence score={score} />

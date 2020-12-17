import React from 'react'
import './index.css'

export const InfoBox = (props) => {
  const { name, ranking, score } = props
  
  const formattedName = name 
    ? [name.first, name.last].filter((namePart) => !!namePart).join(' ')
    : 'Unknown'

  const formattedRank = ((rank) => {
    if(rank === 1) return '1st'
    if(rank === 2) return '2nd'
    if(rank === 3) return '3rd'
    if(rank > 10) return '> 10th'
    if(!rank) return 'Unknown'
    return `${rank}th`
  })(ranking)
  
  const formattedScore = score || 'Unknown'

  return (
    <ul className="InfoBox">
      <li>{formattedName || 'Unknown'}</li>
      <li>Rank: {formattedRank}</li>
      <li>Score: {formattedScore}</li>
    </ul>
  )
}
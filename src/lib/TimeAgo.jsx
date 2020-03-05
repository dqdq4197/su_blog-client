import React from 'react'
import ReactTimeAgo from 'react-time-ago/tooltip'
 
export default function TimeAgo({ date }) {
  let newDate = new Date(date).getTime()
  return (  
    <div>
      <ReactTimeAgo style={{pointerEvents: 'none'}} date={newDate} locale="ko"/>
    </div>
  )
} 
import React from 'react'

function Skeleton() {
  return (
    <div className="flex flex-col gap-4 h-64 min-w-72 max-w-96">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  )
}

export default Skeleton
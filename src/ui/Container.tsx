import React from 'react'

interface Props {
   children : React.ReactNode,
   className ?: string

}

export const Container = ({className , children} : Props) => {
  return (
    <div className={`${className} mx-auto max-w-[1280px] px-4`}>
       {children}
    </div>
  )
}

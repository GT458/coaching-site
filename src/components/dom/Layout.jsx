import { useRef, forwardRef, useImperativeHandle } from 'react'
import ResponsiveAppBar from '../navigation/NavBar'

const Layout = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)

  return (
    <div
      {...props}
      ref={localRef}
      className='absolute top-0 left-0 h-screen w-screen overflow-scroll bg-zinc-300'>
      <ResponsiveAppBar />
      {children}
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout

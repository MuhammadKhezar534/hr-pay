import { useEffect, useState } from 'react'
import { Grid } from 'antd'

const { useBreakpoint } = Grid
const useScreenSize = () => {
  const { md, sm, xs } = useBreakpoint()
  const [screenSize, setscreenSize] = useState('')
  useEffect(() => {
    if (!xs && sm && md) {
      // medium
      setscreenSize('md')
    } else if (!xs && sm && !md) {
      // small
      setscreenSize('sm')
    } else if (xs && !sm && !md) {
      // extra small
      setscreenSize('xs')
    }
  }, [xs, sm, md])
  return screenSize
}
export default useScreenSize

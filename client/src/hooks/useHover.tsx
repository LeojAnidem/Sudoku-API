import { useEffect, useRef, useState } from "react";

export const useHover = () => {
  const [isHovered, setHovered] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseOver = () => setHovered(true);
    const handleMouseOut = () => setHovered(false);

    const node = ref.current

    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)
    }

    return () => {
      if (node) {
        node.addEventListener('mouseover', handleMouseOver)
        node.addEventListener('mouseout', handleMouseOut)
      }
    }

  }, [])
  return [ref, isHovered]
}
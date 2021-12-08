import React, { useEffect } from "react"

const SelectExchangeItem = ({ item }) => {
  useEffect(() => {
    console.log(item)
  }, [item])

  return (
    <div>
      <p>{item.title}</p>
      <p>{item.description}</p>
    </div>
  )
}

export default SelectExchangeItem

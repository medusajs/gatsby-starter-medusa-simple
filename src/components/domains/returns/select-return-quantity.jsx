import React from "react"
import QuantitySelector from "../../quantity-selector"

const SelectReturnQuantity = ({ item }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-16 w-auto object-cover object-center mr-4 rounded-md"
        />
        <div>
          <p>{item.title}</p>
          <p>
            <span className="text-ui-dark">Variant: </span> {item.description}
          </p>
        </div>
      </div>
      <QuantitySelector quantity={1} />
    </div>
  )
}

export default SelectReturnQuantity

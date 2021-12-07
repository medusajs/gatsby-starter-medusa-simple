import React from "react"
import { formatPrice } from "../../../utils/format-price"

const SelectReturnItem = ({ item, currencyCode }) => {
  return (
    <div>
      <div className="relative rounded-md overflow-hidden w-full h-auto">
        <input
          type="checkbox"
          className="absolute top-4 right-4 mr-0 checkbox-ui"
          id={item.id}
        />
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-auto object-cover object-center"
        />
      </div>
      <div className="flex items-center justify-between mt-3 text-md">
        <p className="font-normal">{item.title}</p>
        <p className="font-semibold">
          {formatPrice(item.unit_price, currencyCode)}
        </p>
      </div>
    </div>
  )
}

export default SelectReturnItem

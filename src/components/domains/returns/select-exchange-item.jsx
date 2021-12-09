import React, { useEffect, useState } from "react"
import Arrow from "../../../icons/arrow.svg"
import { classNames } from "../../../utils/class-names"
import QuantitySelector from "../../quantity-selector"

const SelectExchangeItem = ({
  item,
  getExchangeOptions,
  removeExchangeItem,
  addExchangeItem,
}) => {
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(false)
  const [quantity, setQuantity] = useState(item.quantity)
  const [variantId, setVariantId] = useState(null)

  useEffect(() => {
    const res = getExchangeOptions(item)

    if (res.length) {
      setOptions(res)
      setVariantId(res[0].id)
    }

    return () => {}
  }, [item, getExchangeOptions])

  const handleSelect = e => {
    const id = e.target.value
    setVariantId(id)
  }

  useEffect(() => {}, [variantId, quantity])

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="checkbox-ui mr-2"
          defaultChecked={selected}
          onChange={() => setSelected(!selected)}
        />
        <div
          className={classNames(
            selected ? "opacity-100" : "opacity-50",
            "flex items-center"
          )}
        >
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
      </div>
      <span className={classNames(selected ? "opacity-100" : "opacity-50")}>
        <img src={Arrow} alt="arrow" className="w-6 h-auto" />
      </span>
      <div
        className={classNames(
          selected ? "opacity-100" : "opacity-50 pointer-events-none",
          "flex items-center"
        )}
      >
        <select
          className="rounded-lg shadow border-none mr-2"
          onChange={handleSelect}
        >
          {options.map(o => {
            return (
              <option key={o.id} value={o.id}>
                {o.title}
              </option>
            )
          })}
        </select>
        <QuantitySelector
          quantity={quantity}
          increment={() => setQuantity(quantity + 1)}
          decrement={() => setQuantity(quantity - 1)}
        />
      </div>
    </div>
  )
}

export default SelectExchangeItem

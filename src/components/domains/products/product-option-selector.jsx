import React from "react"
import { classNames } from "../../../utils/class-names"

const ProductOptionSelector = ({ option, current, updateOption }) => {
  return (
    <div className="text-sm">
      <p className="font-medium mb-2">Select {option.title}</p>
      <div>
        {option.values.map((v, index) => {
          return (
            <button
              key={index}
              className={classNames(
                v.value === current
                  ? "bg-ui-dark text-white"
                  : "bg-ui hover:bg-ui-dark hover:text-white",
                "inline-flex items-center justify-center rounded-sm text-xs h-12 w-12 mr-2 last:mr-0 hover:bg-ui-dark hover:text-white"
              )}
              onClick={() => updateOption({ [option.id]: v.value })}
            >
              {v.value}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProductOptionSelector

import React from "react";
import * as F7 from "framework7-react";

const SmartSelectListItem = ({
  title,
  options,
  icon = "material:keyboard_arrow_down",
  smartSelectParams,
  ...rest
}) => {
  return (
    <F7.ListItem
      smartSelect
      smartSelectParams={smartSelectParams}
      children={
        <>
          <F7.Icon slot="media" md={icon} />
          <span className="item-title">{title}</span>
          <select {...rest}>
            {options.map((optgroup, index) => (
              <optgroup label={optgroup.label} key={index}>
                {optgroup.items.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    selected={item.selected}
                  >
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </>
      }
    />
  );
};

export default SmartSelectListItem;

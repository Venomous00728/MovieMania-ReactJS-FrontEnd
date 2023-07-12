import React from "react";
import "../../Style/genreListPurple.css";
import "../../Style/DarkTheme/genreListDark.css";
import "../../Style/LightTheme/genreListLight.css";
const GenreList = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
  mode,
}) => {
  return (
    <div className="forBorder">
      <ul className={`listContainer${mode} ml-1`}>
        {items.map((item) => (
          <li
            onClick={() => onItemSelect(item)}
            key={item[valueProperty]}
            className={
              selectedItem === item
                ? `itemContainer${mode} myActive${mode}`
                : `itemContainer${mode} myInActive${mode}`
            }
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};

GenreList.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default GenreList;

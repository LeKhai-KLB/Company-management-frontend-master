import "./SearchBar.scss";
import { Input } from "../Elements/Input";
import { ChangeEvent } from "react";
import { debounce } from "lodash";
import { TElementProps } from "~/utils/mixins.type";
import { clsx } from "clsx";

export type TSearchBarProps = TElementProps & {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export const SearchBar = ({
  onChange,
  placeholder,
  className,
  style,
}: TSearchBarProps) => {
  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange && onChange(val);
  }, 300);

  return (
    <div className={clsx("search-bar", className)} style={style}>
      <i className="icon-search" />
      <Input
        onChange={handleChange}
        sizeKey={["extra-small", "small"]}
        className={clsx("input--app-style", "search-bar__input")}
        placeholder={placeholder}
        activeForcus={false}
      />
    </div>
  );
};

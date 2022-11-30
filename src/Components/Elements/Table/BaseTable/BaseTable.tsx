import clsx from "clsx";
import { CSSProperties, useEffect, useState } from "react";
import { TWrapperProps } from "~/utils/mixins.type";
import { Spinner } from "../../Spinner";
import "./BaseTable.scss";

type TTableColumn<Entry> = {
  title: string;
  field?: keyof Entry;
  Cell?: ({ entry }: { entry: Entry }) => JSX.Element;
  conditionField?: string;
  conditionValue?: string | number;
  style?: CSSProperties;
};

export type TBaseTableProps<Entry> = TWrapperProps & {
  data?: Array<Entry> | null | undefined;
  activeField?: string;
  activeValue?: any;
  columns: Array<TTableColumn<Entry>>;
  loading?: boolean;
};

function setNewTableData<Entry>(
  data?: Entry[],
  activeField?: string,
  activeValue?: any,
) {
  if (!data || !data.length) {
    return [];
  }
  if (!activeField) {
    return data;
  }
  const handleData = JSON.parse(JSON.stringify(data));
  const newSortData = handleData.sort((a: Entry, b: Entry) => {
    if (!activeValue) {
      if (a[activeField] && !b[activeField]) return -1;
      else if (!a[activeField] && b[activeField]) return 1;
      else return 0;
    } else {
      if (a[activeField] === activeValue && b[activeField] !== activeValue) {
        return -1;
      } else if (
        a[activeField] !== activeValue &&
        b[activeField] === activeValue
      ) {
        return 1;
      } else {
        return 0;
      }
    }
  });
  return newSortData;
}

function checkActiveField<Entry>(
  entry: Entry,
  activeField?: string,
  activeValue?: string,
) {
  if (!activeField) return false;
  if (!activeValue) {
    return entry?.[activeField];
  } else {
    return entry?.[activeField] === activeValue;
  }
}

export const BaseTable = <Entry,>({
  data,
  columns,
  activeField,
  activeValue,
  className,
  style,
  loading,
}: TBaseTableProps<Entry>) => {
  const [currentData, setCurrentData] = useState(
    setNewTableData(data, activeField, activeValue),
  );

  useEffect(() => {
    setCurrentData(setNewTableData(data, activeField, activeValue));
  }, [data, activeField, activeValue]);

  return (
    <div className={"base-table-container"}>
      <table className={clsx("base-table", className)} style={style}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={column.title + index} scope="col" style={column.style}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        {currentData && currentData.length !== 0 && (
          <tbody>
            {currentData.map((entry, entryIndex) => (
              <tr
                key={entryIndex}
                className={clsx(
                  checkActiveField<Entry>(entry, activeField, activeValue) &&
                    "base-table__tr--active",
                )}>
                {columns.map(
                  (
                    { Cell, field, title, conditionValue, ...column },
                    columnIndex,
                  ) => (
                    <td style={column.style} key={title + columnIndex}>
                      {Cell ? (
                        <Cell entry={entry} />
                      ) : (
                        <span>
                          {entry[field] instanceof Date
                            ? new Date(String(entry?.[field])).toDateString()
                            : entry?.[column.conditionField]
                            ? conditionValue
                            : String(entry?.[field] || "")}
                        </span>
                      )}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {(!currentData || !currentData?.length) && (
        <div className={"base-table__empty-box"}>Empty</div>
      )}
      {loading && (
        <div className={"base-table__loading-box"}>
          <Spinner size={20} color="white" />
        </div>
      )}
    </div>
  );
};

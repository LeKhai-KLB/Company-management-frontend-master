import clsx from "clsx";
import { CSSProperties, useEffect, useState } from "react";
import { TWrapperProps } from "~/utils/mixins.type";
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
  data: Array<Entry>;
  activeField?: string | [string, any];
  columns: Array<TTableColumn<Entry>>;
};

function setNewTableData<Entry>(
  data: Entry[],
  activeField?: string | [string, any],
) {
  if (!data.length) {
    return [];
  }
  if (!activeField) {
    return data;
  }
  const newSortData = data.sort((a: Entry, b: Entry) => {
    if (typeof activeField === "string") {
      if (a[activeField] && !b[activeField]) return -1;
      else if (!a[activeField] && b[activeField]) return 1;
      else return 0;
    } else {
      if (
        a[activeField[0]] === activeField[1] &&
        b[activeField[0]] !== activeField[1]
      ) {
        return -1;
      } else if (
        a[activeField[0]] !== activeField[1] &&
        b[activeField[0]] === activeField[1]
      ) {
        return 1;
      } else {
        return 0;
      }
    }
  });
  // const activeEntry = data[activeEntryIndex];
  // return [
  //   activeEntry,
  //   ...data.filter((_, index) => index !== activeEntryIndex),
  // ];
  return newSortData;
}

function checkActiveField<Entry>(
  entry: Entry,
  activeField: string | [string, any],
) {
  if (typeof activeField === "string") {
    return entry?.[activeField];
  } else {
    return entry?.[activeField[0]] === activeField[1];
  }
}

export const BaseTable = <Entry,>({
  data,
  columns,
  activeField,
  className,
  style,
}: TBaseTableProps<Entry>) => {
  const [currentData, setCurrentData] = useState(
    setNewTableData(data, activeField),
  );

  useEffect(() => {
    setCurrentData(setNewTableData(data, activeField));
  }, [data, activeField]);

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
                  checkActiveField<Entry>(entry, activeField) &&
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
    </div>
  );
};

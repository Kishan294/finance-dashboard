import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parse } from "date-fns";
import React from "react";
import { ImportTable } from "./import-table";

// eslint-disable-entire-line @typescript-eslint/no-explicit-any
type Props = {
  data: string[][];
  onSubmit: (data: any) => void;
  onCancel: () => void;
};

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectedColumnState {
  [key: string]: string | null;
}

export const ImportCard = ({ data, onSubmit, onCancel }: Props) => {
  const [selectedColumnState, setSelectedColumnState] =
    React.useState<SelectedColumnState>({});

  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null,
  ) => {
    setSelectedColumnState((prev) => {
      const newSelectedColumns = { ...prev };
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumnState).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumnState[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumnState[`column_${columnIndex}`] ? cell : null;
          });
          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };
    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];
        if (header != null) {
          acc[header] = cell;
        }
        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      date: format(parse(item.date, dateFormat, new Date()), outputFormat),
    }));
    onSubmit(formattedData);
  };

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Import Transactions
          </CardTitle>
          <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:gap-x-2">
            <Button className="text-sm lg:w-auto" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              disabled={progress < requiredOptions.length}
              onClick={handleContinue}
            >
              Continue ({progress}/{requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumnState={selectedColumnState}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

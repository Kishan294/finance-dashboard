"use client";

import { formatPercentage } from "@/lib/utils";
import React from "react";
import {
  Legend,
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { CategoryTooltip } from "./category-tooltip";

const COLORS = ["#0062ff", "#12c6ff", "#ff647f", "#ff9354"];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export const PieVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart data={data}>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => {
            console.log(payload);
            return (
              <ul className="flex flex-col space-y-2">
                {payload?.map((entry: any, index: number) => (
                  <li
                    key={`legend-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="space-x-1">
                      <span className="text-muted-foreground text-sm">
                        {entry.value}
                      </span>
                      <span className="text-sm">
                        {/* Calculate percentage from the data */}
                        {formatPercentage(
                          (entry.payload.value /
                            data.reduce((sum, item) => sum + item.value, 0)) *
                            100,
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          data={data}
          cx={"50%"}
          cy={"50%"}
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          dataKey={"value"}
          labelLine={false}
          // label={({ percent }: { percent?: number }) =>
          //   percent ? `${(percent * 100).toFixed(0)}%` : ""
          // }
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

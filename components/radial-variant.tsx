"use client";

import { formatCurrency } from "@/lib/utils";
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0062ff", "#12c6ff", "#ff647f", "#ff9354"];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export const RadialVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadialBarChart
        data={data.map((item, index) => ({
          ...item,
          fill: COLORS[index % COLORS.length],
        }))}
        cx={"50%"}
        cy={"35%"}
        barSize={30}
        innerRadius={"40%"}
        outerRadius={"80%"}
        startAngle={90}
        endAngle={-270}
      >
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => {
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
                        {entry.payload.name}
                      </span>
                      <span className="text-sm">
                        {/* Calculate percentage from the data */}
                        {formatCurrency(entry.payload.value)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <RadialBar
          label={{
            position: "insideStart",
            fill: "#fff",
            fontSize: "12px",
          }}
          background
          dataKey="value"
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

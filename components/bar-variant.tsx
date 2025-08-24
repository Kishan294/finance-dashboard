import { format } from "date-fns";
import {
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CustomTooltip } from "./custom-tooltip";

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const BarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(new Date(value), "dd MMM")}
          style={{ fontSize: 12 }}
          tickMargin={16}
        />
        <YAxis axisLine={false} tickLine={false} style={{ fontSize: 12 }} />

        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="income" fill="#3d82f6" className="drop-shadow-sm" />
        <Bar dataKey="expenses" fill="#f43f5e" className="drop-shadow-sm" />
      </BarChart>
    </ResponsiveContainer>
  );
};

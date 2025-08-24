import { format } from "date-fns";
import {
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
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

export const LineVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
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
        <Line
          dataKey="income"
          dot={false}
          stroke="#3d82f6"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
        <Line
          dataKey="expenses"
          dot={false}
          stroke="#f43f5e"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

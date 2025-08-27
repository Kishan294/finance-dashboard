import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <DataGrid />
      <DataCharts />
    </div>
  );
};

export default DashboardPage;

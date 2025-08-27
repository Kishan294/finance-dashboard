import React, { Suspense } from "react";
import { AccountFilter } from "./account-filter";
import { DateFilter } from "./date-filter";

export const Filters = () => {
  return (
    <div className="flex flex-col items-center gap-y-2 lg:flex-row lg:gap-x-2 lg:gap-y-0">
      <Suspense
        fallback={
          <div className="h-10 w-full animate-pulse rounded-md bg-slate-200 lg:w-auto lg:min-w-[200px]" />
        }
      >
        <AccountFilter />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-10 w-full animate-pulse rounded-md bg-slate-200 lg:w-auto lg:min-w-[200px]" />
        }
      >
        <DateFilter />
      </Suspense>
    </div>
  );
};

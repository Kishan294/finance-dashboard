"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useState, Suspense } from "react";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [variants, setVariants] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setVariants(VARIANTS.IMPORT);
    console.log({ results });
    setImportResults(results);
  };

  const onCancelImport = () => {
    setVariants(VARIANTS.LIST);
    setImportResults(INITIAL_IMPORT_RESULTS);
  };

  const newTransaction = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactions = transactionsQuery.data || [];

  const isDisabled =
    transactionsQuery.isLoading || deleteTransactions.isPending;

  if (transactionsQuery.isLoading) {
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex h-[500px] w-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variants === VARIANTS.IMPORT) {
    return (
      <>
        <ImportCard
          data={importResults.data}
          onSubmit={() => {}}
          onCancel={onCancelImport}
        />
      </>
    );
  }

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Transactions History
          </CardTitle>
          <div className="flex flex-col items-center gap-y-2 lg:flex-row lg:gap-x-2">
            <Button
              className="w-full text-sm lg:w-auto"
              onClick={newTransaction.onOpen}
            >
              <Plus className="mr-2 size-4" />
              Add New
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="accountName"
            onDelete={(row) => {
              const ids = row.map((row) => row.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const TransactionsPageWrapper = () => {
  return (
    <Suspense
      fallback={
        <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
          <Card className="border-none drop-shadow-sm">
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent>
              <div className="flex h-[500px] w-full items-center justify-center">
                <Loader2 className="size-6 animate-spin text-slate-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <TransactionsPage />
    </Suspense>
  );
};

export default TransactionsPageWrapper;

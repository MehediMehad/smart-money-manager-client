export default function Loading() {
  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-md bg-muted" />
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
      </div>

      {/* Top section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main progress card */}
        <div className="md:col-span-2 rounded-2xl border bg-card shadow-sm">
          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <div className="h-6 w-24 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-56 animate-pulse rounded-md bg-muted" />
            </div>

            <div className="space-y-3">
              <div className="h-3 w-full animate-pulse rounded-full bg-muted" />
              <div className="flex justify-between">
                <div className="h-4 w-20 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-20 animate-pulse rounded-md bg-muted" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-lg bg-muted/40 p-4 space-y-2">
                  <div className="h-3 w-16 animate-pulse rounded-md bg-muted" />
                  <div className="h-6 w-20 animate-pulse rounded-md bg-muted" />
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="h-5 w-28 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-40 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-36 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </div>

        {/* Quick actions card */}
        <div className="rounded-2xl border bg-card shadow-sm">
          <div className="space-y-4 p-6">
            <div className="h-6 w-28 animate-pulse rounded-md bg-muted" />
            <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="space-y-4 p-6">
          <div className="space-y-2">
            <div className="h-6 w-36 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-52 animate-pulse rounded-md bg-muted" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-2">
                  <div className="h-5 w-24 animate-pulse rounded-md bg-muted" />
                  <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
                </div>
                <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

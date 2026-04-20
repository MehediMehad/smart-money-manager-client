"use client";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="rounded-2xl border border-destructive/30 p-6">
      <h2 className="font-semibold text-destructive">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 rounded-md border px-4 py-2 text-sm"
      >
        Try again
      </button>
    </div>
  );
};

export default Error;

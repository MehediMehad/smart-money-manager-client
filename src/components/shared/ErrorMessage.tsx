import { Card, CardContent } from "../ui/card";

type Props = {
  error?: string;
};

const ErrorMessage = ({ error }: Props) => {
  return (
    <Card className="rounded-2xl border-destructive/40">
      <CardContent className="p-5 text-sm text-destructive">
        {error || "Something went wrong"}
      </CardContent>
    </Card>
  );
};

export default ErrorMessage;

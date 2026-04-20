import { Card, CardContent } from "@/components/ui/card";

type Props = {
  message?: string;
};

const DataNotFount = ({ message }: Props) => {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-8 text-center text-muted-foreground">
        {message || "No data found yet."}
      </CardContent>
    </Card>
  );
};

export default DataNotFount;

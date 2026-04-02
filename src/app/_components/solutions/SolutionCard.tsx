import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2 } from "lucide-react";

const SolutionCard = () => {
  return (
    <Card className="max-w-md rounded-2xl bg-white p-3 shadow-lg ring-primary/10">
      <CardContent className="space-y-5 p-3 items-start ">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Building2 className="size-6" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-primary text-start">ASPC ERP Suite</h3>
          <p className="text-sm text-primary/70">
            Enterprise resource planning for Arab businesses
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary/50">
            Enterprise
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary/50">
            Bilingual
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary/50">
            Cloud-Ready
          </span>
        </div>

        <div className="flex items-center justify-around gap-2">
          <Button variant="link" className="px-0 text-primary">
            Learn More
          </Button>
          <Button className="rounded-lg px-4">
            Request Demo
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;

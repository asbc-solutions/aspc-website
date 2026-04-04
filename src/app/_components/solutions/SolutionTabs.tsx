import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SolutionCard from "./SolutionCard";

const SolutionTabs = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
      <Tabs defaultValue="all" className="w-full flex flex-col items-start">
        <TabsList className="h-auto rounded-full bg-white p-2 gap-2 md:gap-5 flex flex-wrap md:flex-nowrap overflow-x-auto md:overflow-x-visible">
          <TabsTrigger
            value="all"
            className="rounded-full bg-white px-3 md:px-5 py-2 text-xs md:text-sm text-primary cursor-pointer transition-colors hover:bg-primary hover:text-white data-active:bg-primary data-active:text-secondary whitespace-nowrap"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="erp"
            className="rounded-full bg-white px-3 md:px-5 py-2 text-xs md:text-sm text-primary cursor-pointer transition-colors hover:bg-primary hover:text-white data-active:bg-primary data-active:text-secondary whitespace-nowrap"
          >
            ERP
          </TabsTrigger>
          <TabsTrigger
            value="crm"
            className="rounded-full bg-white px-3 md:px-5 py-2 text-xs md:text-sm text-primary cursor-pointer transition-colors hover:bg-primary hover:text-white data-active:bg-primary data-active:text-secondary whitespace-nowrap"
          >
            CRM
          </TabsTrigger>
          <TabsTrigger
            value="cyber-security"
            className="rounded-full bg-white px-3 md:px-5 py-2 text-xs md:text-sm text-primary cursor-pointer transition-colors hover:bg-primary hover:text-white data-active:bg-primary data-active:text-secondary whitespace-nowrap"
          >
            Cyber Security
          </TabsTrigger>
          <TabsTrigger
            value="cloud"
            className="rounded-full bg-white px-3 md:px-5 py-2 text-xs md:text-sm text-primary cursor-pointer transition-colors hover:bg-primary hover:text-white data-active:bg-primary data-active:text-secondary whitespace-nowrap"
          >
            Cloud
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="all"
          className="pt-4 md:pt-6 text-center text-primary/70 w-full"
        >
          <SolutionCard />
        </TabsContent>
        <TabsContent
          value="erp"
          className="pt-4 md:pt-6 text-center text-primary/70 w-full"
        >
          ERP solutions category.
        </TabsContent>
        <TabsContent
          value="crm"
          className="pt-4 md:pt-6 text-center text-primary/70 w-full"
        >
          CRM solutions category.
        </TabsContent>
        <TabsContent
          value="cyber-security"
          className="pt-4 md:pt-6 text-center text-primary/70 w-full"
        >
          Cyber Security solutions category.
        </TabsContent>
        <TabsContent
          value="cloud"
          className="pt-4 md:pt-6 text-center text-primary/70 w-full"
        >
          Cloud solutions category.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SolutionTabs;

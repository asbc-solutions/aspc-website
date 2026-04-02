import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SolutionCard from "./SolutionCard";

const SolutionTabs = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <Tabs defaultValue="all" className="w-full items-start flex-col">
        <TabsList className="h-auto rounded-full bg-white p-2 gap-5 ">
          <TabsTrigger
            value="all"
            className="rounded-full bg-white px-5 py-2 text-primary cursor-pointer transition-colors hover:bg-primary hover:text-white data-active:bg-primary data-active:text-secondary"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="erp"
            className="rounded-full bg-white px-5 py-2 text-primary cursor-pointer transition-colors hover:bg-primary hover:text-white data-active:bg-primary data-active:text-secondary"
          >
            ERP
          </TabsTrigger>
          <TabsTrigger
            value="crm"
            className="rounded-full bg-white px-5 py-2 text-primary cursor-pointer transition-colors hover:bg-primary hover:text-white data-active:bg-primary data-active:text-secondary"
          >
            CRM
          </TabsTrigger>
          <TabsTrigger
            value="cyber-security"
            className="rounded-full bg-white px-5 py-2 text-primary cursor-pointer transition-colors hover:bg-primary hover:text-white data-active:bg-primary data-active:text-secondary"
          >
            Cyber Security
          </TabsTrigger>
          <TabsTrigger
            value="cloud"
            className="rounded-full bg-white px-5 py-2 text-primary cursor-pointer transition-colors hover:bg-primary hover:text-white data-active:bg-primary data-active:text-secondary"
          >
            Cloud
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="pt-6 text-center text-primary/70">
          <SolutionCard />
        </TabsContent>
        <TabsContent value="erp" className="pt-6 text-center text-primary/70">
          ERP solutions category.
        </TabsContent>
        <TabsContent value="crm" className="pt-6 text-center text-primary/70">
          CRM solutions category.
        </TabsContent>
        <TabsContent
          value="cyber-security"
          className="pt-6 text-center text-primary/70"
        >
          Cyber Security solutions category.
        </TabsContent>
        <TabsContent value="cloud" className="pt-6 text-center text-primary/70">
          Cloud solutions category.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SolutionTabs;

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { CardCheckbox } from "@/components/card-checkbox";

export const Route = createFileRoute("/search/")({
  component: SearchPage,
});

export function SearchPage() {
  const formSchema = z.object({
    mobile: z.boolean().default(false).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: true,
    },
  });
  console.log("form", form.getValues());

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
        条件を選択して探そう！
      </h1>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          スポーツを選択
        </h2>
        <div className="flex flex-col">
          <Form {...form}>
            <form className="space-y-6">
              {/* <CheckboxFormItem /> */}
              <FormField
                name="mobile"
                render={({ field }) => (
                  <div className="flex flex-row gap-3 m-0">
                    <CardCheckbox id="fuga" label="hoge" checked />
                    <CardCheckbox id="fuga" label="hoge" checked />
                    <CardCheckbox id="fuga" label="hoge" checked />
                    <CardCheckbox id="piyo" label="hoge" checked />
                  </div>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <Input
            type="search"
            placeholder="Search for sports..."
            className="flex-grow"
          />
          <Button type="submit" className="ml-2 bg-blue-600 hover:bg-blue-700">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </main>
  );
}

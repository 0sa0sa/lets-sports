import { CardCheckbox } from "@/components/card-checkbox";
import { FormField, FormItem } from "@/components/ui/form";

type Props = {
  name: 'sports' | 'place' | 'date'
}

export function CheckboxFormItem() {
  return (
    <FormField
      name="mobile"
      render={({ field }) => (
        <FormItem>
          {/* <FormControl> */}
          <CardCheckbox id="fuga" label="hoge" checked />
          {/* <Checkbox
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                /> */}
          {/* </FormControl> */}
          {/* <div className="space-y-1 leading-none">
                <FormLabel>Badminton</FormLabel>
              </div> */}
        </FormItem>
      )}
    />
  );
}

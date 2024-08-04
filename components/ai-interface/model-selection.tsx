"use client";

import React, { useContext } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MetaIcon from "../icons/meta";
import MistralIcon from "../icons/mistral";
import { Info, InfoIcon, Loader } from "lucide-react";

const formSchema = z.object({
  model: z.string().min(1, "Model is required"),
  temperature: z
    .number()
    .min(0, "Temperature must be at least 0")
    .max(2),
});

const UserInput = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "llama3-70b-8192",
      temperature: 1,
      // notes: "",
    },
  });

  const { setOutput, setLoading, loading } = useContext(BioContext);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    setLoading(true);

    const userInputValues = `
    User Input: ${values.stock},
    Report Type: ${values.report_type},
    Report Length: ${values.report_length}
    `;
    try {
      const { data } = await generateReport(
        userInputValues,
        values.temperature,
        values.model
      );
      console.log(data);
      setOutput(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col items-start gap-8">
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-start gap-6"
        >

          <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm">
            <legend className="rounded-full font-semibold tracking-tight text-xl">
              AI Model Settings
            </legend>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a Model</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="llama3-8b-8192">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MetaIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium mr-2">
                                    LLaMa 3
                                  </span>
                                  8B
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="llama3-70b-8192">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MetaIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium mr-2">
                                    LLaMa 3
                                  </span>
                                  70B (Recommended)
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="mixtral-8x7b-32768">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MistralIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium mr-2">
                                    Mixtral
                                  </span>
                                  8x7B
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <Slider defaultValue={[33]} max={100} step={1} /> */}
            </div>            
          </fieldset>
          <Button type="submit" disabled={loading}>
            {loading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
            Generate</Button>
        </form>
      </Form>
      {/* <LinearGradient /> */}
    </div>
  );
};

export default UserInput;

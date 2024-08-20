import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MessageSquare, SmilePlus, Meh, Frown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const feedbackSchema = z.object({
  feedback: z.string().min(10, {
    message: "Feedback must be at least 10 characters.",
  }),
  sentiment: z.enum(['positive', 'neutral', 'negative']),
});

export function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      feedback: "",
      sentiment: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof feedbackSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const sentimentOptions = [
    { value: 'positive', icon: SmilePlus, label: 'Positive' },
    { value: 'neutral', icon: Meh, label: 'Neutral' },
    { value: 'negative', icon: Frown, label: 'Negative' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="sr-only">Feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Submit Feedback</DialogTitle>
          <DialogDescription className="text-zinc-400">
            We&apos;re always looking for ways to improve this interactive research tool. Please let us know what you think.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Give us your feedback..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sentiment"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-center space-x-4">
                    {sentimentOptions.map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant="outline"
                        className={`rounded-full p-2 ${
                          field.value === option.value ? 'bg-blue-600' : 'bg-secondary'
                        }`}
                        onClick={() => field.onChange(option.value)}
                      >
                        <option.icon className="h-6 w-6" />
                        <span className="sr-only">{option.label}</span>
                      </Button>
                    ))}
                  </div>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
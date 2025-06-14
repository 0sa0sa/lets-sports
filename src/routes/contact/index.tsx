import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Mail, MessageSquare, User } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

export const Route = createFileRoute("/contact/")({
  component: ContactPage,
});

const contactFormSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  subject: z.string().min(1, "件名を入力してください"),
  message: z.string().min(10, "メッセージは10文字以上で入力してください"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form data:", data);
    // 実際の実装では、ここでAPIにデータを送信します
    setIsSubmitted(true);
    form.reset();
  };

  if (isSubmitted) {
    return (
      <main className="flex flex-col w-full p-6 bg-blue-50 min-h-screen">
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              お問い合わせありがとうございます
            </h1>
            <p className="text-gray-600 mb-6">
              お問い合わせを受け付けました。内容を確認の上、3営業日以内にご返信いたします。
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              新しいお問い合わせ
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col w-full p-6 bg-blue-50 min-h-screen">
      <div className="max-w-2xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          お問い合わせ
        </h1>

        {/* お問い合わせ説明 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            お気軽にお問い合わせください
          </h2>
          <p className="text-gray-700 mb-4">
            Let's
            sportsに関するご質問、ご要望、不具合報告など、どのようなことでもお気軽にお問い合わせください。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-blue-600">
              <MessageSquare className="h-4 w-4" />
              <span>サービスに関するご質問</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Mail className="h-4 w-4" />
              <span>機能改善のご要望</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <User className="h-4 w-4" />
              <span>その他のお問い合わせ</span>
            </div>
          </div>
        </div>

        {/* お問い合わせフォーム */}
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>お名前 *</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="山田太郎" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>メールアドレス *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>件名 *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="お問い合わせの件名を入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>メッセージ *</span>
                    </FormLabel>
                    <FormControl>
                      <textarea
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="お問い合わせ内容を詳しくお書きください"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={form.formState.isSubmitting}
                >
                  <Send className="h-5 w-5 mr-2" />
                  {form.formState.isSubmitting ? "送信中..." : "送信する"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* 注意事項 */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
          <h3 className="font-semibold text-blue-800 mb-2">ご注意</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• お返事には3営業日程度お時間をいただく場合があります</li>
            <li>• 内容によってはお返事できない場合があります</li>
            <li>
              • 個人情報は適切に管理し、お問い合わせ対応以外には使用いたしません
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

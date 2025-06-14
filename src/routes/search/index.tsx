import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, MapPin, Calendar, Building } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { CardCheckbox } from "@/components/card-checkbox";
import { SPORTS, type Sports } from "@/model/sports";
import { SPORTS_CENTER } from "@/model/sports-center";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/search/")({
  component: SearchPage,
});

const searchFormSchema = z.object({
  sports: z.array(z.string()).default([]),
  location: z.string().optional(),
  facility: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

type SearchFormData = z.infer<typeof searchFormSchema>;

export function SearchPage() {
  const [searchResults, setSearchResults] = useState<typeof SPORTS_CENTER>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      sports: [],
      location: "",
      facility: "",
      dateFrom: "",
      dateTo: "",
    },
  });

  const onSubmit = (data: SearchFormData) => {
    console.log("Search data:", data);

    // 検索ロジック
    let results = [...SPORTS_CENTER];

    // スポーツでフィルタリング
    if (data.sports.length > 0) {
      results = results.filter(center =>
        data.sports.some(sport =>
          center.facilities.some(facility =>
            getSportsFromFacility(facility).includes(sport as Sports)
          )
        )
      );
    }

    // 場所でフィルタリング
    if (data.location?.trim()) {
      results = results.filter(
        center =>
          center.address.includes(data.location as string) ||
          center.name.includes(data.location as string)
      );
    }

    // 施設でフィルタリング
    if (data.facility?.trim()) {
      results = results.filter(center =>
        center.facilities.some(facility =>
          facility.includes(data.facility as string)
        )
      );
    }

    setSearchResults(results);
    setHasSearched(true);
  };

  // 施設からスポーツを推定する関数
  const getSportsFromFacility = (facility: string): Sports[] => {
    const facilityMap: Record<string, Sports[]> = {
      体育室: [
        "バスケットボール",
        "バレーボール",
        "バドミントン",
        "卓球",
        "フットサル",
      ],
      トレーニング室: ["トレーニングジム"],
      プール: ["水泳"],
      武道場: ["柔道", "剣道", "空手", "合気道"],
      クライミングウォール: ["クライミング"],
      弓道場: [],
      柔道場: ["柔道"],
      剣道場: ["剣道"],
      レクリエーションホール: ["ダンス", "エアロビクス", "ヨガ"],
    };
    return facilityMap[facility] || [];
  };

  // 人気の検索条件
  const popularSearches = [
    { label: "バスケットボール", sports: ["バスケットボール"] },
    { label: "水泳", sports: ["水泳"] },
    { label: "トレーニングジム", sports: ["トレーニングジム"] },
    { label: "武道系", sports: ["柔道", "剣道", "空手"] },
  ];

  const handlePopularSearch = (search: { sports: string[] }) => {
    form.setValue("sports", search.sports);
    onSubmit({ ...form.getValues(), sports: search.sports });
  };

  return (
    <main className="flex flex-col w-full p-6 bg-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          条件を選択して探そう！
        </h1>

        {/* 人気の検索条件 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <Search className="h-5 w-5 mr-2" />
            人気の検索条件
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map(search => (
              <Button
                key={search.label}
                variant="outline"
                size="sm"
                onClick={() => handlePopularSearch(search)}
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                {search.label}
              </Button>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* スポーツ選択 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Search className="h-5 w-5 mr-2" />
                  スポーツを選択
                </CardTitle>
                <CardDescription>
                  やりたいスポーツを選択してください（複数選択可）
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="sports"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          {SPORTS.map(sport => (
                            <CardCheckbox
                              key={sport}
                              id={sport}
                              label={sport}
                              checked={field.value.includes(sport)}
                              onCheckedChange={checked => {
                                if (checked) {
                                  field.onChange([...field.value, sport]);
                                } else {
                                  field.onChange(
                                    field.value.filter(s => s !== sport)
                                  );
                                }
                              }}
                            />
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* 場所検索 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <MapPin className="h-5 w-5 mr-2" />
                  場所検索
                </CardTitle>
                <CardDescription>地域名や住所で検索できます</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="例: 江東区、深川、亀戸..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* 施設検索 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Building className="h-5 w-5 mr-2" />
                  施設検索
                </CardTitle>
                <CardDescription>
                  特定の施設タイプで検索できます
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="facility"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="例: プール、体育室、トレーニング室..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* 期間検索 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Calendar className="h-5 w-5 mr-2" />
                  期間検索
                </CardTitle>
                <CardDescription>利用予定日を指定してください</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dateFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>開始日</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>終了日</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Search className="h-5 w-5 mr-2" />
                検索する
              </Button>
            </div>
          </form>
        </Form>

        {/* 検索結果またはスポーツセンター一覧 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            {hasSearched
              ? `検索結果 (${searchResults.length}件)`
              : `スポーツセンター一覧 (${SPORTS_CENTER.length}件)`}
          </h2>

          {/* 統計情報 */}
          {!hasSearched && (
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">
                施設統計
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {SPORTS_CENTER.length}
                  </div>
                  <div className="text-sm text-gray-600">総施設数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {
                      SPORTS_CENTER.filter(center =>
                        center.facilities.includes("プール")
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">プール有り</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {
                      SPORTS_CENTER.filter(center =>
                        center.facilities.includes("トレーニング室")
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">ジム有り</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(
                      (SPORTS_CENTER.reduce(
                        (acc, center) => acc + center.facilities.length,
                        0
                      ) /
                        SPORTS_CENTER.length) *
                        10
                    ) / 10}
                  </div>
                  <div className="text-sm text-gray-600">平均施設数</div>
                </div>
              </div>
            </div>
          )}

          {hasSearched && searchResults.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
              <p className="text-gray-600">
                条件に合うスポーツセンターが見つかりませんでした。
              </p>
              <p className="text-gray-600">
                検索条件を変更してお試しください。
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(hasSearched ? searchResults : SPORTS_CENTER).map(center => {
                const availableSports = center.facilities
                  .flatMap(facility => getSportsFromFacility(facility))
                  .filter((sport, idx, arr) => arr.indexOf(sport) === idx);

                const sportsPercentage = Math.round(
                  (availableSports.length / SPORTS.length) * 100
                );

                return (
                  <Card
                    key={center.name}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-blue-800">
                        {center.name}
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {center.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* スポーツ対応率 */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium text-gray-700">
                              スポーツ対応率
                            </p>
                            <span className="text-sm font-bold text-blue-600">
                              {sportsPercentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${sportsPercentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {availableSports.length}/{SPORTS.length}{" "}
                            スポーツに対応
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            利用可能施設:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {center.facilities.map(facility => (
                              <Badge
                                key={facility}
                                variant="secondary"
                                className="text-xs"
                              >
                                {facility}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            対応スポーツ:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {availableSports.slice(0, 6).map(sport => (
                              <Badge
                                key={sport}
                                variant="outline"
                                className="text-xs"
                              >
                                {sport}
                              </Badge>
                            ))}
                            {availableSports.length > 6 && (
                              <Badge variant="outline" className="text-xs">
                                +{availableSports.length - 6}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Separator />

                        <div className="text-sm text-gray-600">
                          <p>📞 {center.phone}</p>
                          <a
                            href={center.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            詳細を見る →
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

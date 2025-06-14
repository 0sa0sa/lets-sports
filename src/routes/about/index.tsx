import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Users, Clock, Phone } from "lucide-react";

export const Route = createFileRoute("/about/")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="flex flex-col w-full p-6 bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Let's sportsについて
        </h1>

        {/* サービス概要 */}
        <div className="bg-white p-8 rounded-lg shadow-sm border mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            サービス概要
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Let's
            sportsは、東京23区内のスポーツセンターを統合した検索サービスです。
            あなたがやりたいスポーツ、利用したい場所、希望する期間などの条件を指定して、
            最適なスポーツセンターを簡単に見つけることができます。
          </p>
          <p className="text-gray-700 leading-relaxed">
            健康的なライフスタイルを送りたい方、新しいスポーツに挑戦したい方、
            定期的に運動したい方など、すべての方にご利用いただけるサービスです。
          </p>
        </div>

        {/* 主な機能 */}
        <div className="bg-white p-8 rounded-lg shadow-sm border mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            主な機能
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  スポーツ検索
                </h3>
                <p className="text-gray-600 text-sm">
                  バスケットボール、水泳、テニスなど、20種類以上のスポーツから選択して検索できます。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">場所検索</h3>
                <p className="text-gray-600 text-sm">
                  地域名や住所を入力して、お近くのスポーツセンターを見つけることができます。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">期間検索</h3>
                <p className="text-gray-600 text-sm">
                  利用予定日を指定して、その期間に利用可能な施設を検索できます。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">施設検索</h3>
                <p className="text-gray-600 text-sm">
                  プール、体育室、トレーニング室など、特定の施設タイプで絞り込み検索ができます。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 対象エリア */}
        <div className="bg-white p-8 rounded-lg shadow-sm border mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            対象エリア
          </h2>
          <p className="text-gray-700 mb-4">
            現在、以下のエリアのスポーツセンターを検索できます：
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 font-medium">東京23区内</p>
            <p className="text-gray-600 text-sm mt-1">
              江東区を中心に、順次対象エリアを拡大予定です。
            </p>
          </div>
        </div>

        {/* 利用方法 */}
        <div className="bg-white p-8 rounded-lg shadow-sm border mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            利用方法
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">条件を選択</h3>
                <p className="text-gray-600 text-sm">
                  やりたいスポーツ、場所、期間などの条件を選択します。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">検索実行</h3>
                <p className="text-gray-600 text-sm">
                  「検索する」ボタンをクリックして、条件に合うスポーツセンターを検索します。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">施設を選択</h3>
                <p className="text-gray-600 text-sm">
                  検索結果から気になる施設を選んで、詳細情報を確認します。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  直接お問い合わせ
                </h3>
                <p className="text-gray-600 text-sm">
                  各施設の電話番号や公式サイトから、直接予約・お問い合わせを行います。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* お問い合わせ */}
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            お問い合わせ
          </h2>
          <p className="text-gray-700 mb-4">
            サービスに関するご質問やご要望がございましたら、お気軽にお問い合わせください。
          </p>
          <div className="flex items-center space-x-2 text-blue-600">
            <Phone className="h-5 w-5" />
            <span>お問い合わせページからご連絡ください</span>
          </div>
        </div>
      </div>
    </main>
  );
}

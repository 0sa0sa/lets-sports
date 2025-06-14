import { z } from "zod";

const sportsSchema = z.enum([
  "バスケットボール",
  "バレーボール",
  "バドミントン",
  "卓球",
  "テニス",
  "フットサル",
  "水泳",
  "トレーニングジム",
  "クライミング",
  "ランニング",
  "エアロビクス",
  "ヨガ",
  "ダンス",
  "柔道",
  "剣道",
  "空手",
  "合気道",
  "ボクシング",
  "シーカヤック",
  "サイクリング",
]);

export type Sports = z.infer<typeof sportsSchema>;

export const SPORTS: Sports[] = [
  "バスケットボール",
  "バレーボール",
  "バドミントン",
  "卓球",
  "テニス",
  "フットサル",
  "水泳",
  "トレーニングジム",
  "クライミング",
  "ランニング",
  "エアロビクス",
  "ヨガ",
  "ダンス",
  "柔道",
  "剣道",
  "空手",
  "合気道",
  "ボクシング",
  "シーカヤック",
  "サイクリング",
];

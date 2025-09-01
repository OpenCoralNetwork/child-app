# Child App - Expo React Native Project

このプロジェクトはExpo SDK 53を使用したReact Nativeアプリケーションです。

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/OpenCoralNetwork/child-app)

## 必要な環境

- Node.js v20以上
- npm v10以上
- Expo Go アプリ（iOS/Android）

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

#### 通常接続（同じWi-Fi環境）
```bash
npm start
# または
npm run dev
# または
npx expo start
```

#### トンネル接続（異なるネットワーク環境）
```bash
npm run tunnel
# または
npx expo start --tunnel
```

## 使用方法

1. 開発サーバーを起動
2. ターミナルに表示されるQRコードをExpo Goアプリでスキャン
3. アプリが自動的に読み込まれます

## プロジェクト構成

```
/workspaces/child-app/
├── app/                # アプリケーションのルートとスクリーン
│   ├── (tabs)/        # タブナビゲーション
│   ├── child/         # 子供向け機能
│   └── _layout.tsx    # ルートレイアウト
├── components/        # 再利用可能なコンポーネント
├── constants/         # 定数定義
├── hooks/            # カスタムフック
├── lib/              # ユーティリティ関数
├── assets/           # 画像やフォントなどのアセット
└── supabase/         # Supabase設定
```

## 利用可能なスクリプト

- `npm start` - 開発サーバーを起動（LAN接続）
- `npm run dev` - 開発サーバーを起動（LAN接続）
- `npm run tunnel` - トンネル経由で開発サーバーを起動
- `npm run build:web` - Webビルドを作成
- `npm run lint` - コードのリントチェック

## 技術スタック

- Expo SDK 53
- React Native 0.79.5
- React 19.0.0
- Expo Router 5.1.5
- TypeScript 5.8.3
- Supabase

## トラブルシューティング

### Expo Goで接続できない場合

1. 開発マシンとスマートフォンが同じWi-Fiに接続されているか確認
2. 異なるネットワークの場合は`npm run tunnel`を使用
3. キャッシュをクリアして再起動：`npx expo start --clear`

### ポートが使用中の場合

```bash
npx expo start --port 8082
```

## ライセンス

MIT
# AI_translator
# AI Translator

リアルタイム音声翻訳アプリです。  
ブラウザ上でマイクから音声を認識し、OpenAI APIを用いて英語⇔日本語の翻訳を行います。

## 特徴
- 音声認識機能（英語・日本語対応）
- OpenAI APIによる自然な翻訳
- シンプルなユーザーインターフェース
- クライアント⇔サーバー構成（Node.js使用）

## 使用方法

### 1. クローン
git clone https://github.com/YashunX/AI_translator.git

### 2. `.env` ファイルを作成（ルートに配置）
OPENAI_API_KEY=your_api_key_here

### 3. パッケージインストール & 起動
npm install
node server.js

### 4. アクセス
ブラウザで `http://localhost:3000` にアクセス

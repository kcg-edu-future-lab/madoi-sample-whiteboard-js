# madoi-sample-whiteboard-js
未来環境ラボで開発しているオブジェクト共有サービス madoi を使ってホワイトボードを作成するサンプルです。

まずはこのリポジトリをcloneしてください。
```
git clone https://github.com/kcg-edu-future-lab/madoi-sample-whiteboard-js.git
```

次にindex.htmlがあるディレクトリでHTTPサーバを起動し，ブラウザで表示してください。
例えばpython3がインストールされていれば，以下のコマンドでサーバを起動できます。Rubyや他の言語でもHTTPサーバを起動できるものはありますので，環境に応じた方法で起動してください。
```
python3 -m http.server
```
（補足：Python 3.10　をインストールした人は「```pthon -m http.server```」で動きます。）
そして、ブラウザで「```http://localhost:8000/```」に接続してください。

表示された画面の「Color」で色が選べ、「Size」でペンの太さが変えられます。
そのまま四角で囲われた中で書き込みができます。

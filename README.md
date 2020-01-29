## 動作確認
macOS Mojave 10.14.6

## 環境構築

- node.js
  - version12以上。随時`.node-version`を確認。

- node_modules

```
yarn
```
もしくは
```
npm install
```

## 開発手順

- `npm run start` / `yarn start`
  - ローカル開発環境ブラウザの立ち上げ、自動でビルド・リロードを行います。基本的にはこちらのコマンドだけで開発ができます。

- `npm run build` / `yarn build`
  - productionモードの最適化された状態でビルドします。`webpack-dev-server`コマンドでは開発用サーバー上でファイルを展開しているだけなので、実ファイルを取得する場合はビルドする必要があります。
  - public/に出力したファイルを見たい場合は、publicファルダまで移動して`npm run public`でローカルサーバーを立ち上げます。`http://localhost:9000/`にアクセスすると表示されます。

## ページを追加する方法

### CSS

`src/scss/`に`${page_name}.scss`を追加します。  
`@import "base";`の設定は必須です。  

※ページ専用のCSSファイルがない場合は不要です。

### JavaScript

`src/js/`に`${page_name}.js`を追加します。  

※ページ専用のJSファイルがない場合は不要です。

### HTML

`src/pug/page/`に`${page_name}.pug`を追加します。  
`index.pug`をコピペして適宜変更すると良いです。  

たとえばCSS/JSファイルを追加した場合は、以下のように読み込みます。

```pug
append stylesheet-block
  link(rel="stylesheet", href="./css/about.css")

append javascript-block
  script(src="./js/about.js")
```

### webpackの設定

`webpack.config.js`から、エントリーポイントを追加します。

```javascript
entry: {
  'js/script.js': `${SRC}/js/script.js`,
  'js/about.js': `${SRC}/js/about.js`, // 追加例
  'css/style.css': `${SRC}/scss/style.scss`,
  'css/about.css': `${SRC}/scss/about.scss`, // 追加例
}
```

`webpack.config.js`から、コンパイル元のファイルと出力ファイル名を追加します。

```javascript
plugins: [
  new HTMLWebpackPlugin({
    templateParameters: htmlTemplates,
    template: `${SRC}/pug/page/index.pug`,
    filename: 'index.html',
    inject: false,
  }),
  // 追加例
  new HTMLWebpackPlugin({
    templateParameters: htmlTemplates,
    template: `${SRC}/pug/page/about.pug`, // コンパイル元のファイル
    filename: 'about.html', // 出力ファイル名
    inject: false,
  }),
],
```

## 多重階層のサイトを作る場合

サイトのルートディレクトリではなく、サブディレクトリに配置するサイトを作成する場合は、ファイルのパス設定を変更する必要があります。  
たとえば`http://example.com/sub/`というサイト構成ならば、`src/constants.yml`を以下のように変更します。

```yml
SUB_DIR: sub
```

さらにpublic直下にsubフォルダを作成し、imgフォルダをsubフォルダ内に移動させます。


## 使用言語

- HTMLテンプレート：[pug](https://pugjs.org/api/getting-started.html)
- CSSメタ言語：[Sass(SCSS)](http://sass-lang.com/)
- JavaScript：[ES2015](https://babeljs.io/docs/en/learn)

## 依存ライブラリ

- [Babel](https://babeljs.io/)
- [webpack](https://webpack.js.org/)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- [PostCSS](https://postcss.org/)

## 参考リポジトリ

- https://github.com/google/web-starter-kit
- https://github.com/Microsoft/TypeScript-Vue-Starter
- https://github.com/kayac/kayac-html5-starter
- https://github.com/nyawach/vue-ts-hmr-starter
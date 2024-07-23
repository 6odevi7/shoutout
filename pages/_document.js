import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/disable-devtool';
                script.setAttribute('disable-devtool-auto', '');
                document.head.appendChild(script);

                var script2 = document.createElement('script');
                script2.src = '/iframedisabletool.js';
                document.head.appendChild(script2);
              })();
            `
          }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;

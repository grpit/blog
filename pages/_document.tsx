import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id='modal-container' className='z-50' />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

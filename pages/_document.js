import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					{/* Global Site Tag (gtag.js) - Google Analytics */}

					{/* <meta name='description' content="Vincent's Sphere"></meta>
					<meta name='description' content='thinkcrypt.io'></meta> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

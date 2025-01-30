import { Layout } from '../components/dom/Layout'
'./global.css';

export const metadata = {
  title: 'Lab Maya Research',
  description: 'Lab Maya AR Playground Research',
}

export default function RootLayout({ children }: any) {
  return (
    <html>
      <head>
        <script
            type="text/javascript"
            src="https://static.sketchfab.com/api/sketchfab-viewer-1.7.1.js"
            async
          />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}

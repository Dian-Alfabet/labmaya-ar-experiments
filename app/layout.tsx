import { Layout } from '../components/dom/Layout'
'./global.css';

export const metadata = {
  title: 'Lab Maya Research',
  description: 'Lab Maya AR Playground Research',
}

export default function RootLayout({ children }: any) {
  return (
    <html>
      <head />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}

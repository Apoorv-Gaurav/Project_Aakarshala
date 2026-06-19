import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/views'
import React from 'react'

import { importMap } from './importMap'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  <RootLayout importMap={importMap} config={config}>
    {children}
  </RootLayout>
)

export default Layout

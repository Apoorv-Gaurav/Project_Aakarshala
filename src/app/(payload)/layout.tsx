import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './importMap'

import { handleServerFunctions } from '@payloadcms/next/layouts'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <RootLayout importMap={importMap} config={config} serverFunction={handleServerFunctions as any}>
    {children}
  </RootLayout>
)

export default Layout

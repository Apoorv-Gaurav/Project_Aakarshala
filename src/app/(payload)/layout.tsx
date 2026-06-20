import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './importMap'

import { handleServerFunctions } from '@payloadcms/next/layouts'

type Args = {
  children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serverFunction = async function (args: any) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout importMap={importMap} config={config} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout

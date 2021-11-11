//import TableauEmbed from '../components/tableau'
import TableauEmbedFunc from '../components/tableaufun'
//import BasicEmbed from '../components/basicembed'
import Disclaimer from '../components/disclaimer'

import NavTabs from '../components/tabs'

import { Tab } from '@headlessui/react'

import HousingNav from '../components/housingnav'

import Head from 'next/head'

import React from 'react'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/tableaufun'),
  { ssr: false }
)

function Payroll() {
  return <div className='height100'>
    <Head>
      <title>Where do LA City Employees Live? - Interactive Map</title>
      <meta property="og:type" content="website"/>
      <meta name="twitter:site" content="@kennethmejiala" />
        <meta name="twitter:creator" content="@kennethmejiala" />
<meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" key='twittertitle' content="Where do LA City Employees Live? - Interactive Map"></meta>
<meta name="twitter:description"  key='twitterdesc' content="LA City Employee Locations and Gross Pay | 2021 Jan - Sep"></meta>
      <meta name="description" content="LA City Employee Locations and Gross Pay | 2021 Jan - Sep" />

      <meta property="og:url"                content="https://affordablehousing.mejiaforcontroller.com/" />
<meta property="og:type"               content="website" />
<meta property="og:title"              content="Where do LA City Employees Live? | Map" />
<meta property="og:description"        content="LA City Employee Locations and Gross Pay | 2021 Jan - Sep" />
<meta property="og:image"              content="" />
    </Head>
    <div suppressHydrationWarning={true} className='height100'>
      <React.StrictMode>
        <HousingNav/>
        <DynamicComponentWithNoSSR
          key='payroll1'
          url='https://public.tableau.com/views/payrollv3/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link'
        />
       
  </React.StrictMode>
      <div className='p-2'>
      <Disclaimer/>
      </div>
      </div></div>
}

export default Payroll
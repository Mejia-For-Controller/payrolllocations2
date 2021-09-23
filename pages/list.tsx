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
      <title>Affordable Housing Covenants - 2010 to May 2021 | List</title>
      <meta property="og:type" content="website"/>
      <meta name="twitter:site" content="@kennethmejiala" />
        <meta name="twitter:creator" content="@kennethmejiala" />
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" key='twittertitle' content="Affordable Housing Covenants - 2010 to May 2021 | List"></meta>
      <meta name="twitter:description" key='twitterdesc' content="Browse and Search Affordable Housing in Los Angeles"></meta>
      <meta name="twitter:image:alt" content="Where is LA's Affordable Housing? | Kenneth Mejia for LA City Controller"/>
      <meta name="twitter:image" key='twitterimg' content="https://data.mejiaforcontroller.com/affordablehousingpic.png"></meta>
      
      <meta property="og:url"                content="https://affordablehousing.mejiaforcontroller.com/" />
<meta property="og:type"               content="website" />
<meta property="og:title"              content="Affordable Housing Covenants - 2010 to May 2021 | List" />
<meta property="og:description"        content="Browse and Search Affordable Housing in Los Angeles" />
<meta property="og:image"              content="https://data.mejiaforcontroller.com/affordablehousingpic.png" />
    </Head>
    <div suppressHydrationWarning={true} className='height100'>
      <React.StrictMode>
        <HousingNav/>
        <DynamicComponentWithNoSSR
          key='payroll1'
          url='https://public.tableau.com/views/AffordableHousingLA/sheet?:language=en-US&:display_count=n&:origin=viz_share_link'
        />
       
  </React.StrictMode>
      <div className='p-2'>
      <Disclaimer/>
      </div>
      </div></div>
}

export default Payroll
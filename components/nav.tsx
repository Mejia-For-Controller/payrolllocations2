import ActiveLink from './ActiveLink'
const navigationPayroll = [
  {
    'name': "Map",
    'url': "/"
  },
  {
    'name': "List",
    'url': "https://docs.google.com/spreadsheets/d/1rnSj8l2cbYYL--VUgSjZRUhXWPwqkm88JZUkip8oro4/edit#gid=1756876634",
    'newtab': true
  },
  {
    'name': "Mejia for Controller",
    'url': "https://mejiaforcontroller.com",
    'newtab': true
  }
]

function Nav() {
  return <div className="z-50 flex flex-col block"
  
  style={{
    backgroundColor: '#212121'
  }}
  >
    <nav className="z-50 flex flex-row  h-content">
      {navigationPayroll.map((item:any, itemIdx:any) =>
                     
              
                     <ActiveLink activeClassName="text-white py-3 px-6 block hover:text-green-300 focus:outline-none text-green-300 border-b-2 font-medium border-green-300" href={item.url}
                     key={itemIdx}
                     >
                     <a className="text-white py-3 px-6 block hover:text-green-300 focus:outline-none underline"
                          target={`${item.newtab === true ? "_blank" : ""}`}
                     >
                                                 {item.name}
                     </a>
                     </ActiveLink>
                     
                   )}
  </nav></div>
}

export default Nav
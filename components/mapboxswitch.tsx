
import { Switch } from '@headlessui/react'

interface switchinterface {
        checked: any;
        onChange: any;
        screenreader: any;
    }

export function MapboxMejiaSwitch(props:switchinterface) {

     return (
        <Switch
        /*
        checked={mergeNeighborhoods}
        onChange={setMergeNeighborhoods}
      
        */
    
        checked={props.checked}
        onChange={props.onChange}
        className={`${
          props.checked ? 'bg-green-600' : 'bg-gray-200'
        } relative inline-flex items-center h-5 rounded-full w-10`}
      >
        <span className="sr-only">{props.screenreader}</span>
        <span
          className={`
          transform transition linear duration-100
          ${
            props.checked ? 'translate-x-6 bg-green-100' : 'translate-x-1 bg-green-800'
          } inline-block w-3 h-3 transform  rounded-full`}
        />
      </Switch>
     
     )
}
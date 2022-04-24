//import 'tailwindcss/tailwind.css'
//import BasicEmbed from '../components/basicembed'
// Import Lodash library
import _ from "lodash";
import {MapboxMejiaSwitch} from '../components/mapboxswitch'
import NavTabs from '../components/tabs'
import { Switch } from '@headlessui/react'
import { Tab } from '@headlessui/react'
import employeedata from './data.json'

import Nav from '../components/nav'

import {simpleHash} from '../components/hash'
// eslint-disable-next-line import/no-webpack-loader-syntax

import {DisclaimerPopup} from '../components/Disclaimer'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import Head from 'next/head'

import React, {useRef, useState, useCallback, useContext, useEffect, useMemo, useReducer
} from 'react'
import dynamic from 'next/dynamic'
//const MapboxWorker = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker');

const citybound = require('./citybounds.json')

Object.freeze(employeedata)


var blankgeojson:any = {
  "features": [
  ],
  "type": "FeatureCollection"
}

const formulaForZoom = () => {
  var screenRatio = (window.innerWidth / window.innerHeight);

  if (screenRatio > 1.4) {
    if (window.innerWidth > 700) {
      return 3.6;
    } else {
      return 3;
    }
  }  else {
    if (screenRatio > 1) {
      return 3;
    } else {

      return 2.2
    }
  }
}
function renameDept(input) {
  return input.replace(/Los Angeles Housing/g,'Housing')
  .replace(/Office of Finance/gi,'Finance').replace(/Recreation and Parks/gi,"Rec & Parks").replace(/Department/gi,"")
  .replace(/El Pueblo De Los Angeles Historical Monument Authority/gi,"El Pueblo")
}


function renameShortDept(input) {
  return input.replace(/Public Works - /g, "PW-").replace(/City/gi,"").replace(/Emergency Management/gi,"Emergnecy Mgmt")
}



function Payroll() {
  const employeedatacleaned = employeedata.map((eachItem:any) => {

    eachItem.deptname = renameDept(eachItem.deptname)
  
    return eachItem
  
  });
  Object.freeze(employeedatacleaned);



  const listOfDeptCleaned:Array<String> = employeedatacleaned.map((eachItem) => {
    return renameShortDept(eachItem.deptname)
  })
  
  const listOfDeptCleanedUniq = _.uniq(listOfDeptCleaned).sort()
  
  console.log('list of dept cleaned for filters', listOfDeptCleanedUniq)

  let [disclaimerOpen, setDisclaimerOpen] = useState(false)
  let [layerOpen, setLayerOpen] = useState(false)
  let [filterOpen, setFilterOpen] = useState(false)

  let [mergeNeighborhoods, setMergeNeighborhoods] = useState(true)
  let [overlaytext, setOverlaytext] = useState(true)
  let [neighDidFirstRender,setNeighDidFirstRender] = useState(false)


  const shouldOverrideDisclaimer = () => {
    if (typeof window !== "undefined") {
      // browser code
      if (window.innerWidth >= 768) {
        return layerOpen
      } else {
        return false
      }
    }
     
    }

  function closeModal() {
    setDisclaimerOpen(false)
  }

  function openModal() {
    setDisclaimerOpen(true)
  }


    // textInput must be declared here so the ref can refer to it
    const mapboxRef = useRef(null);
    var [mapDataGeojson,setMapDataGeojson] = useState(null);
    var [mapglobal,setmapglobal] = useState(null);

  //  var lat = 34;
   // var lng = -118.41;

   var lat = 38;
   var lng = -98;

        // The following is required to stop "npm build" from transpiling mapbox code.
    // notice the exclamation point in the import.
    // @ts-ignore
    // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
    //mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
//import locations from './features.geojson'

mapboxgl.accessToken = 'pk.eyJ1IjoiY29tcmFkZWt5bGVyIiwiYSI6ImNrdjBkOXNyeDdscnoycHE2cDk4aWJraTIifQ.77Gid9mgpEdLpFszO5n4oQ';


function checkHideOrShowTopRightGeocoder() {
  var toprightbox = document.querySelector(".mapboxgl-ctrl-top-right")
 if (toprightbox) {
  var toprightgeocoderbox:any = toprightbox.querySelector(".mapboxgl-ctrl-geocoder");
  if (toprightgeocoderbox) {
    if (window.innerWidth >= 768) {
      toprightgeocoderbox.style.display = 'block'
    } else {
      toprightgeocoderbox.style.display = 'none'
    }
  }
 }
}

const handleResize = () => {
  checkHideOrShowTopRightGeocoder()


}

  useEffect(() => {
    if (mapglobal) {
    //  mapglobal.getSource('employeemapsource').setData(blankgeojson)
    if (mapglobal.getSource('employeemapsource')) {
      mapglobal.getSource('employeemapsource').setData(mapDataGeojson)
    }
    }
  }, [mapDataGeojson])

  const removemapboxlogo = () => {
    var getmapboxlogo:any = document.querySelector('.mapboxgl-ctrl-logo')

    if (getmapboxlogo) {
      getmapboxlogo.remove()
    }
  }

  function redefineMap () {
    console.log('redefinemap')

    console.log('number of los angeles towns in solid dataset', employeedatacleaned.filter(eachItem => eachItem.city === "Los Angeles").length);

    removemapboxlogo()

    /*
    {
      "features": [
        {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -33.301086,
          63.663781
        ],
        "type": "Point"
      },
      "id": "cda867a6a6f33c33815b584a74528167"
    },
      ],
      "type": "FeatureCollection"
    }
    */

    let objectsOfCities:any = {

    }

    console.log('mergeNeighborhoods', mergeNeighborhoods)

    //console.log('employeedatahash', simpleHash(JSON.stringify(employeedata)))
  //  console.log('employeedatacleanedhash', simpleHash(JSON.stringify(employeedatacleaned)))

  //  console.log('length of employees cleaned', employeedatacleaned.length)

    Object.freeze(employeedatacleaned)

    employeedatacleaned
    .map(eachRow => {
   
      if (eachRow.isinla === "TRUE" && mergeNeighborhoods === true) {

        //  console.log(mergeNeighborhoods)

        //console.log('switch to LA')

        return {...eachRow, 
        'city': "Los Angeles",
        'state': "CA",
        lat: 34.0522,
        lng: -118.2437
      }

         } else {
           
      return {...eachRow}
         }
      
  })
  .forEach((eachRow,rowindex) => {
      let mutateObject:any = eachRow;

    

   /*

      if (mergeNeighborhoods === true ) {
       if (rowindex < 5) {
        console.log('combine')
       }
       if (mutateObject.isinla == "TRUE") {
        
        mutateObject.city = "Los Angeles";
        mutateObject.state = "CA";
        mutateObject.lat = 34.0522;
        mutateObject.lng = -118.2437;
       }
      } else { 
        if (rowindex < 5) {
        console.log('not combine')
        }
      }*/

      let thisKey = `${mutateObject.lng.toFixed(3)}#${mutateObject.lat.toFixed(3)}`

      if (objectsOfCities[thisKey] == undefined) {
        objectsOfCities[thisKey] = {
          lat:  mutateObject.lat,
          lng: mutateObject.lng,
          city:  mutateObject.city,
          state:  mutateObject.state,
          employeecount:  mutateObject.employeecount,
          gross:  mutateObject.gross,
          isinla:  mutateObject.isinla,
          deptname:  mutateObject.deptname
        }
       } else {
          var objToWrite:any = objectsOfCities[thisKey]

        objToWrite.gross =  objToWrite.gross + mutateObject.gross;
        objToWrite.employeecount = objToWrite.employeecount +  mutateObject.employeecount;

        objectsOfCities[thisKey] = objToWrite;

        }
      });

     // console.log('mergeNeighborhoods', mergeNeighborhoods)

      //console.log('objofcity', objectsOfCities)
      //console.log('objofcityhash', simpleHash(JSON.stringify(objectsOfCities)))

      let arrayFeatures = []

      Object.values(objectsOfCities).forEach((eachRow:any) => {
        arrayFeatures.push({
          "type": "Feature",
          "properties": {
            "city": eachRow.city,
            "state": eachRow.state,
            "employeecount": eachRow.employeecount,
            "gross": eachRow.gross,
            "isinla": eachRow.isinla
          },
          "geometry": {
            "coordinates": [
              eachRow.lng,
              eachRow.lat
            ],
            "type": "Point"
          },
          "id": `${eachRow.lng}#${eachRow.lat}`
        })
      })


   //   console.log('ending', simpleHash(JSON.stringify(arrayFeatures)))

      setMapDataGeojson({
      "features": arrayFeatures,
      "type": "FeatureCollection"
    })
  }

  useEffect(() => {

    if (neighDidFirstRender == true) {
      redefineMap()
    } else {
      setNeighDidFirstRender(true)
    }
    

  }, [mergeNeighborhoods])



    useEffect(() => {
      var zoom = formulaForZoom()

      var customobj:any = {
        container: mapboxRef.current,
        //style: 'mapbox://styles/comradekyler/ckv0iinpk1tlj15o2y6v1cur9',
      //  style: 'mapbox://styles/comradekyler/ckv1ai7fb27w614s0d4tfbsac',
      style: 'mapbox://styles/comradekyler/cl1wvqghp000114nv18rnpigv',
        center: [lng, lat],
        zoom: zoom,
        attributionControl: false
      };

      const map = new mapboxgl.Map(customobj)
      setmapglobal(map);
      //.addControl(new mapboxgl.AttributionControl({
       // customAttribution: 'Paid for by Mejia for City Controller 2022, FPPC ID#: 1435234 1001 Wilshire Blvd. Suite 102, Los Angeles, CA, 90017. Additional information is available at ethics.lacity.org.'
      //}));

 
  
     

      const geocoder:any = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: map,
        proximity: {
          longitude: -118.41,
          latitude: 34
        },
        marker: true
        });
    
        var colormarker = new mapboxgl.Marker({
          color: '#41ffca'
        });
    
        const geocoderopt:any = 
          {
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: {
              color: '#41ffca'
            }
            }
        
    
        const geocoder2 = new MapboxGeocoder(geocoderopt);
        const geocoder3 = new MapboxGeocoder(geocoderopt);
    
    
       
           
      geocoder.on('result', (event:any) => {
        var singlePointSet:any = map.getSource('single-point')
        singlePointSet.setData(event.result.geometry);
        console.log('event.result.geometry',event.result.geometry)
        console.log('geocoderesult', event)
      });
    
      geocoder.on('select', function(object:any){
        var coord = object.feature.geometry.coordinates;
        var singlePointSet:any = map.getSource('single-point')
        singlePointSet.setData(object.feature.geometry);
    });
    
      var geocoderId = document.getElementById('geocoder')
    
    
    
      if (geocoderId) {
        console.log(
        'geocoder div found'
        )
    
        if (!document.querySelector(".geocoder input")) {
          geocoderId.appendChild(geocoder3.onAdd(map));
    
          var inputMobile = document.querySelector(".geocoder input");
    
          try {
            var loadboi =  document.querySelector('.mapboxgl-ctrl-geocoder--icon-loading')
            if (loadboi) {
              var brightspin:any = loadboi.firstChild;
           if (brightspin) {
            brightspin.setAttribute('style', 'fill: #e2e8f0');
           }
           var darkspin:any = loadboi.lastChild;
           if (darkspin) {
            darkspin.setAttribute('style', 'fill: #94a3b8');
           }
            }
           
          } catch (err) {
            console.error(err)
          }
        
          if (inputMobile) {
            inputMobile.addEventListener("focus", () => {
              /*
              //make the box below go away
              this.setState((state: any, props: any) => {
              return {
                infoBoxShown: false
              }
              })
            */              });
          }
        }
      
    
      } else {
        console.log('no geocoder div')
        console.log(geocoderId)
      }
    

      map.addControl(
        geocoder2
        );
    
        checkHideOrShowTopRightGeocoder()
      
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
         
      // Add geolocate control to the map.
      map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
        })
      );
      

      map.on('load', () => {

      
        removemapboxlogo()

  
        map.addSource('employeemapsource', {type: 'geojson', data: 
        blankgeojson})

        map.addLayer({
          'id': 'employeemaplayer',
          'type': 'circle',
          "source": 'employeemapsource',
          "paint": {
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "employeecount"],
              1,
              "hsl(54, 100%, 63%)",
              3056,
              "#42ff7e",
            ],
            "circle-stroke-color": "#000000",
            "circle-stroke-width": 1.7,
            "circle-stroke-opacity": 0.5,
            "circle-radius":  [ "interpolate",
            ["linear"],
            [
              "get",
              "employeecount"
            ],
            0,
            3,
            3056,
            20]
            

           
          }
        });


        redefineMap()


        // DRAW CITY BOUND
        map.addLayer({
          id: 'citybound',
          type: 'line',
          source: {
            type: 'geojson',
            data:  citybound
          },
          paint: {
            "line-color": '#51ffea',
            'line-opacity': 0.9,
            'line-width': 2
          }
        })

        map.addLayer({
          id: 'cityboundfill',
          type: 'fill',
          source: {
            type: 'geojson',
            data:  citybound
          },
          paint: {
            'fill-color': '#aaaaaa',
            'fill-opacity': 0.1
          }
        })

        

      });

      
      // Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
  });
   
  map.on('mousemove', 'employeemaplayer', (e:any) => {
  // Change the cursor style as a UI indicator.
  map.getCanvas().style.cursor = 'pointer';
   
  // Copy coordinates array.
  const coordinates = e.features[0].geometry.coordinates.slice();
  const description = `${e.features[0].properties.city}, ${e.features[0].properties.state}<br>
  <b>Number of Employees</b>${e.features[0].properties.employeecount}<br>
  <b>Gross Total</b> $${parseInt(e.features[0].properties.gross).toFixed(0).toLocaleString()}`;
   
//console.log(e.features)

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
   
  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });
   
  map.on('mouseleave', 'employeemaplayer', () => {
  map.getCanvas().style.cursor = '';
  popup.remove();
  });

 
      window.addEventListener('resize',  handleResize);  

    }, [])

   

  return <div className='height100'>
    <Head>
      <title>Where do LA City Employees Live? - Interactive Map and Statistics</title>
      <meta property="og:type" content="website"/>
      <meta name="twitter:site" content="@kennethmejiala" />
        <meta name="twitter:creator" content="@kennethmejiala" />
<meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" key='twittertitle' content="Where do LA City Employees Live? - Interactive Map"></meta>
<meta name="twitter:description"  key='twitterdesc' content="LA City Employee Locations and Gross Pay | 2021"></meta>
      <meta name="description" content="LA City Employee Locations and Gross Pay | 2021" />
      <meta name="twitter:image" key='twitterimg' content="https://citypayareas.mejiaforcontroller.com/thumbnail.png"></meta>
      <meta property="og:url"                content="https://citypayareas.mejiaforcontroller.com/" />
<meta property="og:type"               content="website" />
<meta property="og:title"              content="Where do LA City Employees Live? | Map" />
<meta property="og:description"        content="LA City Employee Locations and Gross Pay | 2021" />
<meta property="og:image"              content="https://citypayareas.mejiaforcontroller.com/thumbnail.png" />
    </Head>
    <div suppressHydrationWarning={true} className='height100'>
      <React.StrictMode >
      
      <div  style={{
      height: '100%',
      width: '100%'
    }}
    >
<div className='flex flex-col h-full'>
<Nav/>

        
<div ref={mapboxRef} style={{
  width: '100%'
}} className="flex-grow map-container " />

</div>

        <div
      className='flex-initial h-content outsideTitle flex-col flex z-50'
    >


  <div className='titleBox fixed text-sm bold md:text-base mt-3.9em ml-2 md:ml-3 break-words bg-gray-100'>Where LA City Employees Live 2021</div>

  <div className={`fixed flex flex-row gap-x-2 mt-9em md:mt-6.5em ml-2 md:ml-3 break-words `}>
        <button
        
        onClick={() => {
          setLayerOpen(!layerOpen)
        }}
        className='rounded-full px-3 pb-1.5 pt-0.5 text-sm bold md:text-base bg-gray-800 bg-opacity-80 text-white border-white border-2 '><span className=' my-auto align-middle'>
          
        <svg style={{
          width: '23px',
          height: '23px'
        }} viewBox="0 0 24 24"
        className='inline align-middle'
        >
    <path fill="currentColor" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" />


</svg>
          Layers</span></button>
        <button className='rounded-full px-3 pb-1.5 pt-0.5 text-sm bold md:text-base bg-gray-800 bg-opacity-80 text-white border-white border-2'><span className='my-auto align-middle'>
        <svg style={{
          width: '20px',
          height: '20px'
        }} viewBox="0 0 24 24"
        className='inline align-middle mt-0.5'
        >
    


    <path fill="currentColor" d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" />
</svg>

          Filter Dept</span></button>
      </div>

  <div
    className={`geocoder md:hidden mt-5.5em xs:text-sm sm:text-base md:text-lg`} id='geocoder'></div>


<div className={`md:h-full md:mt-10em md:ml-3`}>
<div
      className={`${layerOpen === true ? 'block': 'hidden'} frosteduu rounded-lg px-4 py-2 text-gray-100 fixed bottom-0 w-full sm:w-auto sm:bottom-auto border-t border-gray-200 md:border`}

      style={{
        background:   '#1a1a1aee'
      }}
      >
        <h2 className='font-bold text-lg'>Layers</h2>
        <div className='flex flex-row gap-x-1'>
       <MapboxMejiaSwitch
       screenreader="Merge LA neighborhoods"
       checked={mergeNeighborhoods}
       onChange={setMergeNeighborhoods}
       />
        <span>Merge LA Neighborhoods</span>
        </div>
        <div className='flex flex-row gap-x-1'>
       <MapboxMejiaSwitch
       screenreader="Overlay Text Labels"
       checked={overlaytext}
       onChange={setOverlaytext}
       />
        <span>Overlay City Labels</span>
        </div>

        
      </div>
</div>
</div>

</div>

<div>

</div>

    <DisclaimerPopup
        open={disclaimerOpen}
        openModal={openModal}
        closeModal={closeModal}
        overrideHide={shouldOverrideDisclaimer()}
        />

     <div className={`absolute md:mx-auto z-9 bottom-2 left-1 md:left-1/2 md:transform md:-translate-x-1/2`}>
<a href='https://MejiaForController.com/' target="_blank" rel="noreferrer">
    
  
                  <img src='/mejia-watermark-smol.png' className='h-9 md:h-10 lg:h-12 z-40' alt="Kenneth Mejia for LA City Controller Logo"/>

      <>
 
      </>
    </a>
  
                </div>

      
       
      </React.StrictMode>
 
      </div></div>
}

export default Payroll
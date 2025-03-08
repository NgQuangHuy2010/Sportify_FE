import { useEffect, useState } from 'react'
import locations from '../assets/locations.json'

const useLocationData = (address) => {
  const [location, setLocation] = useState({ city: '', district: '', ward: '' })

  useEffect(() => {
    if (!address) return

    const cityData = locations.find((c) => c.code === Number(address.city))
    const districtData = cityData?.districts.find((d) => d.code === Number(address.district))
    const wardData = districtData?.wards.find((w) => w.code === Number(address.ward))

    setLocation({
      city: cityData?.name || 'Unknown City',
      district: districtData?.name || 'Unknown District',
      ward: wardData?.name || 'Unknown Ward',
    })
  }, [address])

  return location
}

export default useLocationData

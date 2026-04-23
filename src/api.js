const BASE_URL = "http://192.168.1.100:5000"

export const getData = async () => {
  const res = await fetch(`${BASE_URL}/`)
  return res.json()
}
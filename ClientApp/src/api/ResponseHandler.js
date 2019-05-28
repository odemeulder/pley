
const logout = () => {
  localStorage.removeItem('user')
}

export const ResponseHandler = (response) => {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) logout()
      return Promise.reject((data && data.message) || response.statusText)
    }
    return data
  })
}
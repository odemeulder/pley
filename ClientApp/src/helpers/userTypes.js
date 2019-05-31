const UserType = {
  Admin: 0,
  Owner: 1,
  User: 2,
  Display: (i) => {
    const map = {
      0: 'Admin',
      1: 'Owner',
      2: 'User'
    }
    return(map[i] || 'User')
  }
}

export { UserType }
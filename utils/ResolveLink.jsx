const resolveLink = ( path ) => {
    path = path === 'home' ? '/' : path
    return path
}
export default resolveLink
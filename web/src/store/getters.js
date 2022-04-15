const getters = {
    roles : state => state.users.roles,
    permission_routers : state => state.permission.routes,
    sidebar : state => state.display.sidebar
}

export default getters;
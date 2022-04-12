const getters = {
    roles : state => state.users.roles,
    permission_routers : state => state.permission.routes
}

export default getters;
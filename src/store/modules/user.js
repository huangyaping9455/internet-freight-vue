export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    organizationId: '',
    organizationName: ''
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },
    updateOrganizationId (state, organizationId) {
      state.organizationId = organizationId
    },
    updateOrganizationName (state, organizationName) {
      state.organizationName = organizationName
    }

  }
}

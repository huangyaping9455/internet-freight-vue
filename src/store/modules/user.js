export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    organization: {}
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },

    updateOrganization (state, organization) {
      state.organization = organization
    }

  }
}

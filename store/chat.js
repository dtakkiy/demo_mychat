export const state = () => {
  return {
    messages: []
  }
}

export const mutations = {
  LOAD_MESSAGE(state,messages){
    state.messages = messages
  }
}

export const actions = {
  async getMessages({commit}){
    const db = this.$fb.firestore()
    const result = await db.collection("messages").get()
    commit("LOAD_MESSAGE",result.docs.map((d)=>d.data()))
  },
}

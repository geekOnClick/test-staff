export default {
  namespaced: true,
  state () {
    return {
      staff: [],
      canBeBoss: [],
      isBoss: []
    }
  },
  getters: {
    getStaff (state) {
      return state.staff
    },
    getBossList (state) {
      return state.canBeBoss
    },
    getBossName (state) {
      return state.isBoss
    }
  },
  mutations: {
    SAVE_STAFF (state, data) {
      state.staff.push(...JSON.parse(data))
      return state.staff.forEach(el => state.canBeBoss.push(Object.values(el)[0]))
    },
    // Поиск по всем элементам массива staff. Сначала проверка совпадения имени нового сотрудника с именем элемента массива, затем проверка на наличие свойства "Подчиненные", если оно есть, то рекурсия по вложенным объектам и аналогичный поиск совпадения имени. Если объект (начальник) найден, в массив этого свойства кладется объект подчиненного и новый подчиненный отрисовывается следом за начальником
    ADD_USER (state, data) {
      let searchBoss = state.staff.find(function searchStaff (el) {
        let findPers = Object.values(el)[0] === Object.values(data)[2]
        if (findPers) {
          return true
        } else {
          if (el['Подчиненные'].length !== 0) {
            el['Подчиненные'].forEach(el => {
              if (el['Начальник'] === undefined) {
                searchStaff(el)
              }
            })
          } else {
            return false
          }
        }
      })
      if (!searchBoss) {
        state.staff.push(data)
        state.canBeBoss.push(data['Имя'])
      } else {
        let ind = state.staff.findIndex(el => Object.values(el)[0] === Object.values(searchBoss)[0])
        searchBoss['Подчиненные'].push(data)
        state.isBoss.push(searchBoss['Имя'])
        state.staff.splice(++ind, 0, data)
        state.canBeBoss.splice(ind, 0, data['Имя'])
      }
      console.log(state.staff)
    }
  },

  actions: {
    loadStaff ({ commit }) {
      let req = new XMLHttpRequest()
      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
          commit('SAVE_STAFF', req.responseText)
        }
      }
      req.open(
        'GET',
        'https://api.jsonbin.io/b/6280a8f638be29676105a560/1',
        true
      )
      req.setRequestHeader(
        'secret-key',
        '$2b$10$aJalgazfDF4FthANLAoJqeQpTGJOkYQdtOnyMC4iymwAgdBrrY8OC'
      )
      req.send()
    }
  }
}

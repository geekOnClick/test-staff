<template>
<div class="wrap">
   <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="#">Home</b-nav-item>
      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown text="User" right>
        <b-dropdown-item href="#">Account</b-dropdown-item>
        <b-dropdown-item href="#">Settings</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
  <div class="container">
    <div class="btn-flex">
      <b-button @click="showModal" class="btnAdd" pill variant="outline-secondary">Добавить</b-button>
       <b-modal id="modal-right-no-backdrop" :modal-class="myclass" ref="myModalRef" hide-backdrop content-class="shadow" title="Добавление пользователя" hide-footer>
        <b-form >
      <b-form-group
        id="input-group-1"
        label="Имя"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="name"
          type="text"
          required
          :class="{
            errorBox: v$.name.$invalid,
            successBox: !v$.name.$invalid,
          }"
        ></b-form-input>
          <div v-if="v$.name.$invalid" class="error">
              Поле не должно быть пустым
            </div>
      </b-form-group>

      <b-form-group id="input-group-2" label="Телефон" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="phone"
          required
          :class="{
            errorBox: v$.phone.$invalid,
            successBox: !v$.phone.$invalid,
          }"
        ></b-form-input>
          <div v-if="v$.phone.$invalid" class="error">
            Поле не должно быть пустым<br>
            Поле должно содержать только 11 цифр
          </div>
      </b-form-group>
      <b-form-group id="input-group-3" label="Начальник" label-for="input-3">
        <b-form-select
          id="input-3"
          class="custom-select form-control"
          v-model="boss"
          :options="getBossList"
        ></b-form-select>
      </b-form-group>
    </b-form>
    <b-button class="btnAdd" pill variant="success" @click="newUser">Сохранить</b-button>
  </b-modal>
    </div>
  <div class="wrap__list">
    <b-table
      id="table-transition-example"
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear=""
      :head-variant="headVariant"
      fixed
      :items="getStaff"
      :fields="fields"
      bordered
      primary-key="Имя"
      :tbody-transition-props="transProps"
      ref="items"
    >
    </b-table>
  </div>
</div>
</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { BTable } from 'bootstrap-vue/esm/components/table'
import { BNavbar, BNavbarNav } from 'bootstrap-vue/esm/components/navbar'
import { BNav, BNavItem, BNavItemDropdown } from 'bootstrap-vue/esm/components/nav'
import { BDropdownItem } from 'bootstrap-vue/esm/components/dropdown'
import { BButton } from 'bootstrap-vue/esm/components/button'
import { BModal } from 'bootstrap-vue/esm/components/modal'
import { VBModal } from 'bootstrap-vue/esm/directives/modal/modal'
import { BForm } from 'bootstrap-vue/esm/components/form'
import { BFormGroup } from 'bootstrap-vue/esm/components/form-group'
import { BFormInput } from 'bootstrap-vue/esm/components/form-input'
import { BFormSelect } from 'bootstrap-vue/esm/components/form-select'
import { BIcon, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue/esm/icons'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
export default {
  components: {BTable, BNavbar, BNavbarNav, BNav, BNavItem, BNavItemDropdown, BDropdownItem, BButton, BModal, BForm, BFormGroup, BFormInput, BFormSelect, BIcon, BIconArrowUp, BIconArrowDown},
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      headVariant: 'dark',
      name: '',
      phone: '',
      boss: '',
      transProps: {
        name: 'flip-list'
      },
      myclass: ['myclass'],
      fields: [
        { key: 'Имя',
          sortable: true,
          tdClass: (value, key, item) => {
            return this.getClass(item)
          } },
        { key: 'Телефон', sortable: true }
      ]
    }
  },
  computed: {
    ...mapGetters('staffStore', ['getStaff', 'getBossList', 'getBossName'])
  },
  methods: {
    ...mapActions('staffStore', ['loadStaff']),
    ...mapMutations('staffStore', ['ADD_USER']),
    showModal: function () {
      this.$refs.myModalRef.show()
    },
    newUser () {
      let newUser = {
        'Имя': this.name,
        'Телефон': this.phone,
        'Начальник': this.boss,
        'Подчиненные': []
      }
      this.ADD_USER(newUser)
      // this.getBossName.forEach(el => {
      //   this.$refs.items.$refs['item-rows'].forEach(element => {
      //     if (element.$attrs['data-pk'] === el) {
      //       element.$el.children[0].classList.add('newBoss')
      //     }
      //   })
      // })
      localStorage.setItem('staff', JSON.stringify(this.getStaff))
    },
    getClass (item) {
      if (item['Начальник']) {
        return 'staffClass'
      } else if (item['Подчиненные'].length !== 0) {
        return 'newBoss'
      }
    }
  },
  directives: {
    'b-modal': VBModal
  },
  validations () {
    return {
      name: {
        required
      },
      phone: {
        required,
        numeric: numeric,
        minLength: minLength(11),
        maxLength: maxLength(11)
      }
    }
  },
  mounted () {
    if (this.getStaff.length === 0) {
      this.loadStaff()
    }
  }
}

</script>

<style>
</style>

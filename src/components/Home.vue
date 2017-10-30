<template>
  <div class="full-screen" style="padding-top: 20px;padding-right: 100px;padding-left: 100px;">
    <div class="mb-5"></div>
    <div class="survey-table">
      <v-card>
        <v-card-title>
          <h4>Advice Office Survey 2017</h4>
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-btn fab dark color="primary" @click="createSurvey">
         <v-icon dark>add</v-icon>
        </v-btn>
        <v-data-table
            v-bind:headers="headers"
            v-bind:items="surveys"
            v-bind:search="search"
            hide-actions
          >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left title" style="cursor: pointer;"  @click="openSurvey(props.item.id)">{{ props.item.id }}</td>
            <td class="text-xs-left title" style="cursor: pointer;"  @click="openSurvey(props.item.id)">{{ props.item.name }}</td>
            <td class="text-xs-left title" style="cursor: pointer;" @click="openSurvey(props.item.id)">{{ props.item.date_of_interview | dateFilter }}</td>
            <td>
              <v-btn fab dark color="red" small  @click="confirmDelete(props.item.id)">
                <v-icon dark>remove</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <div class="mb-5"></div>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">Delete Survey</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click.native="deleteSurvey">Yes</v-btn>
          <v-btn flat flat @click.native="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['surveys'])
  },
  data () {
    return {
      dialog: false,
      search: '',
      deleteId: null,
      pagination: {},
      headers: [
        {
          text: 'Id',
          align: 'left',
          value: 'id',
          class: 'title'
        },
        {
          text: 'Oranisation Name',
          align: 'left',
          value: 'name',
          class: 'title'
        },
        {
          text: 'Date of Survey',
          align: 'left',
          value: 'date_of_interview',
          class: 'title'
        }
      ]
    }
  },
  methods: {
    openSurvey (id) {
      this.$router.push({path: '/surveys/' + id})
    },
    createSurvey () {
      this.$router.push({path: '/surveys/create'})
    },
    confirmDelete (id) {
      this.deleteId = id
      this.dialog = true
    },
    deleteSurvey () {
      this.$store.dispatch('DELETE_SURVEY', this.deleteId)
      this.dialog = false
    }
  },
  mounted () {
    this.$store.dispatch('LOAD_SURVEY_LIST')
    this.$store.dispatch('LOAD_EMPTY_SURVEY')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.survey-table{
  flex: 1;
}
</style>

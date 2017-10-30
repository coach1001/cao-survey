<template>
  <div class="full-screen">
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="green"
    >
      <v-icon>done</v-icon>
    </v-btn>

    <v-btn
      fixed
      dark
      fab
      bottom
      left
      color="orange"
      @click="revertGeneral"
    >
      <v-icon>undo</v-icon>
    </v-btn>

    <div class="mb-3"></div>

    <div class="survey-form">
      <h3 class="ml-3">Survery Form</h3>
      <v-form v-model="valid">
        <v-tabs dark>
          <v-tabs-bar>
            <v-tabs-slider class="yellow"></v-tabs-slider>
            <v-tabs-item key="General-Tab" href="#tab-1">General</v-tabs-item>
            <v-tabs-item key="Governance-Tab" href="#tab-2">Governance</v-tabs-item>
            <v-tabs-item key="OrganisationalCapacityAndResources-Tab" href="#tab-3">Organisational Capacity And Resources</v-tabs-item>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content key="General-Tab" id="tab-1" transition="fade-transition" reverse-transition="fade-transition">

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs8 offset-xs2>
                    <v-text-field
                      label="Name"
                      v-model="general.name"
                    ></v-text-field>
                    <v-text-field
                      label="Address"
                      v-model="general.address"
                    ></v-text-field>
                    <v-text-field
                      label="GPS Coordinates"
                      v-model="general.gpsCoordinates"
                    ></v-text-field>
                    <div class="title grey--text text--darken-1 text-xs-left">Date of Interview</div>
                    <div class="mb-3"></div>
                    <v-date-picker v-model="general.dateOfInterview" landscape label="Date of Interview"></v-date-picker>

                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Persons Interviewed</div>
                    <div class="mb-3"></div>
                    <v-btn small fab dark color="primary" class="left" @click="addPersonInterviewed">
                      <v-icon dark>add</v-icon>
                    </v-btn>

                    <v-card>
                      <v-data-table
                          v-bind:headers="personsInterviewedHeaders"
                          v-bind:items="general.personsInterviewed"
                          hide-actions
                        >
                        <template slot="items" slot-scope="props">
                          <td class="text-xs-left">
                              <v-text-field
                                slot="input"
                                label="Name"
                                v-model="props.item.name"
                                single-line
                                counter
                                :rules="[max25chars]"
                              ></v-text-field>
                          </td>
                          <td class="text-xs-left">
                              <v-text-field
                                slot="input"
                                label="Position"
                                v-model="props.item.position"
                                single-line
                                counter
                                :rules="[max25chars]"
                              ></v-text-field>
                          </td >
                          <td>
                            <v-checkbox v-model="props.item.boardMember"></v-checkbox>
                          </td>
                          <td>
                            <v-btn small fab dark color="red" @click="removePersonInterviewed(props.item)">
                              <v-icon dark>remove</v-icon>
                            </v-btn>
                          </td>
                        </template>
                      </v-data-table>
                    </v-card>

                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Reseachers</div>
                    <div class="mb-3"></div>

                    <v-btn small fab dark color="primary" class="left">
                      <v-icon dark>add</v-icon>
                    </v-btn>

                    <v-card>
                      <v-data-table
                          v-bind:headers="researchersHeaders"
                          v-bind:items="general.reseachers"
                          hide-actions
                        >
                        <template slot="items" slot-scope="props">
                          <td class="text-xs-left">
                              <v-text-field
                                slot="input"
                                label="Name"
                                v-model="props.item.name"
                                single-line
                                counter
                                :rules="[max25chars]"
                              ></v-text-field>
                          </td>
                          <td class="text-xs-left">
                              <v-text-field
                                slot="input"
                                label="Organisation"
                                v-model="props.item.organisation"
                                single-line
                                counter
                                :rules="[max25chars]"
                              ></v-text-field>
                          </td >
                          <td>
                            <v-checkbox v-model="props.item.fhrStaff"></v-checkbox>
                          </td>
                          <td>
                            <v-btn small fab dark color="red" @click=" removeResearcher(props.item)">
                              <v-icon dark>remove</v-icon>
                            </v-btn>
                          </td>
                        </template>
                      </v-data-table>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>

            </v-tabs-content>
            <v-tabs-content key="Governance-Tab" id="tab-2" transition="fade-transition" reverse-transition="fade-transition">
              Governance
            </v-tabs-content>
            <v-tabs-content key="OrganisationalCapacityAndResources-Tab" id="tab-3" transition="fade-transition" reverse-transition="fade-transition">
              Organisational Capacity And Resources
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </v-form>
    </div>
    <div class="mb-5"></div>
  </div>
</template>

<script>
export default {
  name: 'Survey',
  props: ['surveyName'],
  data () {
    return {
      valid: false,
      personsInterviewedHeaders: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Position', align: 'left', value: 'position' },
        { text: 'Board Member', value: 'boardMember' }
      ],
      researchersHeaders: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Organisation', align: 'left', value: 'organisation' },
        { text: 'FHR Staff', value: 'fhrStaff' }
      ],
      general: {
        name: 'SABC',
        address: 'Henley Rd & Artillery Rd, Auckland Park, Johannesburg, 2000',
        gpsCoordinates: '-26.186312, 28.010660',
        dateOfInterview: null,
        personsInterviewed: [
          { name: 'John Doe', position: 'CEO', boardMember: false },
          { name: 'Jane Doe', position: 'CFO', boardMember: true }
        ],
        reseachers: [
          { name: 'Ajay Manga', organisation: 'FHR', fhrStaff: true },
          { name: 'Zorana Alimpic', organisation: 'Independant', fhrStaff: false }
        ]
      }
    }
  },
  methods: {
    max25chars: (v) => v.length <= 25 || 'Input too long!',
    addPersonInterviewed () {
      this.general.personsInterviewed.push({
        name: '',
        position: '',
        boardMember: false
      })
    },
    removePersonInterviewed (_person) {
      this.general.personsInterviewed = this.general.personsInterviewed.filter((person) => {
        return person.name !== _person.name
      })
    },
    removeResearcher (_reseacher) {
      this.general.reseachers = this.general.reseachers.filter((reseacher) => {
        return reseacher.name !== _reseacher.name
      })
    },
    revertGeneral () {
      this.general = JSON.parse(JSON.stringify(this.generalBackup))
    }
  },
  mounted () {
    this.generalBackup = JSON.parse(JSON.stringify(this.general))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.survey-form{
  flex: 1;
  margin: 0px;
  width: 100vw;
}
</style>

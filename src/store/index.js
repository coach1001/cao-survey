import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { cloneDeep, merge } from 'lodash'

Vue.use(Vuex)
const API_BASE = 'http://gpr.fhr.org.za:3009'

const store = new Vuex.Store({
  state: {
    surveys: [],
    survey: {},
    copyOfSurvey: {},
    emptySurvey: {
      general: {
        name: null,
        address: null,
        gps_coordinates: null,
        persons_interviewed: [],
        researchers: [],
        images: []
      },
      governance: {
        legal_status: {
          npo_registration_number: null,
          npo_date_of_registration: null,
          professional_body: null,
          legal_status: null
        },
        tax_status: {
          status: null,
          number: null
        },
        governance_structure: {
          management_commitee: null,
          board: null,
          number_of_board_members: null,
          board_member_tor: {
            tor_exists: null,
            provided_copy_of_constitution: null,
            notes: null
          },
          appointment_procedure_for_board_members: {
            procedure_exists: null,
            notes: null
          },
          board_members_remunerated: {
            renumerated: null,
            amount: null
          },
          composition_of_board: []
        },
        reporting_systems: {
          frequency_of_board_meetings: null,
          documented_board_meetings_minutes_available: null,
          internal_management_meetings: null,
          documented_management_meetings_minutes_available: null,
          annual_report_prepared: null,
          notes: null
        },
        strategic_planning: {
          existence_of_vision_and_mission: null,
          strategic_planning_conducted: null,
          strategic_planning_frequency: null
        },
        monitoring_and_evaluation: {
          period: {
            from: null,
            to: null
          },
          internal_evaluation: {
            conducted: null,
            how_many_per_year: null,
            conducted_by: null
          },
          external_evaluation: {
            conducted: null,
            how_many_per_year: null,
            conducted_by: null
          }
        },
        programme_planning_and_management: {
          clear_programme_objectives_and_deliverables: null,
          the_organisation_incorporates_learning_from_projects_and_evaluations_into_strategic_planning: null
        }
      },
      organisational_capacity_and_resources: {
        duration_of_existance: {
          year_established: null,
          year_registered: null,
          years_in_operation: null
        },
        level_of_staff_skill: [],
        staff_profile_and_turnover: [],
        staff_development: [],
        human_resource_policies_and_procedures: {
          documented_job_descriptions: null,
          documented_human_resource_policy_or_manual: null,
          performance_management_systems_in_place: null,
          dedicated_human_resource_staff_member: null
        },
        use_of_technology: {
          access_to_computers: null,
          access_to_internet: null,
          uses_social_media: null,
          platforms: null,
          website: null
        },
        case_management_system: {
          case_management_system: [],
          description: null
        },
        collaboration_and_network: {
          use_of_networks_and_partnerships: null,
          specify: []
        }
      },
      financial_viability: {
        financial_system: {
          bank_account: null,
          office: {
            does_have: null,
            how_many: null
          },
          dedicated_financial_staff: null,
          finance_systems: null,
          annual_independant_audits: null,
          book_keeping_system: null
        },
        funding: {
          monetary_sources: [],
          non_monetary_source: []
        },
        condition_and_terms_of_funding: [],
        expenditure: {
          monthly_budget_information: [],
          after_exhausting_montly_budget: {
            reserves_remaining: null,
            how_much: null
          }
        },
        resources_and_assests: []
      },
      accessibility: {
        cso_location: {
          address: null,
          location: null,
          town_municipality: null,
          province: null,
          country: null
        },
        geographical_reach: {
          locations: [],
          town_municipalities: [],
          provinces: [],
          countries: []
        },
        state_service_points: [],
        beneficiary_access: [],
        language_accessibility: []
      },
      focus_area_and_beneficiary_group: {
        focus_area: {
          labour_rights: [],
          legal_rights: [],
          gender: [],
          children: [],
          housing: [],
          health: [],
          education: [],
          social_services: [],
          safety_crime_and_violence: [],
          debt_management: [],
          family_law: [],
          top_five_focus_areas: []
        },
        target_beneficiary_group: []
      },
      service_provision: {
        activity_participation: [],
        average_number_of_cases_per_day: null,
        total_number_of_cases: [],
        referrals_past_month: {
          month: null,
          referrals: []
        },
        programmes_ran: [],
        achievements_impact: []
      },
      story_of_significant_change: [],
      narrative: []
    },
    loading: false
  },
  actions: {
    TOGGLE_LOADING: ({commit}, value) => {
      commit('SET_LOADING', value)
    },
    LOAD_SURVEY_LIST: ({ commit }) => {
      commit('SET_LOADING', true)
      axios.get(API_BASE + '/api/surveys').then((response) => {
        commit('SET_SURVEY_LIST', { list: response.data })
        commit('SET_LOADING', false)
      }, (err) => {
        console.log(err)
        commit('SET_LOADING', false)
      })
    },
    LOAD_SURVEY: ({ commit }, id) => {
      commit('SET_LOADING', true)
      axios.get(API_BASE + '/api/surveys/' + id).then((response) => {
        commit('SET_SURVEY', { object: response.data })
        commit('SET_LOADING', false)
      }, (err) => {
        console.log(err)
        commit('SET_LOADING', false)
      })
    },
    REVERT_SURVEY: ({commit}, id) => {
      commit('SET_LOADING', true)
      commit('SET_REVERT_SURVEY')
      commit('SET_LOADING', false)
    },
    LOAD_EMPTY_SURVEY: ({ commit }, id) => {
      commit('SET_LOADING', true)
      commit('SET_EMPTY_SURVEY')
      commit('SET_LOADING', false)
    },
    CREATE_SURVEY: ({commit}, payload) => {
      commit('SET_LOADING', true)
      return axios.post(API_BASE + '/api/surveys', payload).then((response) => {
        commit('SET_SURVEY', { object: response.data })
        commit('SET_LOADING', false)
      }, (err) => {
        console.log(err)
        commit('SET_LOADING', false)
      })
    },
    UPDATE_SURVEY: ({commit}, payload) => {
      commit('SET_LOADING', true)
      axios.patch(API_BASE + '/api/surveys', payload).then((response) => {
        commit('SET_SURVEY', { object: response.data })
        commit('SET_LOADING', false)
      }, (err) => {
        console.log(err)
        commit('SET_LOADING', false)
      })
    },
    DELETE_SURVEY: ({dispatch, commit}, id) => {
      commit('SET_LOADING', true)
      axios.delete(API_BASE + '/api/surveys/' + id).then((response) => {
        dispatch('LOAD_SURVEY_LIST')
      }, (err) => {
        console.log(err)
        commit('SET_LOADING', false)
      })
    }
  },
  mutations: {
    SET_LOADING: (state, loadState) => {
      state.loading = loadState
    },
    SET_SURVEY_LIST: (state, { list }) => {
      state.surveys = []
      list.map((obj) => {
        let survey = {}
        if (obj.general) {
          survey.id = obj._id
          survey._id = obj._id
          survey.name = obj.general.name
          survey.date_of_interview = obj.general.date_of_interview
        } else {
          survey.id = obj._id
          survey._id = obj._id
          survey.date_of_interview = ''
        }
        state.surveys.push(survey)
      })
    },
    SET_SURVEY: (state, { object }) => {
      var temp = cloneDeep(state.emptySurvey)
      state.survey = merge(temp, object)
      state.copyOfSurvey = cloneDeep(state.survey)
    },
    SET_EMPTY_SURVEY: (state) => {
      state.survey = cloneDeep(state.emptySurvey)
      state.copyOfSurvey = cloneDeep(state.survey)
    },
    SET_REVERT_SURVEY: (state) => {
      state.survey = cloneDeep(state.copyOfSurvey)
    }
  },
  getters: {
    getSurveys: state => {
      return state.surveys
    },
    getSurvey: state => {
      return cloneDeep(state.survey)
    },
    getLoading: state => {
      return state.loading
    }
  }
})
export default store

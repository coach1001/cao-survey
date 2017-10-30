<template>
  <div class="full-screen">
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="green"
      @click="saveChanges"
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
      @click="revertChanges"
    >
      <v-icon>undo</v-icon>
    </v-btn>

    <div class="mb-3"></div>

    <div class="survey-form">
      <h3 class="ml-3">Survey Form</h3>
      <v-form v-model="valid">
        <v-tabs dark>
          <v-tabs-bar>
            <v-tabs-slider class="yellow"></v-tabs-slider>
            <v-tabs-item key="General-Tab" href="#tab-1">General</v-tabs-item>
            <v-tabs-item key="Governance-Tab" href="#tab-2">Governance</v-tabs-item>
            <v-tabs-item key="OrganisationalCapacityAndResources-Tab" href="#tab-3">Organisational Capacity and Resources</v-tabs-item>
            <v-tabs-item key="FinancialViability-Tab" href="#tab-4">Financial Viability</v-tabs-item>
            <v-tabs-item key="Accessibility-Tab" href="#tab-5">Accessibility</v-tabs-item>
            <v-tabs-item key="FocusAreaAndBeneficiaryGroup-Tab" href="#tab-6">Focus Areas and Beneficiary Groups</v-tabs-item>
            <v-tabs-item key="ServiceProvision-Tab" href="#tab-7">Services Provision</v-tabs-item>
            <v-tabs-item key="StoriesOfSignificantChange-Tab" href="#tab-8">Stories of Significant Change</v-tabs-item>
          </v-tabs-bar>

          <v-tabs-items>
            <v-tabs-content key="General-Tab" id="tab-1" transition="fade-transition" reverse-transition="fade-transition">

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs8 offset-xs2>
                    <v-text-field
                      label="Name"
                      v-model="survey.general.name"
                    ></v-text-field>
                    <v-text-field
                      label="Address"
                      v-model="survey.general.address"
                    ></v-text-field>
                    <v-text-field
                      label="GPS Coordinates"
                      v-model="survey.general.gps_coordinates"
                    ></v-text-field>
                    <div class="title grey--text text--darken-1 text-xs-left">Date of Interview</div>
                    <div class="mb-3"></div>
                    <v-date-picker v-model="survey.general.date_of_interview" landscape label="Date of Interview"></v-date-picker>

                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Persons Interviewed</div>
                    <div class="mb-3"></div>

                    <v-layout row wrap>
                     <v-btn small fab dark color="primary" class="left" @click="survey.general.persons_interviewed.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>

                    <v-layout :key="'person_interviewed_'+person_interviewed.key"
                      style="align-items: center;"
                      row wrap v-for="(person_interviewed, key, index) in survey.general.persons_interviewed">
                        <v-text-field
                          label="Name"
                          v-model="person_interviewed.name"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field
                          label="Position"
                          v-model="person_interviewed.position"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-checkbox align-center justify-center label="Board Member" v-model="person_interviewed.board_member"></v-checkbox>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click="survey.general.persons_interviewed.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>


                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Reseachers</div>
                    <div class="mb-3"></div>

                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.general.reseachers.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>

                    <v-layout :key="'reseacher_'+reseacher.key"
                      style="align-items: center;"
                      row wrap v-for="(reseacher, key, index) in survey.general.reseachers">
                        <v-text-field
                          label="Name"
                          v-model="reseacher.name"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field
                          label="Position"
                          v-model="reseacher.organisation"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-checkbox align-center justify-center label="FHR Staff" v-model="reseacher.fhr_staff"></v-checkbox>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.general.reseachers.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>


                  </v-flex>
                </v-layout>
              </v-container>
            </v-tabs-content>
            <v-tabs-content key="Governance-Tab" id="tab-2" transition="fade-transition" reverse-transition="fade-transition">

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs8 offset-xs2>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Legal Status</div>
                    <div class="mb-3"></div>
                    <v-text-field label="NPO Number"
                     v-model="survey.governance.legal_status.npo_registration_number"></v-text-field>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Date Registered as NPO</div>
                    <div class="mb-3"></div>
                    <v-date-picker v-model="survey.governance.legal_status.npo_date_of_registration" landscape label="Date Registered as NPO"></v-date-picker>
                    <div class="mb-3"></div>
                    <v-select v-bind:items="['None', 'ACAOSA', 'CLDRC', 'CCJD', 'Other']" multiple
                      v-model="survey.governance.legal_status.professional_body" label="Proffesional Body"></v-select>
                    <v-select v-bind:items="['Non Profit', 'Trust', 'For Profit', 'Other']"
                      v-model="survey.governance.legal_status.legal_status" label="Legal Status"></v-select>

                    <div class="display-1 grey--text text--darken-1 text-xs-left">Tax Status</div>
                    <div class="mb-3"></div>
                    <v-select v-bind:items="['Not Registered', 'Tax Registered', 'Tax Exempted', 'VAT Registered', 'Other']"
                      v-model="survey.governance.tax_status.status" label="Tax Status"></v-select>
                    <v-text-field label="Number (Associated to Tax Status)"
                     v-model="survey.governance.tax_status.number"></v-text-field>


                    <div class="display-1 grey--text text--darken-1 text-xs-left">Governance Structure</div>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.governance.governance_structure.management_commitee" label="Management Commitee"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.governance.governance_structure.board" label="Board"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-text-field type="number" label="Number of Board Member" v-model="survey.governance.governance_structure.number_of_board_members"></v-text-field>
                    <div class="title grey--text text--darken-1 text-xs-left">Board Members Terms of Reference</div>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.governance.governance_structure.board_member_tor.tor_exists" label="Board Member Terms of Reference"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.governance.governance_structure.board_member_tor.provided_copy_of_constitution" label="Copy of Constitution"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-text-field multi-line label="Notes" v-model="survey.governance.governance_structure.board_member_tor.notes"></v-text-field>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Board Member Appointment Procedures</div>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.governance.governance_structure.appointment_procedure_for_board_members.procedure_exists"
                                label="Procedure Exists">
                    </v-checkbox>
                    <v-text-field multi-line label="Notes on Appointment Procedure" v-model="survey.governance.governance_structure.appointment_procedure_for_board_members.notes"></v-text-field>
                    <div class="title grey--text text--darken-1 text-xs-left">Board Members Renumeration</div>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.governance.governance_structure.board_members_remunerated.renumerated"
                                label="Renumerated">
                    </v-checkbox>
                    <v-text-field
                      v-if="survey.governance.governance_structure.board_members_remunerated.renumerated"
                      type="number" label="Amount" v-model="survey.governance.governance_structure.board_members_remunerated.amount"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Board Composition</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.governance.governance_structure.composition_of_board.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'cmb_'+cmb.key"
                      style="align-items: center;"
                      row wrap v-for="(cmb, key, index) in survey.governance.governance_structure.composition_of_board">
                        <v-text-field label="Name" v-model="cmb.name"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field label="Role" v-model="cmb.role_on_board"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field type="number" label="Years Serving" v-model="cmb.years_on_board"></v-text-field>
                        <div class="mr-4"></div>
                        <v-select label="Sex" v-bind:items="['Male','Female','Other']"  v-model="cmb.sex"></v-select>
                        <div class="mr-4"></div>
                        <v-select label="Age" v-bind:items="['Adult','Youth']"  v-model="cmb.age_of_member"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field label="Background" multi-line v-model="cmb.background_of_member"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.governance.governance_structure.composition_of_board.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>
                  </v-flex>

                  <v-flex xs8 offset-xs2>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Reporting Systems</div>
                    <div class="mb-3"></div>
                    <v-select label="Frequency of Board Meetings" v-bind:items="['Monthly', 'Quarterly', 'Twice a Year', 'Once a Year', 'Other']"
                              v-model="survey.governance.reporting_systems.frequency_of_board_meetings"></v-select>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.governance.reporting_systems.documented_board_meetings_minutes_available"
                                label="Board Meeting Minutes Available">
                    </v-checkbox>
                    <div class="mb-3"></div>

                    <v-select label="Frequency of Internal Management Meetings" v-bind:items="['Monthly', 'Quarterly', 'Twice a Year', 'Once a Year', 'Other']"
                              v-model="survey.governance.reporting_systems.internal_management_meetings"></v-select>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.governance.reporting_systems.documented_management_meetings_minutes_available"
                                label="Internal Management Meetings Minutes Available">
                    </v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.governance.reporting_systems.annual_report_prepared"
                                label="Annual Report Prepared">
                    </v-checkbox>

                    <div class="display-1 grey--text text--darken-1 text-xs-left">Strategic Planning</div>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.governance.strategic_planning.existence_of_vision_and_mission"
                                label="Vision and Mission">
                    </v-checkbox>
                    <v-checkbox v-model="survey.governance.strategic_planning.strategic_planning_conducted"
                                label="Strategic Planning Conducted">
                    </v-checkbox>
                    <v-select label="Strategic Planning Frequency" v-bind:items="['Twice a Year', 'Once a Year', 'Once every Two Years', 'Other']"
                              v-model="survey.governance.strategic_planning.strategic_planning_frequency"></v-select>
                  </v-flex>

                  <v-flex xs12>
                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Monitoring and Evaluation</div>
                    <div class="mb-3"></div>
                  </v-flex>
                  <v-flex xs6>
                    <div class="title grey--text text--darken-1 text-xs-left">From</div>
                    <v-date-picker v-model="survey.governance.monitoring_and_evaluation.period.from"></v-date-picker>
                  </v-flex>
                  <v-flex xs6>
                    <div class="title grey--text text--darken-1 text-xs-left">To</div>
                    <v-date-picker v-model="survey.governance.monitoring_and_evaluation.period.to"></v-date-picker>
                  </v-flex>

                  <v-flex xs5>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Internal Evaluation</div>
                    <div class="mb-3"></div>
                    <v-select label="Conducted" v-bind:items="['Yes', 'No']"
                              v-model="survey.governance.monitoring_and_evaluation.internal_evaluation.conducted"></v-select>
                    <v-text-field type="number" label="How many Per Year" v-model="survey.governance.monitoring_and_evaluation.internal_evaluation.how_many_per_year">
                    </v-text-field>
                    <div class="mb-3"></div>
                    <v-text-field label="Conducted By" v-model="survey.governance.monitoring_and_evaluation.internal_evaluation.conducted_by"></v-text-field>
                  </v-flex>
                  <div class="mr-4"></div>
                  <v-flex xs5>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">External Evaluation</div>
                    <div class="mb-3"></div>
                    <v-select label="Conducted" v-bind:items="['Yes', 'No']"
                              v-model="survey.governance.monitoring_and_evaluation.external_evaluation.conducted"></v-select>
                    <v-text-field type="number" label="How many Per Year" v-model="survey.governance.monitoring_and_evaluation.external_evaluation.how_many_per_year">
                    </v-text-field>
                    <div class="mb-3"></div>
                    <v-text-field label="Conducted By" v-model="survey.governance.monitoring_and_evaluation.external_evaluation.conducted_by"></v-text-field>
                  </v-flex>

                  <v-flex xs12 >
                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Programme Planning and Management</div>
                    <v-select label="Clear Programme Objectives and Deliverables" v-bind:items="['Yes', 'No', 'N/A']"
                              v-model="survey.governance.programme_planning_and_management.clear_programme_objectives_and_deliverables"></v-select>

                    <v-checkbox v-model="survey.governance.programme_planning_and_management.the_organisation_incorporates_learning_from_projects_and_evaluations_into_strategic_planning"
                                label="The Organisation Incorporates Learning from Projects and Evaluations into Strategic Planning">
                    </v-checkbox>

                    <div class="mb-3"></div>
                  </v-flex>


                </v-layout>
              </v-container>
            </v-tabs-content>
            <v-tabs-content key="OrganisationalCapacityAndResources-Tab" id="tab-3" transition="fade-transition" reverse-transition="fade-transition">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>

                  <v-flex xs8 offset-xs2>
                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Duration of Existence</div>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Year Established</div>
                    <div class="mb-3"></div>
                    <v-date-picker type="month" v-model="survey.organisational_capacity_and_resources.duration_of_existance.year_established" landscape></v-date-picker>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Year Registered as NPO</div>
                    <div class="mb-3"></div>
                    <v-date-picker type="month" v-model="survey.organisational_capacity_and_resources.duration_of_existance.year_registered" landscape></v-date-picker>
                    <div class="mb-3"></div>
                    <v-select multiple v-bind:items="['Less than A Year', '1-3 Years', '3-5 Years', '5-10 Years', '10-15 Years', '15-20 Years', 'More than 20 Years']"  v-model="survey.organisational_capacity_and_resources.duration_of_existance.years_in_operation" label="Years in Operation"></v-select>
                  </v-flex>

                  <v-flex xs12>
                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Staff Skill/Education</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.organisational_capacity_and_resources.level_of_staff_skill.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'lss_'+lss.key"
                      style="align-items: center;"
                      row wrap v-for="(lss, key, index) in survey.organisational_capacity_and_resources.level_of_staff_skill">
                        <v-select label="Staff Status" v-bind:items="['Full Time', 'Part Time', 'Volunteers', 'Other']"  v-model="lss.staff_status"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field type="number" placeholder="Persons with Post Graduate Degree?" v-model="lss.with_post_graduate_degree"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field type="number" placeholder="Persons with Degree?" v-model="lss.with_degree"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field type="number" placeholder="Persons with Tertiary Qualification?" v-model="lss.with_tertiary_qualification"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field type="number" placeholder="Persons with Matric?" v-model="lss.with_matric"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.organisational_capacity_and_resources.level_of_staff_skill.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Staff Profile and Turnover</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.organisational_capacity_and_resources.staff_profile_and_turnover.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'spat_'+spat.key"
                      style="align-items: center;"
                      row wrap v-for="(spat, key, index) in survey.organisational_capacity_and_resources.staff_profile_and_turnover">
                        <v-text-field label="Staff Role" v-model="spat.role_of_staff_member"></v-text-field>
                        <div class="mr-4"></div>
                        <v-select label="Race" v-bind:items="['Black', 'Coloured', 'Indian', 'White', 'Other']"  v-model="spat.race"></v-select>
                        <div class="mr-4"></div>
                        <v-select label="Sex" v-bind:items="['Male', 'Female', 'Other']"  v-model="spat.sex"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field type="number" placeholder="Year of Employment" v-model="spat.years_of_employment"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.organisational_capacity_and_resources.staff_profile_and_turnover.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Staff Development</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.organisational_capacity_and_resources.staff_development.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'sd_'+sd.key"
                      style="align-items: center;"
                      row wrap v-for="(sd, key, index) in survey.organisational_capacity_and_resources.staff_development">
                        <v-select label="Where" v-bind:items="['In House', 'External']"  v-model="sd.type"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field label="Service Provider" v-model="sd.service_provider"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field label="Type of Training" v-model="sd.type_of_training"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field label="Frequency" v-model="sd.frequency"></v-text-field>
                        <div class="mr-4"></div>

                        <v-btn small fab dark color="red" class="left" @click.native="survey.organisational_capacity_and_resources.staff_development.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>
                  </v-flex>

                  <v-flex xs8 offset-xs2>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Human Resources Policies and Procedures</div>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.organisational_capacity_and_resources.human_resource_policies_and_procedures.documented_job_descriptions"
                      label="Documented Job Descriptions"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.organisational_capacity_and_resources.human_resource_policies_and_procedures.documented_human_resource_policy_or_manual"
                      label="Documented Human Resource Policy or Manual"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.organisational_capacity_and_resources.human_resource_policies_and_procedures.performance_management_systems_in_place"
                      label="Performance Management Systems in Place"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.organisational_capacity_and_resources.human_resource_policies_and_procedures.dedicated_human_resource_staff_member"
                      label="Dedicated Human Resource Staff Member"></v-checkbox>


                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Use of Technology</div>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.organisational_capacity_and_resources.use_of_technology.access_to_computers"
                      label="Access to Computers"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.organisational_capacity_and_resources.use_of_technology.access_to_internet"
                      label="Access to Internet"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.organisational_capacity_and_resources.use_of_technology.uses_social_media"
                      label="Uses Social Media"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-select label="Social Media Platforms" v-bind:items="['Facebook', 'Twitter', 'Instagram', 'Whatsapp', 'LinkedIn', 'Other']"
                      v-if="survey.organisational_capacity_and_resources.use_of_technology.uses_social_media" v-model="survey.organisational_capacity_and_resources.use_of_technology.platforms" multiple></v-select>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.organisational_capacity_and_resources.use_of_technology.website"
                      label="Website"></v-checkbox>


                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Case Management System</div>
                    <div class="mb-3"></div>
                    <v-select label="Current System" v-bind:items="['Manual', 'Electronic']"
                       v-model="survey.organisational_capacity_and_resources.case_management_system.case_management_system" multiple></v-select>
                    <div class="mb-3"></div>
                    <v-text-field label="System Description" multi-line v-model="survey.organisational_capacity_and_resources.case_management_system.description"></v-text-field>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Collaborations and Networks</div>
                    <div class="mb-3"></div>
                    <v-checkbox v-model="survey.organisational_capacity_and_resources.collaboration_and_network.use_of_networks_and_partnerships"
                      label="Do you have Collborations/Networks"></v-checkbox>

                    <div class="mb-3" v-if="survey.organisational_capacity_and_resources.collaboration_and_network.use_of_networks_and_partnerships"></div>
                    <div class="title grey--text text--darken-1 text-xs-left" v-if="survey.organisational_capacity_and_resources.collaboration_and_network.use_of_networks_and_partnerships">Collaborators/Networks</div>
                    <div class="mb-3" v-if="survey.organisational_capacity_and_resources.collaboration_and_network.use_of_networks_and_partnerships"></div>

                    <v-layout row wrap v-if="survey.organisational_capacity_and_resources.collaboration_and_network.use_of_networks_and_partnerships">
                      <v-btn small fab dark color="primary" class="left" @click="survey.organisational_capacity_and_resources.collaboration_and_network.specify.push({
                        partner: null
                      })">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'cbn_'+cbn.key" v-if="survey.organisational_capacity_and_resources.collaboration_and_network.use_of_networks_and_partnerships"
                      style="align-items: center;"
                      row wrap v-for="(cbn, key, index) in survey.organisational_capacity_and_resources.collaboration_and_network.specify">
                        <v-text-field label="Service Provider" v-model="cbn.partner"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.organisational_capacity_and_resources.collaboration_and_network.specify.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                  </v-flex>




                </v-layout>
              </v-container>
            </v-tabs-content>
            <v-tabs-content key="FinancialViability-Tab" id="tab-4" transition="fade-transition" reverse-transition="fade-transition">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs6 offset-xs3>
                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Financial System</div>
                    <div class="mb-3"></div>
                    <v-checkbox align-center justify-center label="Bank Account" v-model="survey.financial_viability.financial_system.bank_account"></v-checkbox>
                    <v-checkbox align-center justify-center label="Office" v-model="survey.financial_viability.financial_system.office.does_have"></v-checkbox>
                    <v-text-field type="number" v-model="survey.financial_viability.financial_system.office.how_many" v-if="survey.financial_viability.financial_system.office.does_have" label="How Many Offices"></v-text-field>
                    <v-checkbox align-center justify-center label="Dedicated Finance Staff" v-model="survey.financial_viability.financial_system.dedicated_financial_staff"></v-checkbox>
                    <v-checkbox align-center justify-center label="Annual Independat Financial Assessments" v-model="survey.financial_viability.financial_system.annual_independant_audits"></v-checkbox>
                    <v-checkbox align-center justify-center label="Book keeping System" v-model="survey.financial_viability.financial_system.book_keeping_system"></v-checkbox>
                  </v-flex>
                  <v-flex xs12>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Funding</div>
                    <div class="mb-3"></div>

                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Monetary Sources</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.financial_viability.funding.monetary_sources.push({
                        period: {from_year:null, to_year: null},
                        sources: [{
                        type_of_funding: [] }]
                      })">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>

                    <v-layout :key="'fms_'+fms.key"
                      style="align-items: center;"
                      row wrap v-for="(fms, key, index) in survey.financial_viability.funding.monetary_sources">
                          <v-menu lazy :close-on-content-click="false" v-model="picker5[key]" transition="scale-transition" offset-y full-width
                            :nudge-right="40" max-width="290px" min-width="290px">
                            <v-text-field slot="activator" label="From Year" v-model="fms.period.from_year" prepend-icon="event" readonly></v-text-field>
                            <v-date-picker type="month" v-model="fms.period.from_year" no-title scrollable actions>
                              <template slot-scope="{ save, cancel }">
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                  <v-btn flat color="primary" @click="save">OK</v-btn>
                                </v-card-actions>
                              </template>
                            </v-date-picker>
                          </v-menu>
                          <div class="mr-4"></div>
                          <v-menu lazy :close-on-content-click="false" v-model="picker4[key]" transition="scale-transition" offset-y full-width
                            :nudge-right="40" max-width="290px" min-width="290px">
                            <v-text-field slot="activator" label="To Year" v-model="fms.period.to_year" prepend-icon="event" readonly></v-text-field>
                            <v-date-picker v-model="fms.period.to_year" type="month" no-title scrollable actions>
                              <template slot-scope="{ save, cancel }">
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                  <v-btn flat color="primary" @click="save">OK</v-btn>
                                </v-card-actions>
                              </template>
                            </v-date-picker>
                          </v-menu>
                          <div class="mr-4"></div>

                        <v-layout row wrap>
                          <v-flex>
                            <div class="title grey--text text--darken-1 text-xs-left">Source Details</div>
                            <div class="mr-4"></div>
                            <v-layout row wrap>
                              <v-btn small fab dark color="green" class="left" @click="fms.sources.push({type_of_funding: []})">
                                <v-icon dark>add</v-icon>
                              </v-btn>
                            </v-layout>
                            <div class="mr-4"></div>
                            <v-layout :key="'srcd_'+srdc.key"
                              style="align-items: center;"
                              row wrap v-for="(srdc, key, index) in fms.sources">
                              <v-select v-bind:items="monetarySources" v-model="srdc.source_type" label="Source Type"></v-select>
                              <div class="mr-4"></div>
                              <v-text-field label="Names of Sources" v-model="srdc.sources_name_list"></v-text-field>
                              <div class="mr-4"></div>
                              <v-text-field label="Amount in Rand" v-model="srdc.rand_amount"></v-text-field>
                              <div class="mr-4"></div>
                              <v-select v-bind:items="['1 Year','Multi-Year']"  v-model="srdc.duration" label="Duration"></v-select>
                              <div class="mr-4"></div>
                              <v-select multiple v-bind:items="['Event/Activity', 'Prgramme', 'Core']"  v-model="srdc.type_of_funding" label="Type of Fuding"></v-select>
                              <div class="mr-4"></div>
                              <v-btn small fab dark color="orange" class="left" @click.native="fms.sources.splice(key, 1)">
                                <v-icon dark>remove</v-icon>
                              </v-btn>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.financial_viability.funding.monetary_sources.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>


                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Non-Monetary Sources</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.financial_viability.funding.non_monetary_source.push({
                        period: {from_year:null, to_year: null},
                        sources: [{
                            type_of_assitance: [],
                            provided_by: null
                          }]
                      })">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>

                    <v-layout :key="'nms_'+nms.key"
                      style="align-items: center;"
                      row wrap v-for="(nms, key, index) in survey.financial_viability.funding.non_monetary_source">
                          <v-menu lazy :close-on-content-click="false" v-model="picker6[key]" transition="scale-transition" offset-y full-width
                            :nudge-right="40" max-width="290px" min-width="290px">
                            <v-text-field slot="activator" label="From Year" v-model="nms.period.from_year" prepend-icon="event" readonly></v-text-field>
                            <v-date-picker v-model="nms.period.from_year" type="month" no-title scrollable actions>
                              <template slot-scope="{ save, cancel }">
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                  <v-btn flat color="primary" @click="save">OK</v-btn>
                                </v-card-actions>
                              </template>
                            </v-date-picker>
                          </v-menu>
                          <div class="mr-4"></div>
                          <v-menu lazy :close-on-content-click="false" v-model="picker7[key]" transition="scale-transition" offset-y full-width
                            :nudge-right="40" max-width="290px" min-width="290px">
                            <v-text-field slot="activator" label="To Year" v-model="nms.period.to_year" prepend-icon="event" readonly></v-text-field>
                            <v-date-picker v-model="nms.period.to_year" type="month" no-title scrollable actions>
                              <template slot-scope="{ save, cancel }">
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                  <v-btn flat color="primary" @click="save">OK</v-btn>
                                </v-card-actions>
                              </template>
                            </v-date-picker>
                          </v-menu>
                          <div class="mr-4"></div>

                        <v-layout row wrap>
                          <v-flex>
                            <div class="title grey--text text--darken-1 text-xs-left">Source Details</div>
                            <div class="mr-4"></div>
                            <v-layout row wrap>
                              <v-btn small fab dark color="green" class="left" @click="nms.sources.push({ type_of_assitance: [], provided_by: null})">
                                <v-icon dark>add</v-icon>
                              </v-btn>
                            </v-layout>
                            <div class="mr-4"></div>
                            <v-layout :key="'nmss_'+nmss.key"
                              style="align-items: center;"
                              row wrap v-for="(nmss, key, index) in nms.sources">
                              <v-select multiple v-bind:items="['Technical Assistance', 'Office Space', 'Vehicle', 'Computer Equipment', 'Other']"  v-model="nmss.type_of_assitance" label="Type of Fuding"></v-select>
                              <div class="mr-4"></div>
                              <v-text-field label="Provided by" v-model="nmss.provided_by"></v-text-field>
                              <div class="mr-4"></div>
                              <v-btn small fab dark color="orange" class="left" @click.native="nmss.sources.splice(key, 1)">
                                <v-icon dark>remove</v-icon>
                              </v-btn>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.financial_viability.funding.non_monetary_source.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Conditions and Terms of Funding</div>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Funding Challenges</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.financial_viability.condition_and_terms_of_funding.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'catf_'+catf.key"
                      style="align-items: center;"
                      row wrap v-for="(catf, key, index) in survey.financial_viability.condition_and_terms_of_funding">
                        <v-text-field label="Funding Source" v-model="catf.funding_source"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field label="Challenges" multi-line v-model="catf.challenges"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.financial_viability.condition_and_terms_of_funding.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Monthly Expenditure</div>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Budget</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.financial_viability.expenditure.monthly_budget_information.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'emb_'+emb.key"
                      style="align-items: center;"
                      row wrap v-for="(emb, key, index) in survey.financial_viability.expenditure.monthly_budget_information">
                        <v-select v-bind:items="budgetItem"  v-model="emb.budget_item" label="Budget Item"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field type="number" label="Monthly Expenditure" v-model="emb.monthly_expenditure"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field type="number" label="Required Monthly" v-model="emb.required_monthly"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field type="number" label="Shortfall" v-model="emb.shortfall"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.financial_viability.expenditure.monthly_budget_information.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>
                  </v-flex>
                  <div class="mb-3"></div>
                  <v-flex xs6>
                    <v-select label="Are there reserves remaining at the end of month?" v-model="survey.financial_viability.expenditure.after_exhausting_montly_budget.reserves_remaining" v-bind:items="['Yes','No']"></v-select>
                    <v-text-field type="number" v-if="survey.financial_viability.expenditure.after_exhausting_montly_budget.reserves_remaining === 'Yes' " label="How much" v-model="survey.financial_viability.expenditure.after_exhausting_montly_budget.how_much"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Resources and Assets</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.financial_viability.resources_and_assests.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'raa_'+raa.key"
                      style="align-items: center;"
                      row wrap v-for="(raa, key, index) in survey.financial_viability.resources_and_assests">
                        <v-select v-bind:items="['Telephone', 'Cell Phones', 'Vehicle, Immovable Assets', 'Other']"  v-model="raa.type" label="Asset"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field label="Specify" v-if="raa.type === 'Other'" v-model="raa.specify"></v-text-field>
                        <div class="mr-4"></div>
                        <v-select label="In possession of?" v-model="raa.possession" v-bind:items="['Yes','No']"></v-select>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.financial_viability.resources_and_assests.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>


                  </v-flex>

                </v-layout>
              </v-container>
            </v-tabs-content>
            <v-tabs-content key="Accessibility-Tab" id="tab-5" transition="fade-transition" reverse-transition="fade-transition">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs6 offset-xs3>
                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">CSO Location</div>
                    <div class="mb-3"></div>
                    <v-text-field
                      label="Address"
                      v-model="survey.accessibility.cso_location.address"
                    ></v-text-field>
                    <v-select
                      v-bind:items="['Urban','Peri-Urban', 'Rural']"
                      v-model="survey.accessibility.cso_location.location"
                      label="Location Type"
                    ></v-select>
                    <v-text-field
                      label="Town/Municipality"
                      v-model="survey.accessibility.cso_location.town_municipality"
                    ></v-text-field>
                    <v-select
                      v-bind:items="provinces"
                      v-model="survey.accessibility.cso_location.location"
                      label="Province"
                    ></v-select>
                    <v-text-field
                      label="Country"
                      v-model="survey.accessibility.cso_location.country"
                    ></v-text-field>

                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Geographical Reach</div>
                    <div class="mb-3"></div>
                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Locations</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.accessibility.geographical_reach.locations.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'grl_'+grl.key"
                      style="align-items: center;"
                      row wrap v-for="(grl, key, index) in survey.accessibility.geographical_reach.locations">
                        <v-text-field label="Location" v-model="grl.location"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.accessibility.geographical_reach.locations.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Town/Municipality</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.accessibility.geographical_reach.town_municipalities.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'twm_'+twm.key"
                      style="align-items: center;"
                      row wrap v-for="(twm, key, index) in survey.accessibility.geographical_reach.town_municipalities">
                        <v-text-field label="Location" v-model="twm.municipality"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.accessibility.geographical_reach.town_municipalities.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Provinces</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.accessibility.geographical_reach.provinces.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'prvs_'+prvs.key"
                      style="align-items: center;"
                      row wrap v-for="(prvs, key, index) in survey.accessibility.geographical_reach.provinces">
                        <v-select
                          v-bind:items="provinces"
                          v-model="prvs.province"
                          label="Province"
                        ></v-select>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.accessibility.geographical_reach.provinces.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Countries</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.accessibility.geographical_reach.countries.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'ctr_'+ctr.key"
                      style="align-items: center;"
                      row wrap v-for="(ctr, key, index) in survey.accessibility.geographical_reach.countries">
                        <v-text-field label="Location" v-model="ctr.country"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.accessibility.geographical_reach.countries.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">State Service Points</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.accessibility.state_service_points.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'ssp_'+ssp.key"
                      style="align-items: center;"
                      row wrap v-for="(ssp, key, index) in survey.accessibility.state_service_points">
                        <v-select
                          v-bind:items="servicePoint"
                          v-model="ssp.service_point"
                          label="Service Point"
                        ></v-select>
                        <div class="mr-4"></div>
                        <v-select
                          v-bind:items="distance"
                          v-model="ssp.distance"
                          label="Distance"
                        ></v-select>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.accessibility.state_service_points.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>
                  </v-flex>


                  <v-flex xs12>
                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Beneficiary Access</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.accessibility.beneficiary_access.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'bena_'+bena.key"
                      style="align-items: center;"
                      row wrap v-for="(bena, key, index) in survey.accessibility.beneficiary_access">
                        <v-select
                          v-bind:items="accessTypes"
                          v-model="bena.access_type"
                          label="Access Type"
                        ></v-select>
                        <div class="mr-4"></div>
                        <v-text-field
                          label="Specify?"
                          v-if="bena.access_type === 'Other'"
                          v-model="actp.specify"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-select
                          v-bind:items="['Yes', 'No']"
                          v-model="bena.yes_or_no"
                          label="Access Provided"
                        ></v-select>
                        <div class="mr-4"></div>
                        <v-text-field
                          type="number"
                          min="0"
                          max="3"
                          v-model="bena.rank"
                          label="Rank 1-most accessible to 3-least accessible"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.accessibility.beneficiary_access.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                      </v-layout>

                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Language Accessibility</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.accessibility.language_accessibility.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'langa_'+langa.key"
                      style="align-items: center;"
                      row wrap v-for="(langa, key, index) in survey.accessibility.language_accessibility">
                        <v-select
                          v-bind:items="languages"
                          v-model="langa.language"
                          label="Language"
                        ></v-select>
                        <div class="mr-4"></div>
                        <v-text-field
                          label="Specify?"
                          v-if="langa.language === 'Other'"
                          v-model="langa.specify"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-checkbox align-center justify-center label="Are Staff Proficient in Language" v-model="langa.cso_staff_language_proficiency"></v-checkbox>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.accessibility.language_accessibility.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-flex>

                </v-layout>
              </v-container>
            </v-tabs-content>
            <v-tabs-content key="FocusAreaAndBeneficiaryGroup-Tab" id="tab-6" transition="fade-transition" reverse-transition="fade-transition">

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs6 offset-xs3>
                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Focus Areas</div>
                    <div class="mb-3"></div>

                    <v-select label="Labour Rights"
                      v-bind:items="['UIF','Workman’s Compensation', 'Working Conditions', 'CCMA Support']"
                      v-model="survey.focus_area_and_beneficiary_group.focus_area.labour_rights" multiple max-height="400" persistent-hint
                    ></v-select>
                    <v-select label="Legal Rights"
                      v-bind:items="['Legal Representation', 'Access to Information']"
                      v-model="survey.focus_area_and_beneficiary_group.focus_area.legal_rights" multiple max-height="400" persistent-hint
                    ></v-select>
                    <v-select label="Gender"
                      v-bind:items="['Domestic Violence', 'Rape']"
                      v-model="survey.focus_area_and_beneficiary_group.focus_area.gender" multiple max-height="400" persistent-hint
                    ></v-select>
                    <v-select label="Children"
                      v-bind:items="['Child Abuse', 'Child Neglect', 'Social Services (grants)']"
                      v-model="survey.focus_area_and_beneficiary_group.focus_area.children" multiple max-height="400" persistent-hint
                    ></v-select>
                    <v-select label="Housing"
                      v-bind:items="['Access to Housing', 'Evictions', 'Living Conditions', 'Water and Sanitation']"
                      v-model="survey.focus_area_and_beneficiary_group.focus_area.housing" multiple max-height="400" persistent-hint
                    ></v-select>
                    <v-select label="Health"
                      v-bind:items="['Access to Healthcare', 'Health Promotion']"
                      v-model="survey.focus_area_and_beneficiary_group.focus_area.health" multiple max-height="400" persistent-hint
                    ></v-select>
                    <v-select label="Education"
                      v-bind:items="['School', 'Further Education and Training', 'ECD' ]"
                      v-model="survey.focus_area_and_beneficiary_group.focus_area.education" multiple max-height="400" persistent-hint
                    ></v-select>
                    <v-select label="Social Services"
                      v-bind:items="['Access to Protection Services (Social Workers)', 'Grants']"
                      v-model="survey.focus_area_and_beneficiary_group.focus_area.social_services" multiple max-height="400" persistent-hint
                    ></v-select>
                    <v-select label="Safety Crime and Violence"
                      v-bind:items="['Prevention programmes', 'Support services to victims who have succumbed to violence', 'Restorative Justice/ADR/Conflict Dispute Resolution/Mediation']"
                      v-model="survey.focus_area_and_beneficiary_group.focus_area.safety_crime_and_violence" multiple max-height="400" persistent-hint
                    ></v-select>
                    <v-select label="Debt Management"
                      v-bind:items="['Counselling', 'Legal Advice']"
                      v-model="survey.focus_area_and_beneficiary_group.focus_area.debt_management" multiple max-height="400" persistent-hint
                    ></v-select>
                    <v-select label="Family Law"
                      v-bind:items="['Deceased estates', 'Wills', 'Divorce', 'Maintenance', 'Custody']"
                      v-model="survey.focus_area_and_beneficiary_group.focus_area.family_law" multiple max-height="400" persistent-hint
                    ></v-select>

                  </v-flex>

                  <v-flex>
                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Target Beneficiary Groups</div>
                    <div class="mb-3"></div>

                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.focus_area_and_beneficiary_group.target_beneficiary_group.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'tbg'+tbg.key"
                      style="align-items: center;"
                      row wrap v-for="(tbg, key, index) in survey.focus_area_and_beneficiary_group.target_beneficiary_group">
                        <v-select
                          v-bind:items="beneficiaryTypes"
                          v-model="tbg.beneficiary_type"
                          label="Beneficiary Type"
                        ></v-select>
                        <div class="mr-4"></div>
                        <v-text-field
                          label="Specify?"
                          v-if="tbg.beneficiary_type === 'Other'"
                          v-model="tbg.specify"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-select
                          v-bind:items="['Yes', 'No']"
                          v-model="tbg.yes_or_no"
                          label="Support Provided for this Group?">
                        </v-select>
                        <div class="mr-4"></div>
                        <v-text-field
                          label="Sub-Category"
                          v-model="tbg.subcategory"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.focus_area_and_beneficiary_group.target_beneficiary_group.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                  </v-flex>

                </v-layout>
              </v-container>
            </v-tabs-content>
            <v-tabs-content key="ServiceProvision-Tab" id="tab-7" transition="fade-transition" reverse-transition="fade-transition">

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12>

                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Activity Participation</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.service_provision.activity_participation.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'actp_'+actp.key"
                      style="align-items: center;"
                      row wrap v-for="(actp, key, index) in survey.service_provision.activity_participation">
                        <v-select
                          v-bind:items="activities"
                          v-model="actp.activity"
                          label="Activity"
                        ></v-select>
                        <div class="mr-4"></div>
                        <v-select
                          v-bind:items="['Yes', 'No']"
                          v-model="actp.yes_or_no"
                          label="Yes or No">
                        </v-select>
                        <div class="mr-4"></div>
                        <v-text-field
                          label="Specify?"
                          v-if="actp.yes_or_no === 'Yes'"
                          v-model="actp.specify"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.service_provision.activity_participation.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Cases</div>
                    <div class="mb-3"></div>

                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Average Number of Cases Per Day</div>
                    <div class="mb-3"></div>
                    <v-flex xs4>
                      <v-text-field type="number" label="Average Number of Cases Per Day?" v-model="survey.service_provision.average_number_of_cases_per_day"></v-text-field>
                    </v-flex>

                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Total Number of Cases Per Period</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.service_provision.total_number_of_cases.push({
                        period: {
                          from: null,
                          to: null
                        }
                      })">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'tnoc_'+tnoc.key"
                      style="align-items: center;"
                      row wrap v-for="(tnoc, key, index) in survey.service_provision.total_number_of_cases">
                        <v-menu lazy :close-on-content-click="false" v-model="picker3[key]" transition="scale-transition" offset-y full-width
                          :nudge-right="40" max-width="290px" min-width="290px">
                          <v-text-field slot="activator" label="From" v-model="tnoc.period.from" prepend-icon="event" readonly></v-text-field>
                          <v-date-picker v-model="tnoc.period.from" no-title scrollable type="month" actions>
                            <template slot-scope="{ save, cancel }">
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                <v-btn flat color="primary" @click="save">OK</v-btn>
                              </v-card-actions>
                            </template>
                          </v-date-picker>
                        </v-menu>
                        <div class="mr-4"></div>
                        <v-menu lazy :close-on-content-click="false" v-model="picker2[key]" transition="scale-transition" offset-y full-width
                          :nudge-right="40" max-width="290px" min-width="290px">
                          <v-text-field slot="activator" label="To" v-model="tnoc.period.to" prepend-icon="event" readonly></v-text-field>
                          <v-date-picker v-model="tnoc.period.to" no-title scrollable  type="month" actions>
                            <template slot-scope="{ save, cancel }">
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                <v-btn flat color="primary" @click="save">OK</v-btn>
                              </v-card-actions>
                            </template>
                          </v-date-picker>
                        </v-menu>
                        <div class="mr-4"></div>
                        <v-text-field type="number" label="Cases" v-model="tnoc.cases"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.service_provision.total_number_of_cases.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Referrals in Past Month</div>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Select Month</div>
                    <div class="mb-3"></div>
                    <v-date-picker type="month" v-model="survey.service_provision.referrals_past_month.month" landscape label="Month"></v-date-picker>

                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Referrals</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.service_provision.referrals_past_month.referrals.push({referrals:[{place: null, times: null}]})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'rpmr'+rpmr.key"
                      style="align-items: center;"
                      row wrap v-for="(rpmr, key, index) in survey.service_provision.referrals_past_month.referrals">
                        <v-select
                          v-bind:items="['Legal Aid', 'Social Services', 'Chapter 9’s/Ombudsman', 'Other']"
                          v-model="rpmr.referral_type"
                          label="Referral Type">
                        </v-select>
                        <div class="mr-4"></div>
                        <v-text-field
                          label="Other?"
                          v-if="rpmr.referral_type === 'Other'"
                          v-model="rpmr.other"
                        ></v-text-field>
                        <v-layout row wrap>
                          <v-flex>
                            <div class="title grey--text text--darken-1 text-xs-left">Referral Details</div>
                            <v-layout row wrap>
                              <v-btn small fab dark color="green" class="left" @click="rpmr.referrals.push({})">
                                <v-icon dark>add</v-icon>
                              </v-btn>
                            </v-layout>
                            <v-layout :key="'rpmrr'+rpmrr.key"
                              style="align-items: center;"
                              row wrap v-for="(rpmrr, key, index) in rpmr.referrals">
                              <v-text-field label="Referred To" v-model="rpmrr.place" ></v-text-field>
                              <div class="mr-4"></div>
                              <v-text-field label="How many Times" v-model="rpmrr.times" ></v-text-field>
                              <div class="mr-4"></div>
                              <v-btn small fab dark color="orange" class="left" @click.native="rpmr.referrals.splice(key, 1)">
                                <v-icon dark>remove</v-icon>
                              </v-btn>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.service_provision.referrals_past_month.referrals.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Programmes</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.service_provision.programmes_ran.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'pran'+pran.key"
                      style="align-items: center;"
                      row wrap v-for="(pran, key, index) in survey.service_provision.programmes_ran">
                        <v-menu lazy :close-on-content-click="false" v-model="picker1[key]" transition="scale-transition" offset-y full-width
                          :nudge-right="40" max-width="290px" min-width="290px">
                          <v-text-field slot="activator" label="Year" v-model="pran.year" prepend-icon="event" readonly></v-text-field>
                          <v-date-picker v-model="pran.year" no-title scrollable type="month" actions>
                            <template slot-scope="{ save, cancel }">
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                <v-btn flat color="primary" @click="save">OK</v-btn>
                              </v-card-actions>
                            </template>
                          </v-date-picker>
                        </v-menu>
                        <div class="mr-4"></div>
                        <v-text-field multi-line label="Programmes Description" v-model="pran.description"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.service_provision.programmes_ran.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Achievements/Impact</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.service_provision.achievements_impact.push('')">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'acvi_'+acvi.key"
                      style="align-items: center;"
                      row wrap v-for="(acvi, key, index) in survey.service_provision.achievements_impact">
                        <div class="mr-4"></div>
                        <v-text-field label="Achievement/Impact" multi-line v-model="acvi.achievement_impact"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.service_provision.achievements_impact.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                  </v-flex>
                </v-layout>
              </v-container>
            </v-tabs-content>
            <v-tabs-content key="StoriesOfSignificantChange-Tab" id="tab-8" transition="fade-transition" reverse-transition="fade-transition">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12>

                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Stories of Significant Change</div>
                    <div class="mb-3"></div>

                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="survey.story_of_significant_change.push({})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>

                    <v-layout :key="'sosc_'+sosc.key"
                      style="align-items: center;"
                      row wrap v-for="(sosc, key, index) in survey.story_of_significant_change">
                        <v-text-field
                          placeholder="How long have you been a client of this CAO?"
                          v-model="sosc.how_long_have_you_been_a_client_of_this_cao"
                          multi-line
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field
                          placeholder="What do you think is important about the work that the CAO does for your community?"
                          v-model="sosc.what_do_you_think_is_important_about_the_work_that_the_cao_does_for_your_community"
                          multi-line
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field
                          placeholder="What are the important changes that have occurred in your life from the assistance you have received from the CAO?"
                          v-model="sosc.what_are_the_important_changes_that_have_occurred_in_your_life_from_the_assistance_you_have_received_from_the_cao"
                          multi-line
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field
                          placeholder="Have you experienced any challenges in receiving assistance from this CAO?"
                          v-model="sosc.have_you_experienced_any_challenges_in_receiving_assistance_from_this_cao"
                          multi-line
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="survey.story_of_significant_change.splice(key, 1)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                  </v-flex>
                </v-layout>
              </v-container>
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

      picker1: [],
      picker2: [],
      picker3: [],
      picker4: [],
      picker5: [],
      picker6: [],
      picker7: [],

      valid: false,
      create: true,
      survey: {},
      copySurvey: {},
      emptySurvey: {
        general: {
          name: null,
          address: null,
          gps_coordinates: null,
          persons_interviewed: [{
            name: null,
            position: null,
            board_member: null
          }],
          reseachers: [{
            name: null,
            organisation: null,
            fhr_staff_member: null
          }]
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
            composition_of_board: [{
              name: null,
              role_on_board: null,
              years_on_board: null,
              sex: null,
              age_of_member: null,
              background_of_member: null
            }]
          },
          reporting_systems: {
            frequency_of_board_meetings: null,
            documented_board_meetings_minutes_available: null,
            internal_management_meetings: null,
            documented_management_meetings_minutes_available: null,
            annual_report_prepared: null
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
          level_of_staff_skill: [{
            staff_status: null,
            with_post_graduate_degree: null,
            with_degree: null,
            with_tertiary_qualification: null,
            with_matric: null
          }],
          staff_profile_and_turnover: [{
            role_of_staff_member: null,
            race: null,
            sex: null,
            years_of_employment: null
          }],
          staff_development: [{
            type: null,
            service_provider: null,
            type_of_training: null,
            frequency: null
          }],
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
            annual_independant_audits: null,
            book_keeping_system: null
          },
          funding: {
            monetary_sources: [{
              period: {
                from_year: null,
                to_year: null
              },
              sources: [{
                source_type: null,
                source_name_list: [{
                  name: null
                }],
                rand_amount: null,
                duration: null,
                type_of_funding: []
              }]
            }],
            non_monetary_source: [{
              period: {
                from_year: null,
                to_year: null
              },
              sources: [{
                type_of_assitance: [],
                provided_by: null
              }]
            }]
          },
          condition_and_terms_of_funding: [{
            funding_source: null,
            challenges: null
          }],
          expenditure: {
            monthly_budget_information: [{
              budget_item: null,
              monthly_expenditure: null,
              required_monthly: null,
              shortfall: null
            }],
            after_exhausting_montly_budget: {
              reserves_remaining: null,
              how_much: null
            }
          },
          resources_and_assests: [{
            type: null,
            possession: null,
            specify: null
          }]
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
            locations: [{
              location: null
            }],
            town_municipalities: [{
              municipality: null
            }],
            provinces: [{
              province: null
            }],
            countries: [{
              country: null
            }]
          },
          state_service_points: [{
            service_point: null,
            distance: null
          }],
          beneficiary_access: [{
            access_type: null,
            yes_or_no: null,
            rank: null,
            specify: null
          }],
          language_accessibility: [{
            language: null,
            cso_staff_language_proficiency: null,
            specify: null
          }]
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
            top_five_focus_areas: [
              {
                focus_area: null,
                rank: null
              }
            ]
          },
          target_beneficiary_group: [{
            beneficiary_type: null,
            yes_or_no: null,
            subcategory: null,
            specify: null
          }]
        },
        service_provision: {
          activity_participation: [{
            activity: null,
            yes_or_no: null,
            specify: null
          }],
          average_number_of_cases_per_day: null,
          total_number_of_cases: [{
            period: {
              from: null,
              to: null
            },
            cases: null
          }],
          referrals_past_month: {
            month: null,
            referrals: [{
              referral_type: null,
              referrals: [{
                place: null,
                times: null
              }],
              other: null
            }]
          },
          programmes_ran: [{
            year: null,
            description: null
          }],
          achievements_impact: [{
            achievement_impact: null
          }]
        },
        story_of_significant_change: [{
          how_long_have_you_been_a_client_of_this_cao: null,
          what_do_you_think_is_important_about_the_work_that_the_cao_does_for_your_community: null,
          what_are_the_important_changes_that_have_occurred_in_your_life_from_the_assistance_you_have_received_from_the_cao: null,
          have_you_experienced_any_challenges_in_receiving_assistance_from_this_cao: null
        }]
      },
      activities: [
        'Advocacy and Lobbying/ Awareness',
        'Research',
        'Human Rights Education and Awareness',
        'Health promotion',
        'Public and civic participation',
        'Community mobilisation',
        'Capacity building of civil society organisations',
        'Community Development',
        'Conflict Dispute Resolution/Mediation/ADR',
        'Skills Development',
        'Business Development',
        'Help/Provide Access to information/services',
        'Networking and Forums',
        'Monitoring and Evaluation',
        'Fundraising',
        'Service Delivery Provision',
        'Provide advice services',
        'Psycho-social services',
        'Trauma Counselling',
        'Diversion Services',
        'Assisting with applications to access social grants, ID applications, UIF, workman’s compensation, drafting letters etc.',
        'Other Statutory Services performed on behalf of state'
      ],
      beneficiaryTypes: [
        'General population',
        'Children’s Rights (under 18 years)',
        'Women',
        'Youth (14-35yrs)',
        'LGBTI',
        'Migrants & refugees',
        'Vulnerable workers',
        'Sex Workers',
        'Farmworkers and Farm dwellers',
        'Rural poor communities',
        'Urban poor communities',
        'People living with disabilities',
        'People affected by HIV/AIDs',
        'Other'
      ],
      provinces: [
        'Eastern Cape',
        'Free State',
        'Gauteng',
        'KwaZulu Natal',
        'Limpopo',
        'Mpumalanga',
        'North West',
        'Northern Cape',
        'Western Cape'
      ],

      servicePoint: [
        'Magistrates Court',
        'Police Station',
        'SASSA',
        'Department of Labour',
        'Department of Home Affairs',
        'Department of Social Development'
      ],
      distance: [
        '2km',
        '2 to 5km',
        '5 to 10km',
        '10 to 20km',
        'Over 20km',
        'Over 50km'
      ],
      accessTypes: [
        'Mobile offices',
        'Workshops',
        'Site Visits/Inspections',
        'Media (Pamphlets, notices, posters, Community Radio etc)',
        'Referrals from state agencies',
        'Referrals from other CSOs/CBOs',
        'Referrals from Court',
        'Community Meetings or traditional leaders',
        'Other'
      ],
      languages: [
        'English',
        'Afrikaans',
        'Xhosa',
        'Zulu',
        'Tswana',
        'Venda',
        'Tsonga',
        'Swati',
        'Ndebele',
        'Northern Sotho',
        'Southern Sotho',
        'Other'
      ],
      monetarySources: [
        'State Agency',
        'Bi-Lateral/Multi-Lateral',
        'Goverment Grant/Tender',
        'International Donor',
        'Independant Donor',
        'Philanthropic Foudnation',
        'Corporate CSI',
        'Individual Donations',
        'Income Generation'
      ],
      budgetItem: [
        'Salaries',
        'Office Rental',
        'Maintenance and Repairs',
        'Utilities – water, electricity',
        'Stationary',
        'Telephone Costs',
        'Internet',
        'Transport',
        'Stipends for clients',
        'Catering for clients',
        'Office Sundries'
      ]
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
      this.survey.general.persons_interviewed = this.survey.general.persons_interviewed.filter((person) => {
        return person.name !== _person.name
      })
    },
    removeResearcher (_reseacher) {
      this.general.reseachers = this.general.reseachers.filter((reseacher) => {
        return reseacher.name !== _reseacher.name
      })
    },
    revertChanges () {
      console.log(this.copySurvey)
      this.survey = JSON.parse(JSON.stringify(this.copySurvey))
    },
    saveChanges () {
      if (this.create) {
        console.log(this.survey)
      } else {
        console.log(this.survey)
      }
    }
  },
  beforeMount () {
    if (this.create) {
      this.survey = JSON.parse(JSON.stringify(this.emptySurvey))
    } else {}
    this.copySurvey = JSON.parse(JSON.stringify(this.survey))
  },
  mounted () {
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

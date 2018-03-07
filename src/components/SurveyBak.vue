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

    <v-btn fixed dark fab bottom left color="orange" @click="revertChanges">
      <v-icon>undo</v-icon>
    </v-btn>

    <v-btn dark fab fixed style="top: 7%" left color="indigo" to="/">
      <v-icon>arrow_back</v-icon>
    </v-btn>

    <div class="survey-form">
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
          <v-layout row wrap style="margin: 0px; padding: 0px;">
           <v-spacer></v-spacer>
           <p style="margin: 0px; padding: 0px;">Survey: {{survey.general.name}}</p>
           <div class="mr-2"></div>
           <p style="margin: 0px; padding: 0px;">Id: {{survey._id}}</p>
          </v-layout>
          <v-tabs-items>
            <v-tabs-content key="General-Tab" id="tab-1" transition="fade-transition" reverse-transition="fade-transition">

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs8 offset-xs2>

                    <div class="display-1 grey--text text--darken-1 text-xs-left">General Information</div>

                    <v-text-field validate-on-blur
                      label="Organisation"
                      v-model="survey.general.name"
                    ></v-text-field>
                    <v-text-field validate-on-blur
                      label="Address"
                      v-model="survey.general.address"
                    ></v-text-field>
                    <v-text-field validate-on-blur
                      label="GPS Coordinates"
                      v-model="survey.general.gps_coordinates"
                    ></v-text-field>
                    <div class="title grey--text text--darken-1 text-xs-left">Date of Interview</div>
                    <div class="mb-3"></div>
                    <v-date-picker @click.native="reRender" v-model="survey.general.date_of_interview" landscape label="Date of Interview"></v-date-picker>
                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Persons Interviewed</div>
                    <div class="mb-3"></div>

                    <v-layout row wrap>
                     <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.general.persons_interviewed, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>

                    <v-layout :key="'person_interviewed_'+person_interviewed.key"
                      style="align-items: center;"
                      row wrap v-for="(person_interviewed, key, index) in survey.general.persons_interviewed">
                        <v-text-field validate-on-blur
                          label="Name"
                          v-model="person_interviewed.name"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur
                          label="Position"
                          v-model="person_interviewed.position"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-checkbox @click.native="reRender" align-center justify-center label="Board Member" v-model="person_interviewed.board_member"></v-checkbox>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click="spliceArr(survey.general.persons_interviewed, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>


                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Reseachers</div>
                    <div class="mb-3"></div>

                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.general.researchers, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>

                    <v-layout :key="'researcher_'+researcher.key"
                      style="align-items: center;"
                      row wrap v-for="(researcher, key, index) in survey.general.researchers">
                        <v-text-field validate-on-blur
                          label="Name"
                          v-model="researcher.name"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur
                          label="Organisation"
                          v-model="researcher.organisation"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-checkbox @click.native="reRender" align-center justify-center label="FHR Staff" v-model="researcher.fhr_staff_member"></v-checkbox>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.general.researchers, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Images</div>
                    <div class="mb-3"></div>
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
                    <v-text-field validate-on-blur label="NPO Number"
                     v-model="survey.governance.legal_status.npo_registration_number"></v-text-field>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Date Registered as NPO</div>
                    <div class="mb-3"></div>
                    <v-date-picker @click.native="reRender" v-model="survey.governance.legal_status.npo_date_of_registration" landscape label="Date Registered as NPO"></v-date-picker>
                    <div class="mb-3"></div>
                    <v-select v-bind:items="['None', 'ACAOSA', 'CLDRC', 'CCJD', 'Other']" multiple
                      v-model="survey.governance.legal_status.professional_body" label="Proffesional Body"></v-select>
                    <v-select v-bind:items="['Non Profit', 'Trust', 'For Profit', 'Other']"
                      v-model="survey.governance.legal_status.legal_status" label="Legal Status"></v-select>

                    <div class="display-1 grey--text text--darken-1 text-xs-left">Tax Status</div>
                    <v-select v-bind:items="['Not Registered', 'Tax Registered', 'Tax Exempted', 'VAT Registered', 'Other']"
                      v-model="survey.governance.tax_status.status" label="Tax Status"></v-select>
                    <v-text-field validate-on-blur label="Number (Associated to Tax Status)"
                     v-model="survey.governance.tax_status.number"></v-text-field>


                    <div class="display-1 grey--text text--darken-1 text-xs-left">Governance Structure</div>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.governance.governance_structure.management_commitee" label="Management Commitee"></v-checkbox>
                    <v-checkbox @click.native="reRender" v-model="survey.governance.governance_structure.board" label="Board"></v-checkbox>
                    <v-text-field validate-on-blur type="number" label="Number of Board Member" v-model="survey.governance.governance_structure.number_of_board_members"></v-text-field>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Board Members Terms of Reference</div>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.governance.governance_structure.board_member_tor.tor_exists" label="Board Member Terms of Reference"></v-checkbox>

                    <v-checkbox @click.native="reRender" v-model="survey.governance.governance_structure.board_member_tor.provided_copy_of_constitution" label="Copy of Constitution"></v-checkbox>
                    <v-text-field validate-on-blur multi-line label="Notes" v-model="survey.governance.governance_structure.board_member_tor.notes"></v-text-field>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Board Member Appointment Procedures</div>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.governance.governance_structure.appointment_procedure_for_board_members.procedure_exists"
                                label="Procedure Exists">
                    </v-checkbox>
                    <v-text-field validate-on-blur multi-line label="Notes on Appointment Procedure" v-model="survey.governance.governance_structure.appointment_procedure_for_board_members.notes"></v-text-field>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Board Members Renumeration</div>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.governance.governance_structure.board_members_remunerated.renumerated"
                                label="Renumerated">
                    </v-checkbox>
                    <v-text-field validate-on-blur
                      v-if="survey.governance.governance_structure.board_members_remunerated.renumerated"
                      type="number" label="Amount" v-model="survey.governance.governance_structure.board_members_remunerated.amount"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Board Composition</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.governance.governance_structure.composition_of_board, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'cmb_'+cmb.key"
                      style="align-items: center;"
                      row wrap v-for="(cmb, key, index) in survey.governance.governance_structure.composition_of_board">
                        <v-text-field validate-on-blur label="Name" v-model="cmb.name"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur label="Role" v-model="cmb.role_on_board"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur type="number" label="Years Serving" v-model="cmb.years_on_board"></v-text-field>
                        <div class="mr-4"></div>
                        <v-select label="Sex" v-bind:items="['Male','Female','Other']"  v-model="cmb.sex"></v-select>
                        <div class="mr-4"></div>
                        <v-select label="Age" v-bind:items="['Adult','Youth']"  v-model="cmb.age_of_member"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur label="Background" v-model="cmb.background_of_member"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.governance.governance_structure.composition_of_board, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>
                  </v-flex>

                  <v-flex xs8 offset-xs2>
                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Reporting Systems</div>
                    <div class="mb-3"></div>
                    <v-select label="Frequency of Board Meetings" v-bind:items="['Monthly', 'Quarterly', 'Twice a Year', 'Once a Year', 'Other']"
                              v-model="survey.governance.reporting_systems.frequency_of_board_meetings"></v-select>
                    <v-checkbox @click.native="reRender" v-model="survey.governance.reporting_systems.documented_board_meetings_minutes_available"
                                label="Board Meeting Minutes Available">
                    </v-checkbox>
                    <v-select label="Frequency of Internal Management Meetings" v-bind:items="['Monthly', 'Quarterly', 'Twice a Year', 'Once a Year', 'Other']"
                              v-model="survey.governance.reporting_systems.internal_management_meetings"></v-select>
                    <v-checkbox @click.native="reRender" v-model="survey.governance.reporting_systems.documented_management_meetings_minutes_available"
                                label="Internal Management Meetings Minutes Available">
                    </v-checkbox>
                    <v-checkbox @click.native="reRender" v-model="survey.governance.reporting_systems.annual_report_prepared"
                                label="Annual Report Prepared">
                    </v-checkbox>

                    <v-text-field validate-on-blur multi-line v-model="survey.governance.reporting_systems.notes" label="Notes"></v-text-field>

                    <div class="display-1 grey--text text--darken-1 text-xs-left">Strategic Planning</div>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.governance.strategic_planning.existence_of_vision_and_mission"
                                label="Vision and Mission">
                    </v-checkbox>
                    <v-checkbox @click.native="reRender" v-model="survey.governance.strategic_planning.strategic_planning_conducted"
                                label="Strategic Planning Conducted">
                    </v-checkbox>
                    <v-select label="Strategic Planning Frequency" v-bind:items="['Twice a Year', 'Once a Year', 'Once every Two Years', 'Once every Four Years', 'Other']"
                              v-model="survey.governance.strategic_planning.strategic_planning_frequency"></v-select>
                  </v-flex>

                  <v-flex xs12>
                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Monitoring and Evaluation</div>
                    <div class="mb-3"></div>
                  </v-flex>
                  <v-flex xs6>
                    <div class="title grey--text text--darken-1 text-xs-left">From</div>
                    <v-date-picker @click.native="reRender" v-model="survey.governance.monitoring_and_evaluation.period.from"></v-date-picker>
                  </v-flex>
                  <v-flex xs6>
                    <div class="title grey--text text--darken-1 text-xs-left">To</div>
                    <v-date-picker @click.native="reRender" v-model="survey.governance.monitoring_and_evaluation.period.to"></v-date-picker>
                  </v-flex>

                  <v-flex xs5>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Internal Evaluation</div>
                    <div class="mb-3"></div>
                    <v-select label="Conducted" v-bind:items="['Yes', 'No']"
                              v-model="survey.governance.monitoring_and_evaluation.internal_evaluation.conducted"></v-select>
                    <v-text-field validate-on-blur type="number" label="How many Per Year" v-model="survey.governance.monitoring_and_evaluation.internal_evaluation.how_many_per_year">
                    </v-text-field>
                    <v-text-field validate-on-blur label="Conducted By" v-model="survey.governance.monitoring_and_evaluation.internal_evaluation.conducted_by"></v-text-field>
                  </v-flex>
                  <div class="mr-4"></div>
                  <v-flex xs5>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">External Evaluation</div>
                    <div class="mb-3"></div>
                    <v-select label="Conducted" v-bind:items="['Yes', 'No']"
                              v-model="survey.governance.monitoring_and_evaluation.external_evaluation.conducted"></v-select>
                    <v-text-field validate-on-blur type="number" label="How many Per Year" v-model="survey.governance.monitoring_and_evaluation.external_evaluation.how_many_per_year">
                    </v-text-field>
                    <v-text-field validate-on-blur label="Conducted By" v-model="survey.governance.monitoring_and_evaluation.external_evaluation.conducted_by"></v-text-field>
                  </v-flex>

                  <v-flex xs12 >
                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Programme Planning and Management</div>
                    <div class="mb-3"></div>
                    <v-select label="Clear Programme Objectives and Deliverables" v-bind:items="['Yes', 'No', 'N/A']"
                              v-model="survey.governance.programme_planning_and_management.clear_programme_objectives_and_deliverables"></v-select>

                    <v-checkbox @click.native="reRender" v-model="survey.governance.programme_planning_and_management.the_organisation_incorporates_learning_from_projects_and_evaluations_into_strategic_planning"
                                label="The Organisation Incorporates Learning from Projects and Evaluations into Strategic Planning">
                    </v-checkbox>
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
                    <v-date-picker @click.native="reRender" type="month" v-model="survey.organisational_capacity_and_resources.duration_of_existance.year_established" landscape></v-date-picker>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Year Registered as NPO</div>
                    <div class="mb-3"></div>
                    <v-date-picker @click.native="reRender" type="month" v-model="survey.organisational_capacity_and_resources.duration_of_existance.year_registered" landscape></v-date-picker>
                    <div class="mb-3"></div>
                    <v-select v-bind:items="['Less than A Year', '1-3 Years', '3-5 Years', '5-10 Years', '10-15 Years', '15-20 Years', 'More than 20 Years']"  v-model="survey.organisational_capacity_and_resources.duration_of_existance.years_in_operation" label="Years in Operation"></v-select>
                  </v-flex>

                  <v-flex xs12>
                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Staff Skill/Education</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.organisational_capacity_and_resources.level_of_staff_skill, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'lss_'+lss.key"
                      style="align-items: center;"
                      row wrap v-for="(lss, key, index) in survey.organisational_capacity_and_resources.level_of_staff_skill">
                        <v-select label="Staff Status" v-bind:items="['Full Time', 'Part Time', 'Volunteers', 'Other']"  v-model="lss.staff_status"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur type="number" placeholder="Persons with Post Graduate Degree?" v-model="lss.with_post_graduate_degree"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur type="number" placeholder="Persons with Degree?" v-model="lss.with_degree"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur type="number" placeholder="Persons with Tertiary Qualification?" v-model="lss.with_tertiary_qualification"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur type="number" placeholder="Persons with Matric?" v-model="lss.with_matric"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.organisational_capacity_and_resources.level_of_staff_skill, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Staff Profile and Turnover</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.organisational_capacity_and_resources.staff_profile_and_turnover, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'spat_'+spat.key"
                      style="align-items: center;"
                      row wrap v-for="(spat, key, index) in survey.organisational_capacity_and_resources.staff_profile_and_turnover">
                        <v-text-field validate-on-blur label="Staff Role" v-model="spat.role_of_staff_member"></v-text-field>
                        <div class="mr-4"></div>
                        <v-select label="Race" v-bind:items="['Black', 'Coloured', 'Indian', 'White', 'Other']"  v-model="spat.race"></v-select>
                        <div class="mr-4"></div>
                        <v-select label="Sex" v-bind:items="['Male', 'Female', 'Other']"  v-model="spat.sex"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur type="number" label="Years of Employment" v-model="spat.years_of_employment"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.organisational_capacity_and_resources.staff_profile_and_turnover, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Staff Development</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.organisational_capacity_and_resources.staff_development, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'sd_'+sd.key"
                      style="align-items: center;"
                      row wrap v-for="(sd, key, index) in survey.organisational_capacity_and_resources.staff_development">
                        <v-select label="Where" v-bind:items="['In House', 'External']"  v-model="sd.type"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur label="Service Provider" v-model="sd.service_provider"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur label="Type of Training" v-model="sd.type_of_training"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur label="Frequency" v-model="sd.frequency"></v-text-field>
                        <div class="mr-4"></div>

                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.organisational_capacity_and_resources.staff_development, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>
                  </v-flex>

                  <v-flex xs8 offset-xs2>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Human Resources Policies and Procedures</div>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.organisational_capacity_and_resources.human_resource_policies_and_procedures.documented_job_descriptions"
                      label="Documented Job Descriptions"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.organisational_capacity_and_resources.human_resource_policies_and_procedures.documented_human_resource_policy_or_manual"
                      label="Documented Human Resource Policy or Manual"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.organisational_capacity_and_resources.human_resource_policies_and_procedures.performance_management_systems_in_place"
                      label="Performance Management Systems in Place"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.organisational_capacity_and_resources.human_resource_policies_and_procedures.dedicated_human_resource_staff_member"
                      label="Dedicated Human Resource Staff Member"></v-checkbox>


                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Use of Technology</div>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.organisational_capacity_and_resources.use_of_technology.access_to_computers"
                      label="Access to Computers"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.organisational_capacity_and_resources.use_of_technology.access_to_internet"
                      label="Access to Internet"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.organisational_capacity_and_resources.use_of_technology.uses_social_media"
                      label="Uses Social Media"></v-checkbox>
                    <div class="mb-3"></div>
                    <v-select label="Social Media Platforms" v-bind:items="['Facebook', 'Twitter', 'Instagram', 'Whatsapp', 'LinkedIn', 'Other']"
                      v-if="survey.organisational_capacity_and_resources.use_of_technology.uses_social_media" v-model="survey.organisational_capacity_and_resources.use_of_technology.platforms" multiple></v-select>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.organisational_capacity_and_resources.use_of_technology.website"
                      label="Website"></v-checkbox>


                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Case Management System</div>
                    <div class="mb-3"></div>
                    <v-select label="Current System" v-bind:items="['Manual', 'Electronic']"
                       v-model="survey.organisational_capacity_and_resources.case_management_system.case_management_system" multiple></v-select>
                    <div class="mb-3"></div>
                    <v-text-field validate-on-blur label="System Description" multi-line v-model="survey.organisational_capacity_and_resources.case_management_system.description"></v-text-field>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Collaborations and Networks</div>
                    <div class="mb-3"></div>
                    <v-checkbox @click.native="reRender" v-model="survey.organisational_capacity_and_resources.collaboration_and_network.use_of_networks_and_partnerships"
                      label="Do you have Collborations/Networks"></v-checkbox>

                    <div class="mb-3" v-if="survey.organisational_capacity_and_resources.collaboration_and_network.use_of_networks_and_partnerships"></div>
                    <div class="title grey--text text--darken-1 text-xs-left" v-if="survey.organisational_capacity_and_resources.collaboration_and_network.use_of_networks_and_partnerships">Collaborators/Networks</div>
                    <div class="mb-3" v-if="survey.organisational_capacity_and_resources.collaboration_and_network.use_of_networks_and_partnerships"></div>

                    <v-layout row wrap v-if="survey.organisational_capacity_and_resources.collaboration_and_network.use_of_networks_and_partnerships">
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.organisational_capacity_and_resources.collaboration_and_network.specify, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'cbn_'+cbn.key" v-if="survey.organisational_capacity_and_resources.collaboration_and_network.use_of_networks_and_partnerships"
                      style="align-items: center;"
                      row wrap v-for="(cbn, key, index) in survey.organisational_capacity_and_resources.collaboration_and_network.specify">
                        <v-text-field validate-on-blur label="Partner" v-model="cbn.partner"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.organisational_capacity_and_resources.collaboration_and_network, key)">
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
                    <v-checkbox @click.native="reRender" align-center justify-center label="Bank Account" v-model="survey.financial_viability.financial_system.bank_account"></v-checkbox>
                    <v-checkbox @click.native="reRender" align-center justify-center label="Office" v-model="survey.financial_viability.financial_system.office.does_have"></v-checkbox>
                    <v-text-field validate-on-blur type="number" v-model="survey.financial_viability.financial_system.office.how_many" v-if="survey.financial_viability.financial_system.office.does_have" label="How Many Offices"></v-text-field>
                    <v-checkbox @click.native="reRender" align-center justify-center label="Dedicated Finance Staff" v-model="survey.financial_viability.financial_system.dedicated_financial_staff"></v-checkbox>
                    <v-select multiple :items="['Pastel', 'Quickbooks', 'Other Specialized Accounting Software', 'Manual/Spreadsheet']"
                    v-model="survey.financial_viability.financial_system.financial_systems" label="Finance Systems In Use"></v-select>

                    <v-checkbox @click.native="reRender" align-center justify-center label="Annual Independant Financial Assessments" v-model="survey.financial_viability.financial_system.annual_independant_audits"></v-checkbox>
                    <v-checkbox @click.native="reRender" align-center justify-center label="Book keeping System" v-model="survey.financial_viability.financial_system.book_keeping_system"></v-checkbox>
                  </v-flex>
                  <v-flex xs12>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Funding</div>
                    <div class="mb-3"></div>

                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Monetary Sources</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.financial_viability.funding.monetary_sources,{
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
                            <v-btn color="blue-grey" dark slot="activator">
                              <v-icon left dark>event</v-icon>
                              From : {{ fms.period.from_year | dateFilter }}
                            </v-btn>
                            <v-date-picker @click.native="reRender"  type="month" v-model="fms.period.from_year" no-title scrollable actions>
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
                            <v-btn color="blue-grey" dark slot="activator">
                              <v-icon left dark>event</v-icon>
                              To : {{ fms.period.to_year | dateFilter }}
                            </v-btn>
                            <v-date-picker @click.native="reRender" v-model="fms.period.to_year" type="month" no-title scrollable actions>
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
                              <v-btn small fab dark color="green" class="left" @click="pushArr(fms.sources,{type_of_funding: []})">
                                <v-icon dark>add</v-icon>
                              </v-btn>
                            </v-layout>
                            <div class="mr-4"></div>
                            <v-layout :key="'srcd_'+srdc.key"
                              style="align-items: center;"
                              row wrap v-for="(srdc, key, index) in fms.sources">
                              <v-select v-bind:items="monetarySources" v-model="srdc.source_type" label="Source Type"></v-select>
                              <div class="mr-4"></div>
                              <v-text-field validate-on-blur label="Names of Sources" v-model="srdc.sources_name_list"></v-text-field>
                              <div class="mr-4"></div>
                              <v-text-field validate-on-blur label="Amount in Rand" v-model="srdc.rand_amount"></v-text-field>
                              <div class="mr-4"></div>
                              <v-select v-bind:items="['1 Year','Multi-Year']"  v-model="srdc.duration" label="Duration"></v-select>
                              <div class="mr-4"></div>
                              <v-select multiple v-bind:items="['Event/Activity', 'Programme', 'Core']"  v-model="srdc.type_of_funding" label="Type of Funding"></v-select>
                              <div class="mr-4"></div>
                              <v-btn small fab dark color="orange" class="left" @click.native="spliceArr(fms.sources, key)">
                                <v-icon dark>remove</v-icon>
                              </v-btn>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.financial_viability.funding.monetary_sources, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>


                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Non-Monetary Sources</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.financial_viability.funding.non_monetary_source,{
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
                            <v-btn color="blue-grey" dark slot="activator">
                              <v-icon left dark>event</v-icon>
                              From : {{ nms.period.from_year | dateFilter }}
                            </v-btn>
                            <v-date-picker @click.native="reRender" v-model="nms.period.from_year" type="month" no-title scrollable actions>
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
                            <v-btn color="blue-grey" dark slot="activator">
                              <v-icon left dark>event</v-icon>
                              To : {{ nms.period.to_year | dateFilter }}
                            </v-btn>
                            <v-date-picker @click.native="reRender" v-model="nms.period.to_year" type="month" no-title scrollable actions>
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
                              <v-btn small fab dark color="green" class="left" @click="pushArr(nms.sources, {type_of_assitance: [], provided_by: null})">
                                <v-icon dark>add</v-icon>
                              </v-btn>
                            </v-layout>
                            <div class="mr-4"></div>
                            <v-layout :key="'nmss_'+nmss.key"
                              style="align-items: center;"
                              row wrap v-for="(nmss, key, index) in nms.sources">
                              <v-select multiple v-bind:items="['Technical Assistance', 'Office Space', 'Vehicle', 'Computer Equipment', 'Other']"  v-model="nmss.type_of_assitance" label="Type of Support"></v-select>
                              <div class="mr-4"></div>
                              <v-text-field validate-on-blur label="Provided by" v-model="nmss.provided_by"></v-text-field>
                              <div class="mr-4"></div>
                              <v-btn small fab dark color="orange" class="left" @click.native="spliceArr(nms.sources, key)">
                                <v-icon dark>remove</v-icon>
                              </v-btn>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.financial_viability.funding.non_monetary_source, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>
                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Conditions and Terms of Funding</div>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Funding Challenges</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.financial_viability.condition_and_terms_of_funding, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'catf_'+catf.key"
                      style="align-items: center;"
                      row wrap v-for="(catf, key, index) in survey.financial_viability.condition_and_terms_of_funding">
                        <v-text-field validate-on-blur label="Funding Source" v-model="catf.funding_source"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur label="Challenges" multi-line v-model="catf.challenges"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.financial_viability.condition_and_terms_of_funding, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Monthly Expenditure</div>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Budget</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.financial_viability.expenditure.monthly_budget_information, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'emb_'+emb.key"
                      style="align-items: center;"
                      row wrap v-for="(emb, key, index) in survey.financial_viability.expenditure.monthly_budget_information">
                        <v-select v-bind:items="budgetItem"  v-model="emb.budget_item" label="Budget Item"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur type="number" label="Monthly Expenditure" v-model="emb.monthly_expenditure"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur type="number" label="Required Monthly" v-model="emb.required_monthly"></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur type="number" label="Shortfall" v-model="emb.shortfall"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.financial_viability.expenditure.monthly_budget_information, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>
                  </v-flex>
                  <div class="mb-3"></div>
                  <v-flex xs6>
                    <v-select label="Are there reserves remaining at the end of month?" v-model="survey.financial_viability.expenditure.after_exhausting_montly_budget.reserves_remaining" @input="reRender" v-bind:items="['Yes','No']"></v-select>
                    <v-text-field validate-on-blur type="number" v-if="survey.financial_viability.expenditure.after_exhausting_montly_budget.reserves_remaining === 'Yes' " label="How much" v-model="survey.financial_viability.expenditure.after_exhausting_montly_budget.how_much"></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Resources and Assets</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.financial_viability.resources_and_assests, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'raa_'+raa.key"
                      style="align-items: center;"
                      row wrap v-for="(raa, key, index) in survey.financial_viability.resources_and_assests">
                        <v-select v-bind:items="['Telephone', 'Cell Phones', 'Vehicle, Immovable Assets', 'Other']"  v-model="raa.type" label="Asset"></v-select>
                        <div class="mr-4"></div>
                        <v-select label="In possession of?" v-model="raa.possession" v-bind:items="['Yes','No']"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur label="Specify" v-model="raa.specify"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.financial_viability.resources_and_assests, key)">
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
                    <v-text-field validate-on-blur
                      label="Address"
                      v-model="survey.accessibility.cso_location.address"
                    ></v-text-field>
                    <v-select
                      v-bind:items="['Urban','Peri-Urban', 'Rural']"
                      v-model="survey.accessibility.cso_location.location"
                      label="Location Type"
                    ></v-select>
                    <v-text-field validate-on-blur
                      label="Town/Municipality"
                      v-model="survey.accessibility.cso_location.town_municipality"
                    ></v-text-field>
                    <v-select
                      v-bind:items="provinces"
                      v-model="survey.accessibility.cso_location.province"
                      label="Province"
                    ></v-select>
                    <v-text-field validate-on-blur
                      label="Country"
                      v-model="survey.accessibility.cso_location.country"
                    ></v-text-field>

                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Geographical Reach</div>
                    <div class="mb-3"></div>

                    <div class="title grey--text text--darken-1 text-xs-left">Locations</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.accessibility.geographical_reach.locations, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'grl_'+grl.key"
                      style="align-items: center;"
                      row wrap v-for="(grl, key, index) in survey.accessibility.geographical_reach.locations">
                        <v-text-field validate-on-blur label="Location" v-model="grl.location"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.accessibility.geographical_reach.locations, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Town/Municipality</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.accessibility.geographical_reach.town_municipalities, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'twm_'+twm.key"
                      style="align-items: center;"
                      row wrap v-for="(twm, key, index) in survey.accessibility.geographical_reach.town_municipalities">
                        <v-text-field validate-on-blur label="Location" v-model="twm.municipality"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.accessibility.geographical_reach.town_municipalities, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Provinces</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.accessibility.geographical_reach.provinces, {})">
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
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.accessibility.geographical_reach.provinces, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mt-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Countries</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.accessibility.geographical_reach.countries, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'ctr_'+ctr.key"
                      style="align-items: center;"
                      row wrap v-for="(ctr, key, index) in survey.accessibility.geographical_reach.countries">
                        <v-text-field validate-on-blur label="Location" v-model="ctr.country"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.accessibility.geographical_reach.countries, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                  </v-flex>


                  <v-flex xs12>

                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">State Service Points</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.accessibility.state_service_points, {})">
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
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.accessibility.state_service_points, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Access to Beneficiaries</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.accessibility.beneficiary_access, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'bena_'+bena.key"
                      style="align-items: center;"
                      row wrap v-for="(bena, key, index) in survey.accessibility.beneficiary_access">
                        <v-select
                          v-bind:items="accessTypes"
                          v-model="bena.access_type"
                          @input="reRender"
                          label="How Does CAO Reach Beneficiaries"
                        ></v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur
                          label="Specify?"
                          v-if="bena.access_type === 'Other'"
                          v-model="bena.specify"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-select
                          v-bind:items="['Yes', 'No']"
                          v-model="bena.yes_or_no"
                          label="Yes or No"
                        ></v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur
                          type="number"
                          min="0"
                          max="3"
                          v-model="bena.rank"
                          label="Rank 1-most accessible to 3-least accessible"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.accessibility.beneficiary_access, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                      </v-layout>

                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Language Accessibility</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.accessibility.language_accessibility, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'langa_'+langa.key"
                      style="align-items: center;"
                      row wrap v-for="(langa, key, index) in survey.accessibility.language_accessibility">
                        <v-select
                          v-bind:items="languages"
                          v-model="langa.language"
                          @input="reRender"
                          label="Language"
                        ></v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur
                          label="Specify?"
                          v-if="langa.language === 'Other'"
                          v-model="langa.specify"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-checkbox @click.native="reRender" align-center justify-center label="Are Staff Proficient in Language" v-model="langa.cso_staff_language_proficiency"></v-checkbox>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.accessibility.language_accessibility, key)">
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
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Top Five Focus Areas</div>
                    <div class="mb-3"></div>

                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.focus_area_and_beneficiary_group.focus_area.top_five_focus_areas, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'tff_'+tff.key"
                      style="align-items: center;"
                      row wrap v-for="(tff, key, index) in survey.focus_area_and_beneficiary_group.focus_area.top_five_focus_areas">
                        <v-select v-bind:items="focusAreas" v-model="tff.focus_area" label="Focus Area"></v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur label="Rank" type="number" min="0" max="5" v-model="tff.rank"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.focus_area_and_beneficiary_group.focus_area.top_five_focus_areas, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mt-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Target Beneficiary Groups</div>
                    <div class="mb-3"></div>

                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.focus_area_and_beneficiary_group.target_beneficiary_group, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'tbg_'+tbg.key"
                      style="align-items: center;"
                      row wrap v-for="(tbg, key, index) in survey.focus_area_and_beneficiary_group.target_beneficiary_group">
                        <v-select
                          v-bind:items="beneficiaryTypes"
                          v-model="tbg.beneficiary_type"
                          @input="reRender"
                          label="Beneficiary Type"
                        ></v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur
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
                        <v-text-field validate-on-blur
                          label="Sub-Category"
                          v-model="tbg.subcategory"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.focus_area_and_beneficiary_group.target_beneficiary_group, key)">
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
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.service_provision.activity_participation, {})">
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
                          @input="reRender"
                          v-model="actp.yes_or_no"
                          label="Yes or No">
                        </v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur
                          label="Specify?"
                          v-if="actp.yes_or_no === 'Yes'"
                          v-model="actp.specify"
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.service_provision.activity_participation, key)">
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
                      <v-text-field validate-on-blur type="number" label="Average Number of Cases Per Day?" v-model="survey.service_provision.average_number_of_cases_per_day"></v-text-field>
                    </v-flex>

                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Total Number of Cases Per Period</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.service_provision.total_number_of_cases,{
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
                            <v-btn color="blue-grey" dark slot="activator">
                              <v-icon left dark>event</v-icon>
                              From : {{ tnoc.period.from | dateFilter }}
                            </v-btn>
                          <v-date-picker @click.native="reRender" v-model="tnoc.period.from" no-title scrollable type="month" actions>
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
                          <v-btn color="blue-grey" dark slot="activator">
                            <v-icon left dark>event</v-icon>
                            To : {{ tnoc.period.to | dateFilter }}
                          </v-btn>
                          <v-date-picker @click.native="reRender" v-model="tnoc.period.to" no-title scrollable  type="month" actions>
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
                        <v-text-field validate-on-blur type="number" label="Cases" v-model="tnoc.cases"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.service_provision.total_number_of_cases, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Referrals in Past Month</div>
                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Select Month</div>
                    <div class="mb-3"></div>
                    <v-date-picker @click.native="reRender" type="month" v-model="survey.service_provision.referrals_past_month.month" landscape label="Month"></v-date-picker>

                    <div class="mb-3"></div>
                    <div class="title grey--text text--darken-1 text-xs-left">Referrals</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.service_provision.referrals_past_month.referrals, {referrals:[{place: null, times: null}]})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'rpmr'+rpmr.key"
                      style="align-items: center;"
                      row wrap v-for="(rpmr, key, index) in survey.service_provision.referrals_past_month.referrals">
                        <v-select
                          v-bind:items="['Legal Aid', 'Social Services', 'Chapter 9’s/Ombudsman', 'Other']"
                          v-model="rpmr.referral_type"
                          @input="reRender"
                          label="Referral Type">
                        </v-select>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur
                          label="Other?"
                          v-if="rpmr.referral_type === 'Other'"
                          v-model="rpmr.other"
                        ></v-text-field>
                        <v-layout row wrap>
                          <div class="mr-4"></div>
                          <v-flex>
                            <div class="title grey--text text--darken-1 text-xs-left">Referral Details</div>
                            <v-layout row wrap>
                              <v-btn small fab dark color="green" class="left" @click="pushArr(rpmr.referrals, {})">
                                <v-icon dark>add</v-icon>
                              </v-btn>
                            </v-layout>
                            <v-layout :key="'rpmrr'+rpmrr.key"
                              style="align-items: center;"
                              row wrap v-for="(rpmrr, key, index) in rpmr.referrals">
                              <v-text-field validate-on-blur label="Referred To" v-model="rpmrr.place" ></v-text-field>
                              <div class="mr-4"></div>
                              <v-text-field validate-on-blur label="How many Times" v-model="rpmrr.times" ></v-text-field>
                              <div class="mr-4"></div>
                              <v-btn small fab dark color="orange" class="left" @click.native="spliceArr(rpmr.referrals, key)">
                                <v-icon dark>remove</v-icon>
                              </v-btn>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.service_provision.referrals_past_month.referrals, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Programmes</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.service_provision.programmes_ran, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'pran'+pran.key"
                      style="align-items: center;"
                      row wrap v-for="(pran, key, index) in survey.service_provision.programmes_ran">
                        <v-menu lazy :close-on-content-click="false" v-model="picker1[key]" transition="scale-transition" offset-y full-width
                          :nudge-right="40" max-width="290px" min-width="290px">
                            <v-btn color="blue-grey" dark slot="activator">
                              <v-icon left dark>event</v-icon>
                              Year : {{ pran.year | dateFilter }}
                            </v-btn>
                          <v-date-picker @click.native="reRender" v-model="pran.year" no-title scrollable type="month" actions>
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
                        <v-text-field validate-on-blur multi-line label="Programmes Description" v-model="pran.description"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.service_provision.programmes_ran, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                    <div class="mb-3"></div>
                    <div class="display-1 grey--text text--darken-1 text-xs-left">Achievements/Impact</div>
                    <div class="mb-3"></div>
                    <v-layout row wrap>
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.service_provision.achievements_impact, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                    <v-layout :key="'acvi_'+acvi.key"
                      style="align-items: center;"
                      row wrap v-for="(acvi, key, index) in survey.service_provision.achievements_impact">
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur label="Achievement/Impact" multi-line v-model="acvi.achievement_impact"></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.service_provision.achievements_impact, key)">
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
                      <v-btn small fab dark color="primary" class="left" @click="pushArr(survey.story_of_significant_change, {})">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>

                    <v-layout :key="'sosc_'+sosc.key"
                      style="align-items: center;"
                      row wrap v-for="(sosc, key, index) in survey.story_of_significant_change">
                        <v-text-field validate-on-blur
                          placeholder="How long have you been a client of this CAO?"
                          v-model="sosc.how_long_have_you_been_a_client_of_this_cao"
                          multi-line
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur
                          placeholder="What do you think is important about the work that the CAO does for your community?"
                          v-model="sosc.what_do_you_think_is_important_about_the_work_that_the_cao_does_for_your_community"
                          multi-line
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur
                          placeholder="What are the important changes that have occurred in your life from the assistance you have received from the CAO?"
                          v-model="sosc.what_are_the_important_changes_that_have_occurred_in_your_life_from_the_assistance_you_have_received_from_the_cao"
                          multi-line
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-text-field validate-on-blur
                          placeholder="Have you experienced any challenges in receiving assistance from this CAO?"
                          v-model="sosc.have_you_experienced_any_challenges_in_receiving_assistance_from_this_cao"
                          multi-line
                        ></v-text-field>
                        <div class="mr-4"></div>
                        <v-btn small fab dark color="red" class="left" @click.native="spliceArr(survey.story_of_significant_change, key)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>

                  </v-flex>
                </v-layout>
              </v-container>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
    </div>
    <div class="mb-5"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Survey',
  props: ['id'],
  computed: {
    ...mapGetters({
      survey: 'getSurvey',
      loading: 'getLoading'
    })
  },
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
      ],
      focusAreas: [
        'Labour Rights',
        'Labour Rights',
        'Legal Rights',
        'Gender',
        'Children',
        'Housing',
        'Health',
        'Education',
        'Social Services',
        'Safety Crime and Violence',
        'Debt Management',
        'Family Law'
      ]
    }
  },
  methods: {
    reRender () {
      this.$forceUpdate()
    },
    pushArr (arr, obj) {
      arr.push(obj)
      this.$forceUpdate()
    },
    spliceArr (arr, key) {
      arr.splice(key, 1)
      this.$forceUpdate()
    },
    removeEmpty (obj) {
      Object.keys(obj).forEach((key) => {
        if (obj[key] && obj[key] instanceof Array) {
          obj[key].length ? null : delete obj[key]
        } else if (obj[key] && typeof obj[key] === 'object') {
          this.removeEmpty(obj[key])
        } else {
          obj[key] == null ? delete obj[key] : null
        }
      })
      return obj
    },
    clearEmpties (o) {
      for (var k in o) {
        if (!o[k] || typeof o[k] !== 'object') {
          continue
        }
        this.clearEmpties(o[k])
        if (Object.keys(o[k]).length === 0) {
          delete o[k]
        }
      }
      return o
    },
    revertChanges () {
      this.$store.dispatch('REVERT_SURVEY', this.id)
    },
    saveChanges () {
      if (this.survey.general._id) {
        this.$store.dispatch('UPDATE_SURVEY', this.survey)
      } else {
        this.$store.dispatch('CREATE_SURVEY', this.clearEmpties(this.removeEmpty(this.survey)))
      }
    }
  },
  beforeMount () {
    if (this.id) {
      this.$store.dispatch('LOAD_SURVEY', this.id)
    } else {
      this.$store.dispatch('LOAD_EMPTY_SURVEY')
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.survey-form{
  flex: 1;
  margin: 0px;
  width: 100vw;
}
.jbtn-file {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.jbtn-file input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  cursor: inherit;
  display: block;
}
</style>

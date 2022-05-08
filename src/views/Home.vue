<template> <!-- 검색필터 있는 페이지 -->


   
<v-container>
<v-card class="pa-4">
<p align="center"> 카풀 검색 필터 </p>



    <v-col
    sm="6">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
    

</v-card>

<v-container>


<br>

      <v-row > <!-- 카풀 등록 dialog, 운전자용 -->

<v-col
  cols="12"
  m="6">

    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
    
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          
        >
         카풀 등록
        </v-btn>
    
      </template>
       <v-card ref="form">
        <v-card-text>
          <v-container>
            <v-row>

          <v-col
                cols="12"
                sm="6"
                md="4"
              >
          <v-text-field
            ref="input_name"
            v-model="input_name"
            :rules="[() => !!input_name || '이름을 입력하세요']"
            :error-messages="errorMessages"
            label="운전자 이름*"
            placeholder="ex) 김인하"
            required
          ></v-text-field>
          </v-col>


          <v-col
                cols="12"
                sm="6"
                md="4"
              >
          <v-select
            :items="['여자', '남자']"
            ref="input_gender"
            v-model="input_gender"
            :rules="[() => !!input_gender || '성별을 선택하세요']"
            label="성별*"
            required
          ></v-select>
          </v-col>



         <v-col
                cols="12"
                sm="6"
                md="4"
              >
          <v-select
            :items="['1', '2', '3', '4', '5', '6']"
            ref="input_seat"
            v-model="input_seat"
            :rules="[() => !!input_seat || '탑승 가능 인원을 선택하세요']"
            label="탑승 가능 인원*"
            required
          ></v-select>
         </v-col>




          <v-col
              sm="6">
          <v-text-field
            ref="input_period"
            v-model="input_period"
            :rules="[() => !!input_period || '카풀 기간을 입력하세요.']"
            label="카풀 기간 입력*"
            required
            placeholder="ex) 1개월"
          ></v-text-field>
          </v-col>




          <v-col
              sm="6">
           <v-autocomplete
            :items="['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']"
            ref="input_day"
            v-model="input_day"
            :rules="[() => !!input_day || '요일을 선택하세요']"
            label="카풀 요일 선택*"
            required
          >
           </v-autocomplete>
          </v-col>





          <v-col 
              cols="12"
              sm="6"
              >
                <v-text-field
                  ref="input_start_point"
                  label="출발지*"
                  v-model="input_start_point"
                  :rules="[() => !!input_start_point || '출발지를 입력하세요.']"
                  required
                  placeholder="ex) 주안역"
                ></v-text-field>
              </v-col>







            <v-col 
              cols="12"
              sm="6">
                <v-text-field
                  ref="input_start_time"
                  label="출발시간*"
                  v-model="input_start_time"
                  :rules="[() => !!input_start_time || '출발시간을 입력하세요.']"
                  required
                  placeholder="ex) 8:00"
                ></v-text-field>
              </v-col>



              



              <v-col 
              cols="12"
              sm="6">
                <v-text-field
                  ref="input_destination"
                  label="목적지*"
                  v-model="input_destination"
                  :rules="[() => !!input_destination || '목적지를 입력하세요.']"
                  required
                  placeholder="ex) 8:00"
                ></v-text-field>
              </v-col>




              <v-col 
              cols="12"
              sm="6">
                <v-text-field
                  ref="input_destination_time"
                  label="목적지 도착 시간*"
                  v-model="input_destination_time"
                  :rules="[() => !!input_destination_time || '목적지 도착 시간을 입력 하세요.']"
                  required
                  placeholder="ex) 8:50"
                ></v-text-field>
              </v-col>


              <v-col 
              cols="12"
              sm="6">
                <v-text-field
                  ref="input_car_number"
                  label="차량 번호*"
                  v-model="input_car_number"
                  :rules="[() => !!input_car_number || '차량번호를 입력 하세요.']"
                  required
                  placeholder="xx더 xxxx"
                ></v-text-field>
              </v-col>


              <v-col 
              cols="12"
              sm="6">
                <v-text-field
                  ref="input_car_type"
                  label="차 종류*"
                  v-model="input_car_type"
                  :rules="[() => !!input_car_type || '차종을 입력하세요.']"
                  required
                  placeholder="ex) 8:00"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>


        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn 
          flat
          @click="dialog = false"
          text
          >Cancel
          </v-btn>

          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  @click="resetForm"
                  v-on="on"
                  text
                >
                refresh
                </v-btn>
              </template>
              <span>내용 지우기</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>

           <v-spacer></v-spacer>


          <v-btn color="primary" flat @click="[submit(),insertNew()]" text>Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-col>

  <v-col
    sm="6"
    md="1">
      <v-btn
       color="primary">

      카풀 검색 
      
      </v-btn>
</v-col>
  </v-row>
</v-container>
     





<!-- 이름을 기준으로 데이터 정렬 -->


  <v-data-table
  
    max-width:200px
    :headers="headers"
    :items="carpool_list"
    :items-per-page="5"
    item-key="name"
    :search="search"

  ></v-data-table> 
</v-container>


</template>


<script>
export default {

   
    data(){
        return{
            search: '',
            date: [], // 기본 날짜
            dialog: false,

  

            errorMessages: '',

            input_name: null,
            input_gender: null,
            input_seat: null,
            input_period: null,
            input_day: null,
            input_start_point:null,
            input_start_time: null,
            input_destination:null,
            input_destination_time:null,
            input_car_number:null,
            input_car_type:null,

            formHasErrors: false,




      carpool_list: [
        {
          name: '김민지',
          gender: '여자',
          seat : '1',
          date : '3/13',
          start_time : '8:00',
          start_point : '인천역',
          destination : '인하대',
          estimated_start_time : '8:30',
          estimated_destination_time : '8:50',
          extra_time : '5분',
          extra_distance : '0km'
        },

        {
          name: '이하늘',
          gender: '여자',
          seat : '1',
          date : '3/15',
          start_time : '7:00',
          start_point : '인천역',
          destination : '인하대',
          estimated_start_time : '8:30',
          estimated_destination_time : '8:50',
          extra_time : '5분',
          extra_distance : '0km'
        },

        
        {
          name: '인비룡',
          gender: '여자',
          seat : '1',
          date : '3/13',
          start_time : '7:50',
          start_point : '주안역',
          destination : '인하대',
          estimated_start_time : '8:30',
          estimated_destination_time : '8:50',
          extra_time : '5분',
          extra_distance : '0km'
        },

        {
          name: '정세모',
          gender: '남자',
          seat : '1',
          date : '3/13',
          start_time : '8:00',
          start_point : '인천역',
          destination : '인하대',
          estimated_start_time : '8:30',
          estimated_destination_time : '8:50',
          extra_time : '5분',
          extra_distance : '1.1km (차 :7분, 도보: 17분)'
        },
      ],

      headers: [
        {
          text: '이름',
          align: 'start',
          sortable: false,
          value: 'name',
          width : 75
        },
        { text: '성별', align: 'start', sortable: false, value: 'gender',width : 75 },
        { text: '남은 자리', align: 'start', sortable: false, value: 'seat',width : 75  },
        { text: '날짜', align: 'start', sortable: false, value: 'date' ,width : 75 },
        { text: '출발 시간', align: 'start', sortable: false, value: 'start_time',width : 75  },
        { text: '출발지', align: 'start', sortable: false, value: 'start_point',width : 75  },
        { text: '도착지', align: 'start', sortable: false, value: 'destination',width : 75  },
        { text: '탑승시간', align: 'start', sortable: false, value: 'estimated_start_time',width : 75  },
        { text: '도착시간', align: 'start', sortable: false, value: 'estimated_destination_time',width : 75  },
        { text: '추가시간', align: 'start', sortable: false, value: 'extra_time' ,width : 75 },
        { text: '거리 차이', align: 'start', sortable: false, value: 'extra_distance' ,width : 75 },
      ],
    }
  },

  watch: {
      name () {
        this.errorMessages = ''
      }
    },

    computed: {
      form () {
        return {
          input_name: this.input_name,
          input_gender: this.input_gender,
          input_seat: this.input_seat,
          input_period: this.input_period,
          input_day: this.input_day,
          input_start_point: this.input_start_point,
          input_start_time: this.input_start_time,
          input_destination:this.input_destination,
          input_destination_time:this.input_destination_time,
          input_car_number:this.input_car_number,
          input_car_type:this.input_car_type
        }
      }
    },

    watch: {
      name () {
        this.errorMessages = ''
      }
    },

    methods: {
      
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })

       if(this.formHasErrors==false){
          this.dialog=false
        }

      },

      insertNew() { // 카풀 등록 함수

    
    
        this.carpool_list.push({
        "name":this.input_name,
        "gender":this.input_gender, 
        "seat":this.input_seat,
        "date":this.input_period, 
        "start_time":this.input_start_time,
        "start_point":this.input_start_point,
        "destination":this.input_destination, 
        "estimated_start_time":"", 
        "estimated_destination_time":this.input_destination_time, 
        "extra_time":"", 
        "extra_distance":"" })
       },
    }
  }
</script>
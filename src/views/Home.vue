<template> <!-- 검색필터 있는 페이지 -->


   
<v-container>
<v-card class="pa-4">
<p align="center"> 카풀 검색 필터 </p>



<!-- 날짜 선택 , 달력 --> <!--
    <v-row>
    <v-col
      cols="5"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-combobox
            v-model="date"
            multiple
            chips
            small-chips
            label="카풀 선택 날짜"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-combobox>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
          multiple
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    </v-row> <!-- 달력 -->

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

      <v-row justify="center"> <!-- 카풀 등록 dialog, 운전자용 -->

<v-col
cols="12"
sm="6">
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
      <v-card>
        <v-card-title>
          <span class="text-h5">운전자 정보</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="운전자 이름*"
                  ref="input_name"
                  v-model="input_name"
                  :rules="[() => !!input_name  || '이름을 입력하세요.']"
                  :error-messages="errorMessages"
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
                  label="성별*"
                  v-model="input_gender"
                  :rules="[() => !!input_gender || '성별을 선택하세요.']"
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
                  label="탑승 가능 인원*"
                  v-model="input_seat"
                  :rules="[() => !!input_seat || '성별을 선택하세요.']"
                ></v-select>
              </v-col>

              <v-col
              sm="6">
                <v-text-field
                  label="카풀 기간 입력 (ex.일주일)*"
                  v-model="input_period"
                  :rules="[() => !!input_period || '기간을 입력하세요.']"
                ></v-text-field>
              </v-col>

              <v-col
              sm="6">
                <v-autocomplete
                  :items="['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']"
                  label="카풀 요일 선택*"
                  v-model="input_day"
                  :rules="[() => !!input_day || '날짜를 선택하세요.']"
                  multiple
                ></v-autocomplete>
              </v-col>


              <v-col 
              cols="12"
              sm="6">
                <v-text-field
                  label="출발시간 (ex.8:00)*"
                  v-model="input_start_time"
                  :rules="[() => !!input_start_time || '시간을 입력하세요.']"
                ></v-text-field>
              </v-col>


              <v-col 
              cols="12"
              sm="6"
              >
                <v-text-field
                  label="출발지*"
                  v-model="input_start_point"
                  :rules="[() => !!input_start_point || '출발지를 입력하세요.']"
                ></v-text-field>
              </v-col>



              <v-col 
              cols="12"
              sm="6">
                <v-text-field
                  label="목적지*"
                  v-model="input_destination"
                  :rules="[() => !!input_destination || '목적지를 입력하세요.']"
                ></v-text-field>
              </v-col>

              <v-col 
              cols="12"
              sm="6">
                <v-text-field
                  label="목적지 도착 시간 (ex.08:50)*"
                  v-model="input_destination_time"
                  :rules="[() => !!input_destination_time || '목적지 도착 시간을 입력 하세요.']"
                ></v-text-field>
              </v-col>


              <v-col 
              cols="12"
              sm="6">
                <v-text-field
                  label="차량 번호*"
                  v-model="input_car_number"
                  :rules="[() => !!input_car_number | '차량번호를 입력 하세요.']"
                ></v-text-field>
              </v-col>


              <v-col 
              cols="12"
              sm="6">
                <v-text-field
                  label="차 종류*"
                  v-model="input_car_type"
                  :rules="[() => !!input_car_type || '차종을 입력하세요.']"
                ></v-text-field>
              </v-col>

             
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>

          <v-btn
            color="blue darken-1"
            text
            
            @click="[insertNew(),dialog=false]"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-col>

<v-col
sm="6"
md="1">
    <p>  </p>
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

            input_name:'', // 입력 받은 데이터
            input_gender:'', // 입력 받은 데이터
            input_seat:'',
            input_period:'',
            input_day:'',
            input_start_time:'',
            input_start_point:'',
            input_destination:'',
            input_destination_time:'',
            input_car_number:'',
            input_car_type:'',

            formHasErrors: false, // 유효성 검사
            errorMessages: '',


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

   methods: {
    insertNew() { // 새글쓰기 구현

    
    
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
    chekedform(){
     this.formHasErrors = false

        Object.keys(this.carpool_list).forEach(f => {
          if (!this.carpool_list[f]) this.formHasErrors = true

          this.$refs[f].validate(true) 
        })
    }

    
   }
}
</script>
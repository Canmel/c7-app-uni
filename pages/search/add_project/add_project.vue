<template>
	<view class="full">
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">项目名称</view>
				<input placeholder="项目名称..." name="input" @input="inputChange($event, 'name')" v-model="formData.name"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.name == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.name == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">项目等级</view>
				<picker @change="levelChange" :value="levelIndex" :range="loadOptions(projectLevels)">
					<view class="picker">
						{{levelIndex>-1?loadOptions(projectLevels)[levelIndex]:'选择项目登记...'}}
					</view>
				</picker>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.level== true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.level== false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">项目编号</view>
				<input placeholder="项目编号..." name="input" @input="inputChange($event, 'code')" v-model="formData.code"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.code == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.code == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">业务描述</view>
				<input placeholder="业务描述..." name="input" @input="inputChange($event, 'business')" v-model="formData.business"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.business == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.business == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">所在地区</view>
				<input placeholder="所在地区..." name="input" @input="inputChange($event, 'place')" v-model="formData.place"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.place == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.place == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">负责人</view>
				<picker @change="managerChange" :value="managerIndex" :range="loadSelectors(projectManagers)">
					<view class="picker">
						{{managerIndex>-1?loadSelectors(projectManagers)[managerIndex]:'选择负责人...'}}
					</view>
				</picker>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.managerId == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.managerId == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">项目类型</view>
				<picker @change="typeChange" :value="typeIndex" :range="loadOptions(projectTypies)">
					<view class="picker">
						{{typeIndex>-1?loadOptions(projectTypies)[typeIndex]:'项目类型...'}}
					</view>
				</picker>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.type== true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="false == dataValidate.type"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">行业类别</view>
				<picker @change="industryChange" :value="industyIndex" :range="loadOptions(projectIndusties)">
					<view class="picker">
						{{industyIndex>-1?loadOptions(projectIndusties)[industyIndex]:'行业类别...'}}
					</view>
				</picker>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.industryType== true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="false == dataValidate.industryType"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">投资总额</view>
				<input placeholder="投资总额..." name="input" @input="inputChange($event, 'amount')" v-model="formData.amount"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.amount == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.amount == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">用地面积</view>
				<input placeholder="用地面积..." name="input" @input="inputChange($event, 'areaSize')" v-model="formData.areaSize"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.areaSize == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.areaSize == false"></text>
			</view>
			
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue lg" @click="submit()" :disabled="!submitAble">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				submitAble: false,
				formData: {
					name: '',
					code: '',
					type: '',
					place: '',
					amount: '',
					business: '',
					managerId: '',
					level: '',
					industryType: '',
					areaSize: ''
				},
				dataValidate: {
					name: null,
					code: null,
					type: null,
					place: null,
					amount: null,
					business: null,
					managerId: null,
					level: null,
					industryType: null,
					areaSize: null
				},
				dataValidator: {
					name: {
						require: true
					},
					code: {
						require: true
					},
					type: {
						require: true
					},
					place: {
						require: true
					},
					amount: {
						require: true
					},
					business: {
						require: true
					},
					managerId: {
						require: true
					},
					level: {
						require: true
					},
					industryType: {
						require: true
					},
					areaSize: {
						require: true
					}
				},
				typeIndex: -1,
				levelIndex: -1,
				industyIndex: -1,
				managerIndex: -1,
				projectTypies: [],
				projectLevels: [],
				projectIndusties: [],
				projectManagers: []
			}
		},
		methods: {
			validateInput(inputValue, attribute) {
				if(this.dataValidator[attribute]) {
					if(this.dataValidator[attribute].require) {
						if(inputValue != null && inputValue != '') {
							this.dataValidate[attribute] = true;
						}else {
							this.dataValidate[attribute] = false;
						}
					}
					if(this.dataValidator[attribute].match) {
						if(inputValue != null && inputValue != '') {
							if(inputValue.match(this.dataValidator[attribute].match) != null) {
								this.dataValidate[attribute] = true;
							}else {
								this.dataValidate[attribute] = false;
							}
						}
					}
				}
			},
			inputChange(e, attribute) {
				this.validateInput(e.detail.value, attribute);
				for(let i in this.dataValidate) {
					if(this.dataValidate[i] == true){
						continue;
					} else {
						this.submitAble = false;
						return ;
					}
					
				}
				this.submitAble = true;
			},
			submit() {
				this.$http.post('oa/zsMerchant', this.formData).then(resp => {
					uni.navigateBack({});
				});
			},
			ProjectLevelsChange(e) {
				this.projectIndex = e.detail.value
				const selectProject = this.gender[e.detail.value];
				for (let project in this.allProject) {
					if(selectProject === project.name){
						this.formData.projectId = project.id;
						return;
					}
				}
			},
			levelChange(e) {
				this.levelIndex = e.detail.value;
				this.dataValidate.level = true;
			},
			typeChange(e) {
				this.typeIndex = e.detail.value;
				this.dataValidate.type = true;
			},
			managerChange(e) {
				this.managerIndex = e.detail.value;
				this.dataValidate.managerId = true;
			},
			industryChange(e) {
				this.industyIndex = e.detail.value;
				this.dataValidate.industryType = true;
			},
			loadSelectors(options) {
				let tmp = [];
				for (let item of options) {
					tmp.push(item.username);
				}
				return tmp;
			},
			loadOptions(options) {
				let tmp = [];
				for (let item of options) {
					tmp.push(item.name);
				}
				return tmp;
			},
			loadProjectLevels() {
				this.projectLevels = [];
				this.$http.get('oa/zsProject/levels', {}).then(resp => {
					this.projectLevels = resp['data']['data'];
				});
			},
			loadProjectTypies() {
				this.projectTypies = [];
				this.$http.get('oa/zsProject/typies', {}).then(resp => {
					this.projectTypies = resp['data']['data'];
				});
			},
			loadProjectManager() {
				this.projectManagers = [];
				this.$http.get('system/sysUser/all', {}).then(resp => {
					this.projectManagers = resp['data']['data'];
				});
			},
			loadProjectIndustry() {
				this.projectIndusties = [];
				this.$http.get('oa/zsProject/industryTypies', {}).then(resp => {
					this.projectIndusties = resp['data']['data'];
				});
			}
		},
		onLoad() {
			this.loadProjectLevels();
			this.loadProjectTypies();
			this.loadProjectManager();
			this.loadProjectIndustry();
		},
		computed: {
		}
	}
</script>

<style>

</style>

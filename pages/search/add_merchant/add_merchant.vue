<template>
	<view class="full">
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">客商姓名</view>
				<input placeholder="客商姓名..." name="input" @input="inputChange($event, 'name')" v-model="formData.name"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.name == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.name == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">负责人</view>
				<input placeholder="负责人..." name="input" @input="inputChange($event, 'manager')" v-model="formData.manager"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.manager== true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="false == dataValidate.manager"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">公司地址</view>
				<input placeholder="公司地址..." name="input" @input="inputChange($event, 'addr')" v-model="formData.addr"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.addr== true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.addr== false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">主营业务</view>
				<input placeholder="主营业务..." name="input" @input="inputChange($event, 'mainBusiness')" v-model="formData.mainBusiness"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.mainBusiness == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.mainBusiness == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">投资意向</view>
				<input placeholder="投资意向..." name="input" @input="inputChange($event, 'intention')" v-model="formData.intention"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.intention == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.intention == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">联系人</view>
				<input placeholder="联系人..." name="input" @input="inputChange($event, 'contacts')" v-model="formData.contacts"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.contacts == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.contacts == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">联系人职务</view>
				<input placeholder="联系人职务..." name="input" @input="inputChange($event, 'contactsPost')" v-model="formData.contactsPost"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.contactsPost == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.contactsPost == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">联系人电话</view>
				<input placeholder="联系人电话..." name="input" @input="inputChange($event, 'contactsPhone')" v-model="formData.contactsPhone"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.contactsPhone == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.contactsPhone == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">来源地</view>
				<input placeholder="来源地..." name="input" @input="inputChange($event, 'source')" v-model="formData.source"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.source == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.source == false"></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">商会属性</view>
				<input placeholder="商会属性..." name="input" @input="inputChange($event, 'attribute')" v-model="formData.attribute"></input>
				<text class='cuIcon-roundcheckfill text-green' v-if="dataValidate.attribute == true"></text>
				<text class='cuIcon-roundclosefill text-red' v-if="dataValidate.attribute == false"></text>
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
					manager: '',
					addr: '',
					mainBusiness: '',
					intention: '',
					contacts: '',
					contactsPost: '',
					contactsPhone: '',
					source: '',
					attribute: ''
				},
				dataValidate: {
					name: null,
					manager: null,
					addr: null,
					mainBusiness: null,
					intention: null,
					contacts: null,
					contactsPost: null,
					contactsPhone: null,
					source: null,
					attribute: null
				},
				dataValidator: {
					name: {
						require: true
					},
					manager: {
						require: true
					},
					addr: {
						require: true
					},
					mainBusiness: {
						require: true
					},
					intention: {
						require: true
					},
					contacts: {
						require: true
					},
					contactsPost: {
						require: true
					},
					contactsPhone: {
						require: true,
						match: /^1(3|4|5|7|8)\d{9}$/
					},
					source: {
						require: true
					},
					attribute: {
						require: true
					}
				},
				index: -1,
				projectIndex: -1,
				gender: ['男', '女'],
				projects: [],
				allProject: []
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
			PickerChange(e) {
				this.index = e.detail.value
				const selectGender = this.gender[e.detail.value];
				if(selectGender === '男'){
					this.formData.gender = 1;
				}else {
					this.formData.gender = 0;
				}
			},
			ProjectChange(e) {
				this.projectIndex = e.detail.value
				const selectProject = this.gender[e.detail.value];
				for (let project in this.allProject) {
					if(selectProject === project.name){
						this.formData.projectId = project.id;
						return;
					}
				}
			},
			loadProjects() {
				this.projects = [];
				this.$http.get('oa/zsProject/all', {}).then(resp => {
					this.allProject = resp['data']['data'];
					for(let i = 0; i < this.allProject.length; i++) {
						this.projects.push(this.allProject[i]['name']);
					}
				});
			}
		},
		onLoad() {
			this.loadProjects();
		},
		computed: {
		}
	}
</script>

<style>

</style>

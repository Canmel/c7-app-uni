<template>
	<view class="full">
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="被推荐人姓名..." name="input" v-model="formData.name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<picker @change="PickerChange" :value="index" :range="gender">
					<view class="picker">
						{{index>-1?gender[index]:'选择性别...'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="被推荐人联系电话..." name="input" v-model="formData.contactPhone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">情况介绍</view>
				<textarea placeholder="被推荐人情况介绍..." name="input" v-model="formData.remark"></textarea>
			</view>
			
			<view class="cu-form-group">
				<view class="title">适合项目</view>
				<picker @change="ProjectChange" :value="projectIndex" :range="projects">
					<view class="picker">
						{{projectIndex>-1?projects[projectIndex]:'最适合的项目...'}}
					</view>
				</picker>
			</view>
			
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue lg" @click="submit()" :disabled="isChecked">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					name: '',
					gender: null,
					contactPhone: '',
					remark: '',
					projectId: null
				},
				index: -1,
				projectIndex: -1,
				gender: ['男', '女'],
				projects: [],
				allProject: []
			}
		},
		methods: {
			submit() {
				
				this.$http.post('oa/zsTalenteder', this.formData).then(resp => {
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
			isChecked() {
				for (let s in this.formData) {
					if(this.formData[s] === null || this.formData[s] === '') {
						return true;
					}
				}
				return false;
			}
		}
	}
</script>

<style>

</style>

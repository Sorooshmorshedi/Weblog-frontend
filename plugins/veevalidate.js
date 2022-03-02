import Vue from 'vue'
import zhCN from'vee-validate/dist/locale/zh_CN' // import localized language
import VeeValidate, {Validator} from'vee-validate' // import vee-validate

// Override the default error message prompt
zhCN.messages.email = () =>'Please enter the correct email address'

Vue.use(VeeValidate)

// localization
Validator.localize('zh_CN', zhCN)

import {createApp} from 'vue'
import './styles/app.scss'
import App from './App.vue'
import FormControl from "./components/common/FormControl.vue";
import PrimaryButton from "./components/common/PrimaryButton.vue";
import InputField from "./components/common/InputField.vue";
import DefaultButton from "./components/common/DefaultButton.vue";

const app = createApp(App)

app.component('FormControl', FormControl)
app.component('PrimaryButton', PrimaryButton)
app.component('DefaultButton', DefaultButton)
app.component('InputField', InputField)


app.mount('#app')

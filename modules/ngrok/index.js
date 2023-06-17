// import ngrok from 'ngrok'
// import chalk from 'chalk'
// import { defineNuxtModule } from '@nuxt/kit'

export default function(){
  return
}
// export default defineNuxtModule({
//   setup (options, nuxt) {

//     let url
//     if (nuxt.options.dev === false) {
//       return
//     }

//     // const options = nuxt.options.ngrok || {}
//     const token = process.env.NGROK_TOKEN || options.token

//     nuxt.hook('listen', async () => {
//       if(token){
//         await ngrok.authtoken(token)
//       }
//       url = await ngrok.connect(3000)
//       console.log(url) //4041
//     })

//     nuxt.hook('close', function () {
//       url && ngrok.disconnect()
//     })

//   }
// })
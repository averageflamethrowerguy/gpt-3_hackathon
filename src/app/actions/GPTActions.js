import Auth from '@aws-amplify/auth'

const GPT_API_KEY = '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'

export default function AuthActions() {

  this.registerAlt = (alt) => { // hack to provide the alt singleton to function-based action creators (necessitated by ES6 breaking class-based action creators in alt by mandating construction via 'new')
    this.alt = alt
    this.actions = alt.getActions(this.__proto__.constructor.__proto__.name)
  }

  const dataRelays = []
  dataRelays.forEach(relayName => {
    this[relayName] = (relayObj) => relayObj
  })

  this.getEngines = () => {
    return new Promise((resolve, reject) => {
      this.alt.getActions('ApiActions')
      .query()
      .get('https://api.openai.com/v1/engines')
      .set('Authorization', 'Bearer ' + GPT_API_KEY)
      .end((err, res) => {
        if (err) reject(err)
        else resolve(res.body)
      })
    })
  }

  this.handleSubmit = ({tokens, input, machineName}) => {
    return new Promise((resolve, reject) => {
      this.alt.getActions('ApiActions')
      .query()
      .post(`https://api.openai.com/v1/engines/${machineName}/completions`)
      .set('Authorization', 'Bearer ' + GPT_API_KEY)
      .send({
        prompt: input,
        max_tokens: tokens,
        temperature: 0.6,
        top_p: 1,
        n: 1,
        stream: false,
        logprobs: null,
        // stop: '\n'
      })
      .end((err, res) => {
        if (err) reject(err)
        else resolve(res.body)
      })
    })
  }
}

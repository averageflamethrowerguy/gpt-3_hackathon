export default function OverlayActions() {
  this.registerAlt = (alt) => { // hack to provide the alt singleton to function-based action creators (necessitated by ES6 breaking class-based action creators in alt by mandating construction via 'new')
    this.alt = alt
    this.actions = alt.getActions(this.__proto__.constructor.__proto__.name)
  }

  const dataRelays = [
    '_open',
    '_close'
  ]
  dataRelays.forEach(relayName => {
    this[relayName] = (relayObj) => relayObj
  })
}

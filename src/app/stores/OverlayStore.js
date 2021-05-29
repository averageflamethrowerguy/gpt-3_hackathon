export default function OverlayStore() {

  this.state = {
    open: false,
    foreground: null,
    backgroundStyle: null,
    onBackgroundClick: null
  };

  this.handleOpen = ({foreground, backgroundStyle, onBackgroundClick}) => {
    this.setState({
      open: true,
      foreground: foreground,
      backgroundStyle: backgroundStyle,
      onBackgroundClick: onBackgroundClick
    });
  }

  this.handleClose = () => {
    this.setState({
      open: false,
      foreground: null,
      backgroundStyle: null,
      onBackgroundClick: null
    });
  }

  const {_open, _close} = this.alt.getActions('OverlayActions');
  this.bindListeners({
    handleOpen: _open,
    handleClose: _close
  }); // this is where the binding to the EnvironmentActions methods occurs
}

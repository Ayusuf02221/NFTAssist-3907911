import React from "react";
import Constants from 'expo-constants';
import * as ImageManipulator from "expo-image-manipulator";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { Alert, Text, View,StyleSheet, Platform } from "react-native";
import { BottomBar,TopBar,SelectedPicture } from "../components/Camera";
import * as google from "../api/google";

const flashModeOrder = {
  off: "on",
  on: "auto",
  auto: "torch",
  torch: "off"
};
// CameraPage class component
export default class CameraPage extends React.Component {
  constructor(props) {
    super(props);
  }

  // Initial component state
  state = {
    flash: "off",
    type: "back",
    zoom: 0,
    ratio: "16:9",
    newPhotos: false,
    returning:false,
    permissionsGranted: false,
    pictureSize: undefined,
    pictureSizes: [],
    pictureSizeId: 0,
    loading: false,
  };

  // Request camera permission and create a photo directory on component mount
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === "granted" });
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "photos"
    ).catch(e => {
      console.log(e, "Directory exists");
    });
    console.log("you've created a file directory");

  }

  // Capture a picture and save it in the state
  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({
        onPictureSaved: this.onPictureSaved,
        base64: true
      });
    }
  };

  // Toggle the camera type (front or back)
  toggleFacing = () =>
    this.setState({ type: this.state.type === "back" ? "front" : "back" });

  // Toggle the camera flash mode
  toggleFlash = () =>
    this.setState({ flash: flashModeOrder[this.state.flash] });

  // Retake a picture
  onRetake = () => this.setState({ newPhotos: false });

  // Confirm the captured picture, resize it, and detect the NFT
  onConfirm = async () => {
    const { picture } = this.state;
    this.setState({ loading: false });

    const image = await ImageManipulator.manipulateAsync(
      picture.uri,
      [{ resize: { width: 860 } }],
      {
        format: "png" || "jpeg",
        base64: true
      }
    );
    let imageDetected = await google.detectNFT(image.base64);
    console.log("imageDetected:", imageDetected);
    if (!imageDetected || !imageDetected.tokenID || !imageDetected.contractAddress) {
      console.log("throwing alert");
      this.throwAlert();
    } else {
      const { tokenID, contractAddress } = imageDetected;
      const text = `${contractAddress}_${tokenID}`;
      console.log("navigating to Detail screen with text:", text);
      this.props.navigation.navigate("Detail", { picture, text });
    }
  };

  // Handle camera mount error
  handleMountError = ({ message }) => console.error(message);

  // Save the captured picture to state
  onPictureSaved = async picture => {
    this.setState({ picture, newPhotos: true });
  };

  // Collect available picture sizes for the camera
  collectPictureSizes = async () => {
    if (this.camera) {
      const pictureSizes = await this.camera.getAvailablePictureSizesAsync(
        this.state.ratio
      );
      let pictureSizeId = 0;
      if (Platform.OS === "ios") {
        pictureSizeId = pictureSizes.indexOf("High");
      } else {
        // returned array is sorted in ascending order - default size is the largest one
        pictureSizeId = pictureSizes.length - 1;
      }
      this.setState({
        pictureSizes,
        pictureSizeId,
        pictureSize: pictureSizes[pictureSizeId]
      });
    }
  };

  // Show an alert when NFT detection fails
  throwAlert = () => {
    Alert.alert(
      "Sorry we just failed",
      "We were not able to identify an NFT",
      [
        {
          text: "Try Another Picture",
          onPress: () => this.setState({ newPhotos: false }),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  // Render the captured picture with retake and confirm options
  renderPicture = () => (
    <SelectedPicture
      loading={this.state.loading}
      picture={this.state.picture}
      onRetake={this.onRetake}
      onConfirm={this.onConfirm}
    />
  );

  // Render a message when camera permissions are not granted
  renderNoPermissions = () => (
    <View style = {styles.permissionStyle}>
      <Text style={{ color: "white" }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>

  );

  // Render the bottom bar with the capture button
  renderBottomBar = () => (
    <BottomBar
      takePicture={this.takePicture}
    />
  );

  // Render the top bar with flash and camera type toggles
  renderTopBar = () => (
    <TopBar
      flash={this.state.flash}
      toggleFacing={this.toggleFacing}
      toggleFlash={this.toggleFlash}
    />
  );

  // Render the camera preview with top and bottom bars
  renderCamera = () => (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        ref={ref => {
          this.camera = ref;
        }}
        onCameraReady={this.collectPictureSizes}
        zoom={this.state.zoom}
        type={this.state.type}
        flashMode={this.state.flash}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        pictureSize={this.state.pictureSize}
        onMountError={this.handleMountError}
      >
        {this.renderTopBar()}
        {this.renderBottomBar()}

      </Camera>
    </View>
  );

  // Main render method
  render() {
    const { photo, newPhotos, loading } = this.state;

    const cameraPageContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    const content = newPhotos ? this.renderPicture() : cameraPageContent;
    return (
      <View style = {{flex:1}}>
        {loading && null}
        {content}
      </View>
    
    );
  }
}

const styles = StyleSheet.create({
  permissionStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:10
  },
});